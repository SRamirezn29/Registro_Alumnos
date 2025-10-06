<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responder preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        if (isset($_GET['id_alumno'])) {
            $id = (int)$_GET['id_alumno'];
            $sql = "SELECT * FROM alumnos WHERE id_alumno = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $res = $stmt->get_result();
            echo json_encode($res->fetch_assoc() ?: []);
        } else {
            $sql = "SELECT * FROM alumnos ORDER BY creado_en DESC";
            $result = $conn->query($sql);
            $alumnos = [];
            while ($row = $result->fetch_assoc()) { $alumnos[] = $row; }
            echo json_encode($alumnos);
        }
        break;

    case 'POST': 
        $data = json_decode(file_get_contents("php://input"), true);

        // Validaciones mínimas
        $requeridos = ['nombre','apellido','documento'];
        foreach ($requeridos as $f) {
            if (empty($data[$f])) {
                http_response_code(422);
                echo json_encode(["error" => "El campo '$f' es obligatorio"]);
                exit;
            }
        }

        $sql = "INSERT INTO alumnos
                   (nombre, apellido, email, documento, fecha_nacimiento, telefono, creado_en, actualizado_en)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "ssssss",
            $data['nombre'],
            $data['apellido'],
            $data['email']            ?? null,
            $data['documento'],
            $data['fecha_nacimiento'] ?? null, // formato 'YYYY-MM-DD'
            $data['telefono']         ?? null
        );

        try {
            $stmt->execute();
            $nuevoId = $conn->insert_id;
            echo json_encode([
                "message" => "Alumno creado correctamente",
                "id_alumno" => $nuevoId
            ]);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo crear el alumno", "detalle" => $e->getMessage()]);
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

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
?>
