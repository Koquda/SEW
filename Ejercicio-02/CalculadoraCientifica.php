<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Alejandro Campa Martínez" />
    <meta name="viewport" content="width=device-width, initial scale=1.0" />
    <title>Ejercicio3 - Calcualdora Científica</title>
    <link rel="stylesheet" href="CalculadoraCientifica.css">
</head>

<body>
   <h1> Calculadora Científica </h1>
    <?php
        session_start(); 

        if (!isset($_SESSION['screen']))
            $_SESSION['screen'] = '';

        if (!isset($_SESSION['memory']))
            $_SESSION['memory'] = 0;

        if (!isset($_SESSION['es_radianes']))
            $_SESSION['es_radianes'] = false;

        if (!isset($_SESSION['es_funcion_circular']))
                    $_SESSION['es_funcion_circular'] = false;

class CalculadoraMilan
{
    public $screen;

    public function __construct()
    {
        $this->screen= '';

        if (count($_POST) > 0) {

            // If there is a syntax error, we delete the screen 
            if ($this->screen == 'SYNTAX ERROR')
                $this->delete();

            if (isset($_POST['=']))
                $this->equals();
            if (isset($_POST['mrc']))
                $this->mrc();
            if (isset($_POST['m-']))
                $this->mMenos();
            if (isset($_POST['m+']))
                $this->mMas();
            if (isset($_POST['/']))
                $this->addChar('/');
            if (isset($_POST['*']))
                $this->addChar('*');
            if (isset($_POST['-']))
                $this->addChar('-');
            if (isset($_POST['+']))
                $this->addChar('+');
            if (isset($_POST['.']))
                $this->addChar('.');
            if (isset($_POST['ce']))
                $this->delete();
            if (isset($_POST['1']))
                $this->addDigit(1);
            if (isset($_POST['2']))
                $this->addDigit(2);
            if (isset($_POST['3']))
                $this->addDigit(3);
            if (isset($_POST['4']))
                $this->addDigit(4);
            if (isset($_POST['5']))
                $this->addDigit(5);
            if (isset($_POST['6']))
                $this->addDigit(6);
            if (isset($_POST['7']))
                $this->addDigit(7);
            if (isset($_POST['8']))
                $this->addDigit(8);
            if (isset($_POST['9']))
                $this->addDigit(9);
            if (isset($_POST['0']))
                $this->addDigit(0);

            // Session things
            if (!isset($_SESSION['screen']))
                $_SESSION['screen'] = '';
            if (!isset($_SESSION['memory']))
                $_SESSION['memory'] = 0;

            $_SESSION['screen'] .= $this->screen;
        }
    }

    public function addChar($char)
    {
        $this->screen.= $char;
    }


    public function addDigit($digit)
    {
        $this->screen.= $digit;
    }


    private function delete()
    {
        unset($_SESSION['memory']);
        unset($_SESSION['screen']);
    }

    private function mrc()
    {
        try {
            $_SESSION['screen'] = $_SESSION['memory'];
        } catch (Exception $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
        }
    }


    private function mMas()
    {
        try {
            $memoria = $_SESSION['memory'];
            $screen= $_SESSION['screen'];
            $expression = "return " . $_SESSION['memory'] . '+' . $_SESSION['screen'];
            $_SESSION['memory'] = eval($expression);
        } catch (Exception $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
            $this->delete();
        } catch (Error $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
            $this->delete();
        }
    }

    private function mMenos()
    {
        try {
            $memoria = $_SESSION['memory'];
            $screen= $_SESSION['screen'];
            $expression = "return " . $_SESSION['memory'] . '-' . $_SESSION['screen'];
            $_SESSION['memory'] = eval($expression);
        } catch (Exception $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
            $this->delete();
        } catch (Error $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
            $this->delete();
        }
    }

    private function equals()
    {
        try {
            $expresion = $_SESSION['screen'];
            $_SESSION['screen'] = eval("return $expresion ;");
        } catch (Error $e) {
            $_SESSION['screen'] = 'SYNTAX ERROR';
        }
    }
}


