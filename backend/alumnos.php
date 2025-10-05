<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id_alumno'])) {
            $id = $_GET['id_alumno'];
            $sql = "SELECT * FROM alumnos WHERE id_alumno = $id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_assoc());
        } else {
            $sql = "SELECT * FROM alumnos";
            $result = $conn->query($sql);
            $alumnos = [];
            while ($row = $result->fetch_assoc()) {
                $alumnos[] = $row;
            }
            echo json_encode($alumnos);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "UPDATE alumnos SET 
                    nombre = ?, 
                    apellido = ?, 
                    email = ?, 
                    documento = ?, 
                    fecha_nacimiento = ?, 
                    telefono = ?, 
                    actualizado_en = NOW()
                WHERE id_alumno = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "ssssssi",
            $data['nombre'],
            $data['apellido'],
            $data['email'],
            $data['documento'],
            $data['fecha_nacimiento'],
            $data['telefono'],
            $data['id_alumno']
        );
        $stmt->execute();
        echo json_encode(["message" => "Alumno actualizado correctamente"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "DELETE FROM alumnos WHERE id_alumno = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $data['id_alumno']);
        $stmt->execute();
        echo json_encode(["message" => "Alumno eliminado correctamente"]);
        break;
}
?>
