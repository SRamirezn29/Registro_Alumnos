<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "registro_alumnos"; // cámbiarlo al nombre del DB original

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