class CalculadoraCientifica extends CalculadoraMilan {
    public function __construct() {
        parent::__construct();

        if (count($_POST) > 0) {
            if(isset($_POST['unidad_angulo'])) 
                $this->cambiar_unidades_angulo();
            if(isset($_POST['pi'])) 
                $this->addChar(M_PI);
            if(isset($_POST['e']))
                $this->addChar(M_E);
            if(isset($_POST['parentesis_izquierdo'])) 
                $this->addChar('(');
            if(isset($_POST['parentesis_derecho'])) 
                $this->addChar(')');
            if(isset($_POST['cuadrado'])) 
                $this->unary_operation(fn($x) => pow($x, 2));
            if(isset($_POST['potencia'])) 
                $this->addChar('**');
            if(isset($_POST['raiz_cuadrada'])) 
                $this->unary_operation(fn($x) => sqrt($x));
            if(isset($_POST['potencia10'])) 
                $this->unary_operation(fn($x) => pow($x, 10));
            if(isset($_POST['logaritmo'])) 
                $this->unary_operation(fn($x) => log10($x));
            if(isset($_POST['logaritmo_neperiano'])) 
                $this->unary_operation(fn($x) => log($x));
            if(isset($_POST['modulo'])) 
                $this->addChar('%');
            if(isset($_POST['mas_menos'])) 
                $this->unary_operation(fn($x) => $x * (-1));
            if(isset($_POST['sin'])) 
                $this->sin();
            if(isset($_POST['coseno'])) 
                $this->coseno();
            if(isset($_POST['tangente'])) 
                $this->tangente();
            if(isset($_POST['factorial'])) 
                $this->unary_operation(function($x) {
                    $factorial = 1;
                    for ($i = $x; $i > 1; $i--)
                        $factorial *= $i;
                    return $factorial;
                });
            if(isset($_POST['shift'])) 
                $this->shift();
            if(isset($_POST['mr'])) 
                $this->mr();
            if(isset($_POST['mc'])) 
                $this->mrc();
            if(isset($_POST['guardar_en_memoria'])) 
                $this->guardar_en_memoria();
            if(isset($_POST['backspace'])) 
                $this->backspace();

            $_SESSION['screen'] .= $this->screen;
        }
    }
    
    public function get_angulo() {
        if (isset($_SESSION['es_radianes']))
            return $_SESSION['es_radianes'] ? 'RAD' : 'DEG';
    }
    
    public function get_coseno() {
        if (isset($_SESSION['es_funcion_circular']))
            return $_SESSION['es_funcion_circular'] ? 'cosh' : 'cos';
    }
    
    public function get_seno() {
        if (isset($_SESSION['es_funcion_circular']))
            return $_SESSION['es_funcion_circular'] ? 'senh' : 'sen';
    }
    
    public function get_tangente() {
        if (isset($_SESSION['es_funcion_circular']))
            return $_SESSION['es_funcion_circular'] ? 'tanh' : 'tan';
    }
    
    private function unary_operation($function) {
        if (isset($_SESSION['screen']))
            try {
                $expresion = $function($_SESSION['screen']);
                $_SESSION['screen'] = eval("return $expresion ;"); 
            } catch (Error $e) {
                $_SESSION['screen'] = 'SYNTAX ERROR';
            }
        }
    
    private function sin() {
        if ($_SESSION['es_funcion_circular']) // si estamos trabajando con funciones circulares: sinh
            $this->unary_operation(fn($x) => sinh($this->angle($x)));
        else // si estamos trabjando con funciones trigonométricas convencionales
            $this->unary_operation(fn($x) => sin($this->angle($x)));
    }
    
    private function coseno() {
        if ($_SESSION['es_funcion_circular']) // si estamos trabajando con funciones circulares: cosh
            $this->unary_operation(fn($x) => cosh($this->angle($x)));
        else // si estamos trabjando con funciones trigonométricas convencionales
            $this->unary_operation(fn($x) => cos($this->angle($x)));
    }
    
