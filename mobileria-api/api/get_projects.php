<?php 

require_once __DIR__ . '/db.php'; 

try { 

    $stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC"); 

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC); 

    foreach ($projects as &$project) { 
        $project['tags'] = json_decode($project['tags'], true) ?: []; 
    } 

    echo json_encode($projects); 

} catch (PDOException $e) { 

    http_response_code(500); 

    echo json_encode([ 
        'success' => false, 
        'error' => $e->getMessage() 
    ]); 
}