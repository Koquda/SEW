"use strict";

class CalculadoraRPN {

    constructor() {
        // Initialize the screens
        this.pantalla = '';
        this.pilaPantalla = '';

        // Initialize the stack
        this.pila = new Pila();

        // Keyboard events
        document.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key !== ' ') {
                if (Number.isInteger(Number(key)) || key === '.') {
                    this.digitos(key);
                } else if (key === '+'){
                    this.suma();
                } else if (key === '-'){
                    this.resta();
                } else if (key === '*'){
                    this.multiplicacion();
                } else if (key === '/'){
                    this.division();
                } else if (key.toUpperCase() === 'C'){
                    this.borrar();
                } else if (key === 'Enter'){
                    this.push();
                }
            }
        });
        
    }

    // ----------------- TIPOS DE OPERACIONES -----------------
    operacionBinaria(operacion) {
        let res = operacion(this.pila.pop(), this.pila.pop());
        this.pantalla = res;
        this.push();
    }

    operacionUnaria(operacion) {
        let res = operacion(this.pila.pop());
        this.pantalla = res;
        this.push();
    }

    // -------------------------------------------------------


    push() {
        this.pila.push(Number(this.pantalla));
        this.actualizar();
    }

    actualizar() {
        this.pantalla = '';
        document.getElementById('res').value = this.pantalla;
        // Pila
        this.pantallaPila = ''; // reseteamos la pantalla de la pila
        for (let i = 0; i < this.pila.length(); i++)
            this.pantallaPila += this.pila.get(i) + '\n';
        
        document.getElementById('pantallaPila').value = this.pantallaPila;
    }


    // ----------------- OPERACIONES -----------------

    digitos(digito) {
        this.pantalla += digito;
        document.getElementById('res').value = this.pantalla;
    }

    punto() {
        this.pantalla += '.';
        document.getElementById('res').value = this.pantalla;
    }

    suma() {
        this.operacionBinaria((a, b) => a + b);
    }

    resta() {
        this.operacionBinaria((a, b) => b - a);
    }

    multiplicacion() {
        this.operacionBinaria((a, b) => a * b);
    }

    division() {
        this.operacionBinaria((a, b) => a / b);
    }

    raiz() {
        this.operacionUnaria(Math.sqrt);
    }

    elevarCuadrado() {
        this.operacionUnaria((a) => a * a);
    }

    log() {
        this.operacionUnaria(Math.log);
    }

    seno() {
        this.operacionUnaria(Math.sin);
    }

    coseno() {
        this.operacionUnaria(Math.cos);
    }

    tangente() {
        this.operacionUnaria(Math.tan);
    }
    
    arcoSeno() {
        this.operacionUnaria(Math.asin);
    }

    arcoCoseno() {
        this.operacionUnaria(Math.acos);
    }

    arcoTangente() {
        this.operacionUnaria(Math.atan);
    }

    borrar() {
        this.pila = new Pila();
        this.actualizar();
    }

    
}

class Pila {

    constructor() {
        this.pila = [];
    }

    push(elemento) {
        this.pila.push(elemento);
    }

    pop() {
        return this.pila.pop();
    }

    get(i) {
        return this.pila[i];
    }
    
    length() {
        return this.pila.length;
    }


        
}

class CalculadoraEspecializada extends CalculadoraRPN {

    constructor() {
        super();
        this.millaAKm = 1.609344;
        this.kmAMilla = 0.621371192237334;
        this.celciusAFarenheit = 1.8;
        this.farenheitACelcius = 0.5555555555555556;
        this.onzaAMl = 29.5735295625;
        this.mlAOnza = 0.033814022701842;
        this.ydAM = 0.9144;
        this.mAYd = 1.0936132983377078;
    }

    aKm() {
        this.operacionUnaria((a) => a * this.millaAKm);
    }

    aMilla() {
        this.operacionUnaria((a) => a * this.kmAMilla);
    }

    aC() {
        this.operacionUnaria((a) => a * this.farenheitACelcius);
    }

    aF() {
        this.operacionUnaria((a) => a * this.celciusAFarenheit);
    }

    aMl() {
        this.operacionUnaria((a) => a * this.onzaAMl);
    }

    aOnza() {
        this.operacionUnaria((a) => a * this.mlAOnza);
    }

    aYd() {
        this.operacionUnaria((a) => a * this.mAYd);
    }

    aM() {
        this.operacionUnaria((a) => a * this.ydAM);
    }

    aOz() {
        this.operacionUnaria((a) => a * this.mlAOnza);
    }

}

let calculadora = new CalculadoraEspecializada();