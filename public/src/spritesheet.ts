export class SpriteSheet {
    private image: HTMLImageElement;
    private width: number;
    private height: number;
    private tiles: Map<string, CanvasImageSource>;

    constructor(image: HTMLImageElement, width: number, height: number) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    public define(name: string, x: number, y: number) {
        const buffer = document.createElement("canvas");

        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext("2d")
            ?.drawImage(
                this.image,
                this.width * x,
                this.height * y,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height
            );

        this.tiles.set(name, buffer);
    }

    public draw(
        name: string,
        context: CanvasRenderingContext2D | null,
        x: number,
        y: number
    ) {
        const buffer = this.tiles.get(name);
        context?.drawImage(buffer!, x, y);
    }

    public drawTile(
        name: string,
        context: CanvasRenderingContext2D | null,
        x: number,
        y: number
    ) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
