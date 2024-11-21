export class BoxesController {
    constructor(scene, player) {
        this.scene = scene; // Сохраняем ссылку на сцену
        this.player = player;

        this.isNearObject = null;
        this.isHoldingObject = null;
        this.minDistance = 50;
        this.minDistanceX = 50;
        this.minDistanceY = 80;
        this.maxDistance = 100;
        this.maxDistanceX = 60;
        this.maxDistanceY = 90;

        this.previousPlayerPosition = { x: this.player.x, y: this.player.y };

        this.boxes = {};

        this.places = [];

        this.flagPressC = false;
    }

    createPlace(x, y, labelPlace) {
        const graphics = this.scene.add.graphics();

        // const place = this.scene.matter.add.sprite(x, y, 'place', null, { label: labelPlace });
        // place.setSensor(true);
        const place = this.scene.matter.add.rectangle(x, y, 50, 50, {
            isStatic: true,
            isSensor: true,
            label: labelPlace
        })

        this.scene.matterCollision.addOnCollideStart({
            objectA: this.scene.player,
            objectB: place,
            callback: function (eventData) {
                console.log(this.places);
                if (eventData.bodyB.box != null) return;
                this.scene.isInZone = true;
                this.scene.eventZone = Number(eventData.bodyB.label);

                graphics.clear();
                graphics.lineStyle(2, 0x00ff00);
                graphics.strokeRect(eventData.bodyB.position.x - 50 / 2, eventData.bodyB.position.y - 50 / 2, 50, 50);
            },
            context: this
        });

        this.scene.matterCollision.addOnCollideEnd({
            objectA: this.scene.player,
            objectB: place,
            callback: function (eventData) {
                this.scene.isInZone = false;
                this.scene.eventZone = null;

                graphics.clear();
            },
            context: this
        });

        this.places.push(place);
    }

    createBoxes(boxes) {

        Object.keys(boxes).forEach((item) => {
            this.boxes[item] = this.scene.matter.add.sprite(boxes[item].x, boxes[item].y, `box${Number(item) + 1}`);

            this.boxes[item].setFixedRotation();
            this.boxes[item].setStatic(true);

            this.boxes[item].setCollisionCategory(0x0002);

            this.boxes[item].label = item;

            for (let i = 0; i < this.places.length; i++) {
                if (this.places[i].position.x == this.boxes[item].x && this.places[i].position.y == this.boxes[item].y) {
                    this.fillPlace(i, item);
                }
            }

            this.scene.matterCollision.addOnCollideStart({
                objectA: this.player,
                objectB: this.boxes[item],
                callback: this.handlePlayerObjectCollision,
                context: this
            });
        });

        this.scene.mySocket.subscribeCatchedBox(this, this.catchedBox);
        this.scene.mySocket.subscribeBoxMovement(this, this.updateBoxes);
    }

    handlePlayerObjectCollision({ bodyA, bodyB }) {
        let boxesId = bodyB.gameObject.label;
        this.isNearObject = boxesId;
        if (!bodyB.isSensor) {
            this.flagPressC = true;
        }
    }

    holdObject(boxId) {
        this.scene.mySocket.emitCatchBox(Number(boxId));
    }

    catchedBox(boxId) {
        if (this.boxes[`${boxId}`].place != null) {
            this.clearPlace(this.boxes[`${boxId}`].place, boxId);
        }
        this.isHoldingObject = `${boxId}`;
        this.boxes[`${boxId}`].setStatic(false);
        this.boxes[`${boxId}`].setSensor(false);
    }

    releaseObject(boxId, place) {
        const box = this.boxes[`${boxId}`]
        box.setVelocity(0, 0);
        box.setStatic(true); // Остановить объект
        this.scene.mySocket.emitReleaseBox(Number(boxId));

        if (place == null) this.scene.mySocket.emitMoveBoxeLast({ id: Number(this.isHoldingObject), x: box.x, y: box.y, lastKey: true });
        else this.scene.mySocket.emitMoveBoxeLast({ id: Number(this.isHoldingObject), x: box.x, y: box.y, lastKey: true, placeCur: place });

        box.setPosition(box.x, box.y);
        this.isHoldingObject = null;

        this.flagPressC = false;
    }

    updateBoxes(movementData) {
        if (this.boxes[movementData.id]) {
            const box = this.boxes[movementData.id];
            if (movementData.lastKey == null && box.isStatic) {
                box.setSensor(true);
            }
            if (box.place != null) this.clearPlace(box.place, box.label);

            this.scene.tweens.add({
                targets: [box],
                x: movementData.x,
                y: movementData.y,
                duration: 200,
                onComplete: () => {
                    try {
                        if (movementData.lastKey != null) {
                            box.setSensor(false);

                            if (movementData.placeCur != null) {
                                this.fillPlace(movementData.placeCur, box.label);
                            }

                        }
                    }
                    catch (e) { }
                }
            });
        }
    }

    putBox(place) {
        const placeCur = this.places[place]
        console.log(placeCur);
        this.boxes[`${this.isHoldingObject}`].setPosition(placeCur.position.x, placeCur.position.y);
        this.fillPlace(place, this.isHoldingObject);
        this.releaseObject(this.isHoldingObject, place);
    }

    fillPlace(placeCur, obj) {
        this.places[placeCur].box = obj;
        this.boxes[`${obj}`].place = placeCur;
    }

    clearPlace(place, obj) {
        this.places[place].box = null;
        this.boxes[`${obj}`].place = null;
    }

    update() {
        // Перемещение объекта за игроком

        if (this.isHoldingObject) {
            const deltaX = this.player.x - this.previousPlayerPosition.x;
            const deltaY = this.player.y - this.previousPlayerPosition.y;
            const box = this.boxes[this.isHoldingObject]

            // box.setPosition(box.x + deltaX, box.y + deltaY);
            box.setVelocity(deltaX, deltaY);
            // console.log(box.x + " " + box.y);

            // Проверка и корректировка минимального расстояния
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, box.x, box.y);

            if (distance < this.minDistance) {
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, box.x, box.y);
                box.x = this.player.x + Math.cos(angle) * this.minDistance;
                box.y = this.player.y + Math.sin(angle) * this.minDistance;
            }

            this.scene.mySocket.emitMoveBoxe({ id: Number(this.isHoldingObject), x: box.x, y: box.y });

            if (distance > this.maxDistance) {
                this.flagPressC = false;
                this.releaseObject(this.isHoldingObject);
            }
        }

        if (this.isNearObject != null) {
            const box = this.boxes[this.isNearObject];
            const distanceToMovableObject = Phaser.Math.Distance.Between(this.player.x, this.player.y, box.x, box.y);
            if (distanceToMovableObject > this.minDistance) {
                this.isNearObject = null;
                if (this.isHoldingObject == null) {
                    this.flagPressC = false;
                }
            }
        }


        // Обновление предыдущей позиции игрока
        this.previousPlayerPosition.x = this.player.x;
        this.previousPlayerPosition.y = this.player.y;
    }
}