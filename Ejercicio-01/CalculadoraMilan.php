<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Alejandro Campa Martínez" />
    <meta name="viewport" content="width=device-width, initial scale=1.0" />
    <title>Ejercicio1 - CalculadoraMilan</title>
    <link rel="stylesheet" href="CalculadoraMilan.css">
</head>

<body>
    <h1>Calculadora Milán</h1>
    <?php
session_start(); 

if (!isset($_SESSION['screen
']))
    $_SESSION['screen
    '] = '';

// Manejamos la memoria a través de la sesión
if (!isset($_SESSION['memory']))
    $_SESSION['memory'] = 0;

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

$calc = new CalculadoraMilan();

$screen= $_SESSION['screen'];

echo "
<form action='#' method='post'>
    <!-- PANTALLA para mostrar los resultados -->
    <label for='result' hidden>Pantalla para mostrar los resultados de los cálculos</label>
    <input type='text' id='result' value='$screen' disabled>


<!-- Botones de la calculadora -->
<input type='submit' value='CE'  name='ce'   />
<input type='submit' value='+/-' name='+/-'   />
<input type='submit' value='√'   name='√'   />        
<input type='submit' value='%'   name='%'   />
<input type='submit' value='mrc' name='mrc'    />     
<input type='submit' value='m-'  name='m-'   />
<input type='submit' value='7'   name='7'   />
<input type='submit' value='8'   name='8'   />
<input type='submit' value='9'   name='9'   />
<input type='submit' value='m+'  name='m+'   />
<input type='submit' value='*'   name='*'   />
<input type='submit' value='4'   name='4'   />
<input type='submit' value='5'   name='5'   />
<input type='submit' value='6'   name='6'   />
<input type='submit' value='/'   name='/'   />
<input type='submit' value='-'   name='-'   />
<input type='submit' value='1'   name='1'   />
<input type='submit' value='2'   name='2'   />
<input type='submit' value='3'   name='3'   />
<input type='submit' value='+'   name='+'   />     
<input type='submit' value='0'   name='0'   />
<input type='submit' value='.'   name='.'   />      
<input type='submit' value='='   name='='   />      
"
?>
</body>
