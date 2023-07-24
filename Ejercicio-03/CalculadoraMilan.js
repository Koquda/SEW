const SYNTAX_ERROR = "SYNTAX ERROR";

class CalculadoraMilan {


    constructor() {
        this.pantalla = '';
        this.memoria = new Array();
        this.lastOperation = '';
        this.m = '';
        this.igualUltimaOperacion = false;

        document.addEventListener('keydown', (event) => {
            const key = event.key;

            
            // Comprobar que input se ha pulsado para llamar al método correspondiente
            if (Number.isInteger(Number(key)))
                this.digitos(key);
            else if (key === '.')
                this.punto();
            else if (key === '+')
                this.suma();
            else if (key === '-')
                this.resta();
            else if (key === '*')
                this.multiplicacion();
            else if (key === '/')
                this.division();
            else if (key.toUpperCase() === 'C')
                this.borrar();
            else if (key === '=')
                this.igual();
            else if (key === '%')
                this.porcentaje();
        });
    }

    reiniciar() {
        this.pantalla = '';
        this.memoria = new Array();
        this.actualizaPantalla();
    }

    // --------------------------------------------------------
    // Operadores
    // -------------------------------------------------------- 

    suma() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('+');
    }

    resta() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('-');
    }

    multiplicacion() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('*');
    }

    division() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('/');
    }

    borrar() {
        this.igualUltimaOperacion = false;
        this.reiniciar();
    }

    borrarError() {
        this.igualUltimaOperacion = false;
        this.pantalla = '';
        this.actualizaPantalla();
    }

    masMenos() {
        this.igualUltimaOperacion = false;
        this.pantalla = this.pantalla * -1;
        this.actualizaPantalla();
    }

    raiz() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('√');
    }

    porcentaje() {
        this.igualUltimaOperacion = false;
        this.#pantallaAMemoria();
        this.memoria.push('%');
    }


    // --------------------------------------------------------
    // Digitos y puntos a.k.a no operadores
    // -------------------------------------------------------- 

    digitos(digito) {
        this.igualUltimaOperacion = false;
        if (Number.isFinite(this.pantalla)) {
            this.pantalla = '';
        }
        this.pantalla += digito;
        this.actualizaPantalla();
    }

    punto() {
        this.igualUltimaOperacion = false;
        this.pantalla += '.';
        this.actualizaPantalla();
    }

    mrc() {
        this.igualUltimaOperacion = false;
        if (this.m === '') {
            this.pantalla = '';
        } else {
            this.pantalla = this.m;
        }
        this.m = '';
        this.actualizaPantalla();
    }

    memoriaSumar() {
        this.igualUltimaOperacion = false;
        this.memoriaEval('+');
    }

    memoriaRestar() {
        this.igualUltimaOperacion = false;
        this.memoriaEval('-');
    }

    memoriaEval(operador) {
        try {
            this.pantalla = eval(this.pantalla + operador + this.m);
            this.m = this.pantalla;

        } catch (err) {
            this.pantalla = SYNTAX_ERROR;
        }
        this.actualizaPantalla();
    }


    // --------------------------------------------------------
    // Actualizar la pantalla de la calculadora
    // --------------------------------------------------------

    actualizaPantalla() {
        document.getElementById('res').value = this.pantalla;
    }

    #pantallaAMemoria() {
        if (this.pantalla === SYNTAX_ERROR) {
            this.pantalla = '';
            this.actualizaPantalla();
            return;
        }
        if (this.pantalla !== '') {
            this.memoria.push(this.pantalla);
        }
        this.pantalla = '';
        this.actualizaPantalla();
    }



    // --------------------------------------------------------
    // Igual
    // --------------------------------------------------------

    igual() {
        this.#pantallaAMemoria();
        this.#resolverMemoria();
        this.actualizaPantalla();
        this.igualUltimaOperacion = true;
    }

    #resolverMemoria() {
        let aux = '';
        try {
            if (this.igualUltimaOperacion === false) {
                for (let i = 0; i < this.memoria.length; i++) {

                    // Comprobaciones de la raiz
                    if (this.memoria[i] === '√' && i + 1 === this.memoria.length) {
                        aux = "Math.sqrt(" + aux + ")";
                        this.memoria[i] = "";
                    } else if (this.memoria[i] === '√') {
                        this.memoria[i] = "Math.sqrt(";
                        this.memoria[i + 1] += ")";
                    }

                    // Comprobaciones del porcentaje
                    if (this.memoria[i] === '%') {
                        this.memoria[i] = "/100";
                        if (this.memoria[i - 2] === '+' || this.memoria[i - 2] === '-') {
                            this.memoria[i] += "*" + this.memoria[i - 3];
                        }
                    }

                    aux += this.memoria[i];
                }
                this.lastOperation = this.memoria[this.memoria.length - 2] + this.memoria[this.memoria.length - 1];
            } else {
                aux += this.m;
                aux += this.lastOperation;
            }

            this.isResult = true;
            console.log(aux)
            this.memoria = new Array();
            this.pantalla = eval(aux);
            // Save the number in the memory to be used in m+, m- ...
            this.m = this.pantalla;

            if (this.pantalla === undefined || Number.isNaN(this.pantalla))
                throw err;
        } catch (err) {
            this.pantalla = SYNTAX_ERROR;
        }
    }
}




let calculadora = new CalculadoraMilan();