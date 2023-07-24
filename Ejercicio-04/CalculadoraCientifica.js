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
        this.pantallaAMemoria();
        this.memoria.push('+');
    }

    resta() {
        this.igualUltimaOperacion = false;
        this.pantallaAMemoria();
        this.memoria.push('-');
    }

    multiplicacion() {
        this.igualUltimaOperacion = false;
        this.pantallaAMemoria();
        this.memoria.push('*');
    }

    division() {
        this.igualUltimaOperacion = false;
        this.pantallaAMemoria();
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
        this.pantallaAMemoria();
        this.memoria.push('√');
    }

    porcentaje() {
        this.igualUltimaOperacion = false;
        this.pantallaAMemoria();
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

    pantallaAMemoria() {
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
        this.pantallaAMemoria();
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

                    // Comprobacion de modulo
                    if (this.memoria[i] === 'mod') {
                        this.memoria[i] = "%";
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




class CalculadoraCientifica extends CalculadoraMilan {

    constructor() {
        super();

        this.unidadesAngulo = 'deg';
        this.isScientifcNotation = false;
        this.isCircularFunction = false;
        this.isHyperbolicFunction = false;

        // Events
        document.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key !== ' ') {
                if (key === '(')
                    this.abrirParentesis(key);
                else if (key === ')')
                    this.cerrarParentesis(key);
                else if (key === '%')
                    this.modulo();
                else if (key === '!')
                    this.factorial();
                else if (key === 'Backspace')
                    this.borrarUltimoInput();
                else if (key === 'Shift')
                    this.flecha();
            }
        });
    }

    abrirParentesis() {
        this.igualUltimaOperacion = false;
        this.pantalla += '(';
        this.actualizaPantalla();
    }

    cerrarParentesis() {
        this.igualUltimaOperacion = false;
        this.pantalla += ')';
        this.actualizaPantalla();
    }

    memoriaSave() {
        this.igualUltimaOperacion = false;
        this.m = this.pantalla;
        this.pantalla = '';
        this.actualizaPantalla();
    }



    // --------------------------------------------------------
    // Operadores unarios
    // --------------------------------------------------------

    #operacionUnaria(funcion) {
        this.m = funcion(Number(this.pantalla));
        this.pantalla = this.m;
        this.isResult = true;
        this.memoria = new Array();
        this.actualizaPantalla();
    }


    // --------------------------------------------------------
    // Potencias
    // --------------------------------------------------------

    elevarCuadrado() {
        this.#operacionUnaria(x => Math.pow(x, 2));
    }

    elevarY() {
        this.igualUltimaOperacion = false;
        this.pantallaAMemoria();
        this.memoria.push('**');
    }

    diezElevado() {
        this.#operacionUnaria(x => Math.pow(10, x));
    }


    log() {
        this.#operacionUnaria(x => Math.log(x));
    }

    modulo() {
        this.memoria.push('mod');
    }

    factorial() {
        this.#operacionUnaria(function factorial(x) {
            if (x <= 1)
                return 1;
            return x * factorial(x - 1);
        });
    }
    
    exponente() {
        this.#operacionUnaria(x => Math.exp(x));
    }


    // --------------------------------------------------------
    // Trigonometria
    // --------------------------------------------------------

    seno() {
        // Diferenciar entre radianes y grados
        const tipo = document.getElementById('seno').value.toLowerCase();

        if (this.isCircularFunction) {
            if (tipo === 'sinh')
                this.#operacionUnaria(x => Math.sinh(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.asinh(this.getAngulo(x)));
        } else {
            if (tipo === 'sin')
                this.#operacionUnaria(x => Math.sin(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.asin(this.getAngulo(x)));
        }

    }

    coseno() {
        const tipo = document.getElementById('coseno').value.toLowerCase();
        // Diferenciar entre radianes y grados
        if (this.isCircularFunction) {
            if (tipo === 'cosh')
                this.#operacionUnaria(x => Math.cosh(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.acosh(this.getAngulo(x)));
        } else {
            if (tipo === 'cos')
                this.#operacionUnaria(x => Math.cos(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.acos(this.getAngulo(x)));
        }
    }

    tangente() {
        const tipo = document.getElementById('tangente').value.toLowerCase();
        // Diferenciar entre radianes y grados
        if (this.isCircularFunction) {
            if (tipo === 'tanh')
                this.#operacionUnaria(x => Math.tanh(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.atanh(this.getAngulo(x)));
        } else {
            if (tipo === 'cos')
                this.#operacionUnaria(x => Math.tan(this.getAngulo(x)));
            else 
                this.#operacionUnaria(x => Math.atan(this.getAngulo(x)));
        }
    }

    // --------------------------------------------------------

    borrarUltimoInput() {
        this.pantalla = this.pantalla.slice(0, -1);
        this.actualizaPantalla();
    }

    // --------------------------------------------------------
    // Angulos
    // --------------------------------------------------------

    cambiaUnidadesAngulo() {
        this.unidadesAngulo = this.unidadesAngulo === 'deg' ? 'rad' : 'deg';
        document.getElementById('unidadesAngulo').value = this.unidadesAngulo.toUpperCase();
    }

    getAngulo(x) {
        if (this.unidadesAngulo.toUpperCase === 'DEG') {
            return x * (Math.PI / 180.0);
        } else {
            return x;
        }
    }

    flecha() {
        this.isCircularFunction = !this.isCircularFunction;

        if (this.isCircularFunction) {
            if (this.isHyperbolicFunction) {
                document.getElementById('seno').value = 'asinh';
                document.getElementById('coseno').value = 'acosh';
                document.getElementById('tangente').value = 'atanh';
            } else {
                document.getElementById('seno').value = 'asin';
                document.getElementById('coseno').value = 'acos';
                document.getElementById('tangente').value = 'atan';
            }
        } else {
            if (this.isHyperbolicFunction) {
                document.getElementById('seno').value = 'sinh';
                document.getElementById('coseno').value = 'cosh';
                document.getElementById('tangente').value = 'tanh';
            } else {
                document.getElementById('seno').value = 'sin';
                document.getElementById('coseno').value = 'cos';
                document.getElementById('tangente').value = 'tan';
            }
        }
    }

    hyp() {
        this.isHyperbolicFunction = !this.isHyperbolicFunction;

        if (this.isHyperbolicFunction) {
            document.getElementById('seno').value += 'h';
            document.getElementById('coseno').value += 'h';
            document.getElementById('tangente').value += 'h';
        } else {
            document.getElementById('seno').value = document.getElementById('seno').value.slice(0, -1);
            document.getElementById('coseno').value = document.getElementById('coseno').value.slice(0, -1);
            document.getElementById('tangente').value = document.getElementById('tangente').value.slice(0, -1);
        }
    }

    fe() {
        this.isFE = !this.isFE;

        try {
            if (this.isFE) {
                this.pantalla = Number(this.pantalla).toExponential();
            } else {
                this.pantalla = Number(this.pantalla).toFixed();
            }
        } catch (err) {
            this.pantalla = SYNTAX_ERROR;
        }
    }


}

let calculadora = new CalculadoraCientifica();