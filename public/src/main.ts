import { loadImage, loadLevel } from "./loaders.js";
import { SpriteSheet } from "./spritesheet.js";
import { Level } from "./types/level.js";

function drawBackground(
    background: Level,
    context: CanvasRenderingContext2D | null,
    sprites: SpriteSheet
) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas?.getContext("2d");

loadImage("/images/tiles.png").then(async (image) => {
    const sprites = new SpriteSheet(image, 16, 16);

    sprites.define("ground", 0, 0);
    sprites.define("sky", 3, 23);

    loadLevel("1-1").then((level) => {
        level.backgrounds.forEach(bg => {
            drawBackground(bg, context, sprites);
        });
    });
});
