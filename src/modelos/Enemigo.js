class Enemigo extends Modelo {

    constructor(imagenRuta, x, y) {
        super(imagenRuta, x, y)
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    /*dibujar (){
        this.animacion.dibujar(this.x, this.y);
    }*/

}