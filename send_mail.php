<?php

########### CONFIG ###############

/*$recipient = 'dom.grub789@gmail.com';*/
$redirect = 'https://gruppe-436.developerakademie.net/index.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $mailAdress = $_POST['mail'];
        $subject = "Password Reset Link";
        /*$subject = "Contact From " . $_POST['name'];*/
        $headers = "From:  noreply@developerakademie.com";
        $msg = "Hello\n\nthis is your password reset link.\nPlease click on the link bellow and we will redirect you to the reset page.\n\ngruppe-436.developerakademie.net/index.html?resetPassword=$mailAdress";

        mail($_POST['mail'], $subject, $msg, $link, $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}