    private function tangente() {
        if ($_SESSION['es_funcion_circular'])  // si estamos trabajando con funciones circulares: tanh
            $this->unary_operation(fn($x) => tanh($this->angle($x)));
        else // si estamos trabjando con funciones trigonométricas convencionales
            $this->unary_operation(fn($x) => tan($this->angle($x)));
    }
    
    private function backspace() {
        $_SESSION['screen'] = substr($_SESSION['screen'],
                                              0,
                                              strlen($_SESSION['screen']) - 1);
    }
    
    private function guardar_en_memoria() {
        $_SESSION['memory'] = $_SESSION['screen'];
    }
    
    private function mr() {
        $_SESSION['screen'] = $_SESSION['memory'];
    }
    
   
    private function cambiar_unidades_angulo() {
        $_SESSION['es_radianes'] = !$_SESSION['es_radianes'];
    }
    
    private function angle($x) {
        return $_SESSION['es_radianes'] ? $x : ($x * (M_PI / 180.0));
    }
    
    private function shift() {
        $_SESSION['es_funcion_circular'] = !$_SESSION['es_funcion_circular'];
    }

}
    

$calc = new CalculadoraCientifica();
$screen = $_SESSION['screen'];
$angle = $calc->get_angulo();
$sin = $calc->get_seno();
$coseno = $calc->get_coseno();
$tangente = $calc->get_tangente();

echo "
<form action='#' method='post'>
    <!-- PANTALLA para mostrar los resultados -->
    <label for='result' hidden>Pantalla para mostrar los resultados de los cálculos</label>
    <input type='text' id='result' value='$screen' disabled>
    <!-- Units -->
    <input type='submit' value='$angle' name='unidad_angulo' />
    <!-- Memory management -->
    <input type='submit' value='MC' name='mc' />
    <input type='submit' value='MR' name='mr' />
    <input type='submit' value='M-' name='m-' />
    <input type='submit' value='M+' name='m+' />
    <input type='submit' value='MS' name='guardar_en_memoria' />
    <!-- Buttons to perform the calculations -->
    <input type='submit' value='SHIFT'  name='shift' />
    <input type='submit' value='&#960;' name='pi' />
    <input type='submit' value='e'      name='e' />
    <input type='submit' value='C'      name='borrar' />
    <input type='submit' value='back'   name='backspace' />
    <input type='submit' value='x^2'       name='cuadrado' />
    <input type='submit' value='$sin'     name='sin' />
    <input type='submit' value='$coseno'   name='coseno' />
    <input type='submit' value='$tangente' name='tangente' />
    <input type='submit' value='mod'       name='modulo' />
    <input type='submit' value='&#8730;' name='raiz_cuadrada' />
    <input type='submit' value='('       name='parentesis_izquierdo' />
    <input type='submit' value=')'       name='parentesis_derecho' />
    <input type='submit' value='n!'      name='factorial' />
    <input type='submit' value='&#247;'  name='division' />
    <input type='submit' value='x^y'    name='potencia' />
    <input type='submit' value='7'      name='7' />
    <input type='submit' value='8'      name='8' />
    <input type='submit' value='9'      name='9' />
    <input type='submit' value='&#215;' name='producto' />
    <input type='submit' value='10x' name='potencia10' />
    <input type='submit' value='4'   name='4' />
    <input type='submit' value='5'   name='5' />
    <input type='submit' value='6'   name='6' />
    <input type='submit' value='-'   name='resta' />
    <input type='submit' value='log' name='logaritmo' />
    <input type='submit' value='1'   name='1' />
    <input type='submit' value='2'   name='2' />
    <input type='submit' value='3'   name='3' />
    <input type='submit' value='+'   name='suma' />
    <input type='submit' value='ln'     name='logaritmo_neperiano' />
    <input type='submit' value='&#177;' name='mas_menos' />
    <input type='submit' value='0'      name='0' />
    <input type='submit' value='.'      name='punto' />
    <input type='submit' value='='      name='igual' />
</form>";
    ?> 
</body>