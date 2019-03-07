class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.puntos = new Texto(0,480*0.9,320*0.07 );
        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);

        this.corazonVidas = [];
        this.corazonVidas.push(new Fondo(imagenes.corazon, 480*0.1,320*0.05));
        this.corazonVidas.push(new Fondo(imagenes.corazon, 480*0.16,320*0.05));
        this.corazonVidas.push(new Fondo(imagenes.corazon, 480*0.22,320*0.05));

        this.jugador = new Jugador(50, 60);
        this.jugador2 = new Jugador(50, 200);

        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.enemigos = [];
        this.enemigos.push(new Alien(300,50));
        this.enemigos.push(new Alien(350,200));
        this.enemigos.push(new Asteroide(400,50));
        this.enemigos.push(new Asteroide(300,150));

        this.monedas = [];
        this.bombas = [];

        for (var i=0; i < 2; i++){
            var rX = Math.random() * (450 - 20) + 20;
            var rY = Math.random() * (300 - 20) + 20;
            this.monedas.push(new Moneda(rX,rY));
        }

        this.disparosJugador = []
    }

    actualizar (){
        this.fondo.vx = -1;
        this.fondo.actualizar();

        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){
                this.disparosJugador.splice(i, 1);
            }
        }

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }

        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos ++;

        if ( this.iteracionesCrearEnemigos > 110){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            var rXAst = Math.random() * (600 - 500) + 500;
            var rYAst = Math.random() * (300 - 60) + 60;
            var rXMon = Math.random() * (600 - 500) + 500;
            var rYMon = Math.random() * (300 - 60) + 60;
            var rXBom = Math.random() * (600 - 500) + 500;
            var rYBom = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Alien(rX,rY));
            this.monedas.push(new Moneda(rXMon,rYMon));
            this.bombas.push(new Bomba(rXBom,rYBom));
            this.enemigos.push(new Asteroide(rXAst,rYAst));
            this.iteracionesCrearEnemigos = 0;
        }

        // actualizo elementos
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        this.jugador.actualizar();
        this.jugador2.actualizar();

        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.monedas.length; i++){
            this.monedas[i].actualizar();
        }
        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].actualizar();
        }
        for (var i=0; i < this.corazonVidas.length; i++){
            this.corazonVidas[i].actualizar();
        }

        // miro colisiones
        // colision Enemigo - Jugador
        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            for (var j=0; j < 3; j++){
                if (this.jugador.colisiona(this.enemigos[i]) || this.jugador2.colisiona(this.enemigos[i])){
                    if(this.corazonVidas.length < 2){
                        this.iniciar();
                    }
                    else{
                        this.enemigos.splice(i, 1);
                        this.corazonVidas.splice(j, 1);
                    }
                }
            }
        }

        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    this.puntos.valor++;
                    this.disparosJugador.splice(i, 1);
                    this.enemigos.splice(j, 1);
                }
            }
        }

        // colisiones recolectables
        for (var i=0; i < this.monedas.length; i++){
            if (this.jugador.colisiona(this.monedas[i]) || this.jugador2.colisiona(this.monedas[i])){
                this.puntos.valor++;
                this.monedas.splice(i, 1);
            }
        }
        // colisiones bombas
        for (var i=0; i < this.bombas.length; i++){
                if (this.jugador.colisiona(this.bombas[i]) || this.jugador2.colisiona(this.bombas[i])) {
                    this.bombas.splice(i, 1);
                    for(var j = 0; j < this.enemigos.length; j++) {
                        if(this.enemigos[j].estaEnPantalla()){
                            this.enemigos.splice(j, 1);
                            this.puntos.valor++;
                        }
                    }
                }
        }
    }

    dibujar (){

        this.fondo.dibujar();

        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        this.jugador.dibujar();
        this.jugador2.dibujar();

        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        for (var i=0; i < this.monedas.length; i++){
            this.monedas[i].dibujar();
        }

        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].dibujar();
        }

        for (var i=0; i < this.corazonVidas.length; i++){
            this.corazonVidas[i].dibujar();
        }

        this.fondoPuntos.dibujar();
        this.puntos.dibujar();
    }


    procesarControles( ){
        // disparar
        if ( controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }
        else if ( controles.moverX < 0){
            this.jugador.moverX(-1);
        }
        else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

        //NAVE 2
        if ( controles.disparo2 ){
            var nuevoDisparo = this.jugador2.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Eje X
        if ( controles.moverX2 > 0 ){
            this.jugador2.moverX(1);

        }
        else if ( controles.moverX2 < 0){
            this.jugador2.moverX(-1);

        }
        else {
            this.jugador2.moverX(0);
        }

        // Eje Y
        if ( controles.moverY2 > 0 ){
            this.jugador2.moverY(-1);

        } else if ( controles.moverY2 < 0 ){
            this.jugador2.moverY(1);

        } else {
            this.jugador2.moverY(0);
        }

    }


}
