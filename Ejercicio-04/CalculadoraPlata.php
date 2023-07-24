<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Alejandro Campa Martínez" />
    <meta name="viewport" content ="width=device-width, initial scale=1.0" />
    <title>Ejercicio3 - Calculadora Precio Plata</title>
    <link rel="stylesheet" href="CalculadoraPlata.css">
</head>
<body>
    <h1>Calculadora Precio Plata</h1>
<?php

// set API Endpoint and API key 
$endpoint = 'latest';
$access_key = 'slm7f0hep5pm4pr1kgvf28h35m32s8v36ux24m5taa9wpo3o9cq97ozfilf0';

// Initialize CURL:
$ch = curl_init('https://metals-api.com/api/'.$endpoint.'?access_key='.$access_key.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$exchangeRates = json_decode($json, true);

// Access the exchange rate values, e.g. GBP:
echo $exchangeRates['rates']['GBP'];

?>
</body>
</html>