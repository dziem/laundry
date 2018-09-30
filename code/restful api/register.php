<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
if($data['action'] == "insert"){
 $username = $data['username'];
 $password = $data['password'];
 $type = 'customer';
 $q = mysqli_query($con,"INSERT INTO `user` (`username`,`password`,`type`) VALUES ('$username','$password','$type')");
 if($q){
 $message['status'] = "success";
 $message['userID'] = mysqli_insert_id($con);
 }
 else{
 $message['status'] = "error";
 }
 echo json_encode($message);
}
echo mysqli_error($con);
?>