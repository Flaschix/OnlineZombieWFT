/** @type {import("../typings/phaser")} */
/** @type {import("../typings/PhaserMatterCollisionPlugin")} */

import { LoadingScene } from "./scenes/LoadingScene.mjs"
import { LobbyScene } from "./scenes/LobbyScene.mjs";
import { GameScene } from "./scenes/GameScene.mjs";

let game;

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        parent: 'gameContainer'
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [LoadingScene, LobbyScene, GameScene],
    dom: {
        createContainer: true
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
};

game = new Phaser.Game(config);
