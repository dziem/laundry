<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

 $username = $data['username'];
 $password = $data['password'];
 $q = mysqli_query($con,"select userID from user where username = '$username' and password = '$password' and type='customer'");
 $row = mysqli_fetch_assoc ($q);
      //$active = $row['active'];

      $count = mysqli_num_rows($q);
  if($count >0) {

     $message['status']= "Your Login success";
     $message['userID']= $row['userID'];

      }else {

    $message['status']= "Your Login Email or Password is invalid";         

      }

 echo json_encode( $message);
?>