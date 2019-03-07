class Alien extends Enemigo {

    constructor(x, y) {
        super(imagenes.alien, x, y);

        this.aMover = new Animacion(imagenes.alien_movimiento,
            this.ancho, this.alto, 6, 3);

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 1;

    }

    actualizar() {
        // Actualizar animación
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        this.animacion.actualizar();
        this.vx = -1;
        this.x = this.x + this.vx;
    }

    dibujar (){
        this.animacion.dibujar(this.x, this.y);
    }



}