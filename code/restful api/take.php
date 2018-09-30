<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$requestID = $data['requestID'];
$userID = $data['userID'];
$type = $data['type'];
$orderID = $data['orderID'];
if($type == 'Pickup'){
	$status = 'Picking Up';
}else{
	$status = 'Delivering';
}
$q=mysqli_query($con,"UPDATE `request` SET `courierID` = '$userID', `rstatus` = '$status' WHERE `requestID` = '$requestID'");

if($q){
	$q2 = mysqli_query($con,"UPDATE `order` SET `status` = '$status' WHERE `orderID` = '$orderID'");
	
	if($q2){
		$message['status'] = "success";
	}else{
		$message['status'] = "error";
	}
 }else{
 $message['status'] = "error";
 }
echo json_encode($message);
echo mysqli_error($con);
?>