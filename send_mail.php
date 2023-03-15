<?php

$redirect = 'https://gruppe-436.developerakademie.net/index.html';

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the mail;
        header("Access-Control-Allow-Origin: *");

        $mailAdress = $_POST['mail'];
        $subject = "Password Reset Link";
        $headers .= "From: Join Team <noreply@developerakademie.com> \r\n";
        $msg = "Hello,\n\nthis is your password reset link.\nPlease click on the link bellow to set a new Password.\n\ngruppe-436.developerakademie.net/reset_password.html?($mailAdress)";

        mail($_POST['mail'], $subject, $msg, $link, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}