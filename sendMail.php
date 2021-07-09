<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once './PHPMailer/src/PHPMailer.php';
require_once './PHPMailer/src/Exception.php';
require_once './PHPMailer/src/SMTP.php';

$phpmailer = new PHPMailer();
$phpmailer->isSMTP();
$phpmailer->Host = $_SERVER['HTTP_PHP_MAILER_HOST'];
$phpmailer->SMTPAuth = true;
$phpmailer->Port = $_SERVER['HTTP_PHP_MAILER_PORT'];
$phpmailer->Username = $_SERVER['HTTP_PHP_MAILER_USERNAME'];
$phpmailer->Password = $_SERVER['HTTP_PHP_MAILER_PASSWORD'];


$contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';

if($contentType == 'application/json'){
    $content = trim(file_get_contents('php://input'));
    //Convert content into PHP Array
    $decoded = json_decode($content, true);
    if(is_array($decoded)){
        $text = trim(filter_var($decoded['text'], FILTER_SANITIZE_STRING));
        $subject = trim(filter_var($decoded['subject'], FILTER_SANITIZE_STRING));
        if(empty($text) || empty($subject)) exit(json_encode('empty'));
        //ACTUALLY SEND EMAIL
        try{
            $phpmailer->setFrom('luke_courtney_portfolio@gmail.com');
            $phpmailer->Subject = $subject;
            $phpmailer->isHTML(true);
            $phpmailer->Body = '<p>'.$text.'</p>';
            $phpmailer->addAddress('lukechopper22@gmail.com');
    
            $phpmailer->send();
            exit(json_encode('true'));
        }catch(Exception $e){
            exit(json_encode('false'));
        }
    }
}

exit(json_encode('false'));