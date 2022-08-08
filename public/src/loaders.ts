import { Levels } from "./types/level";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener("load", () => {
            // Image is ready for display
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name: string): Promise<Levels> {
    return fetch(`/levels/${name}.json`).then(
        (r) => r.json() as unknown as Levels
    );
}
