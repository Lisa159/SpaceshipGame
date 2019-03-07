class Moneda extends Modelo {

    constructor(x, y) {
        super(imagenes.moneda, x, y);
        this.vx = -1;
    }

    actualizar() {
        this.vx = -1;
        this.x = this.x + this.vx;
    }
}