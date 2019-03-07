var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    // agregar la tecla pulsada si no estaba
    console.log("Tecla :"+ event.keyCode);
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 32: //Nave1
                controles.disparo = true;
                break;
            case 38:
                controles.moverY = 1;
                break;
            case 40:
                controles.moverY = -1;
                break;
            case 39:
                controles.moverX = 1;
                break;
            case 37:
                controles.moverX = -1;
                break;
            case 69: //Nave2
                controles.disparo2 = true;
                break;
            case 87:
                controles.moverY2 = 1;
                break;
            case 83:
                controles.moverY2 = -1;
                break;
            case 68:
                controles.moverX2 = 1;
                break;
            case 65:
                controles.moverX2 = -1;
                break;
        }
    }
}

function onKeyUp( event) {
    console.log("EventosTeclado - onKeyDown")
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);

    switch ( event.keyCode ){
        case 32:
            controles.disparo = false;
            break;
        case 38:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 40:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 39:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 37:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;

        case 69: //Nave2
            controles.disparo2 = false;
            break;
        case 87:
            if ( controles.moverY2 == 1 ){
                controles.moverY2 = 0;
            }
            break;
        case 83:
            if ( controles.moverY2 == -1 ){
                controles.moverY2 = 0;
            }
            break;
        case 68:
            if ( controles.moverX2 == 1 ){
                controles.moverX2 = 0;
            }
            break;
        case 65:
            if ( controles.moverX2 == -1 ){
                controles.moverX2 = 0;
            }
            break;
    }
}
