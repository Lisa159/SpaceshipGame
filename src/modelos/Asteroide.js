class Asteroide extends Enemigo {

    constructor(x, y) {
        super(imagenes.asteroide, x, y);
        this.vx = 1;
    }

    actualizar() {
        this.vx = -5;
        this.x = this.x + this.vx;
    }
}