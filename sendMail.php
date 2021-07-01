<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once './PHPMailer/src/PHPMailer.php';
require_once './PHPMailer/src/Exception.php';
require_once './PHPMailer/src/SMTP.php';

$phpmailer = new PHPMailer();
$phpmailer->isSMTP();
$phpmailer->Host = 'smtp.mailtrap.io';
$phpmailer->SMTPAuth = true;
$phpmailer->Port = 2525;
$phpmailer->Username = '84608cdfb3d4ce';
$phpmailer->Password = '1bb6ea4923f8f9';


$contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';

if($contentType == 'application/json'){
    $content = trim(file_get_contents('php://input'));
    //Convert content into PHP Array
    $decoded = json_decode($content, true);

    if(is_array($decoded)){
        $phpmailer->setFrom('luke_courtney_portfolio@gmail.com');
        $phpmailer->Subject = 'Portfolio Message';
        $phpmailer->Body = $decoded['text'];
        $phpmailer->addAddress($decoded['email']);

        $phpmailer->send();

        exit(json_encode('true'));
    }
}

exit(json_encode('false'));