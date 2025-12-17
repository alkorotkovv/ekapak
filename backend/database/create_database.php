<?php

/**
 * Скрипт для автоматического создания базы данных
 * 
 * Использование:
 * php database/create_database.php
 */

// Загружаем .env файл
$envFile = __DIR__ . '/../.env';
if (!file_exists($envFile)) {
    echo "Ошибка: файл .env не найден!\n";
    exit(1);
}

// Парсим .env файл
$env = [];
$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    // Пропускаем комментарии
    if (strpos(trim($line), '#') === 0) {
        continue;
    }
    // Парсим KEY=VALUE
    if (strpos($line, '=') !== false) {
        list($key, $value) = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

$dbName = $env['DB_DATABASE'] ?? 'ekapak_backend';
$dbHost = $env['DB_HOST'] ?? '127.0.0.1';
$dbPort = $env['DB_PORT'] ?? '5432';
$dbUser = $env['DB_USERNAME'] ?? 'postgres';
$dbPassword = $env['DB_PASSWORD'] ?? '';

// Подключаемся к PostgreSQL без указания базы данных (к системной БД postgres)
try {
    $pdo = new PDO(
        "pgsql:host={$dbHost};port={$dbPort};dbname=postgres",
        $dbUser,
        $dbPassword
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Проверяем, существует ли база данных
    $stmt = $pdo->query("SELECT 1 FROM pg_database WHERE datname = '{$dbName}'");
    $exists = $stmt->fetch();

    if ($exists) {
        echo "База данных '{$dbName}' уже существует.\n";
    } else {
        // Создаем базу данных
        $pdo->exec("CREATE DATABASE {$dbName}");
        echo "База данных '{$dbName}' успешно создана!\n";
    }

    echo "\nТеперь можно запустить миграции:\n";
    echo "php artisan migrate\n";

} catch (PDOException $e) {
    echo "Ошибка: " . $e->getMessage() . "\n";
    echo "\nУбедитесь, что:\n";
    echo "1. PostgreSQL запущен\n";
    echo "2. Пользователь '{$dbUser}' существует и имеет права на создание БД\n";
    echo "3. Параметры подключения в .env правильные\n";
    exit(1);
}

