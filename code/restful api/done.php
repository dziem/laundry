<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$requestID = $data['requestID'];
$type = $data['type'];
$orderID = $data['orderID'];
if($type == 'Pickup'){
	$status = 'Picked Up';
	$weight = $data['weight'];
	$ovrp = $data['ovrp'];
	$paid = $data['paid'];
}else{
	$status = 'Delivered';
	$paid = 'Paid';
}
$q=mysqli_query($con,"UPDATE `request` SET `rstatus` = 'Done' WHERE `requestID` = '$requestID'");

if($q){
	if($type == 'Pickup'){
	$q2 = mysqli_query($con,"UPDATE `order` SET `status` = '$status', 
	`weight` = '$weight', `price` = '$ovrp', `payment` = '$paid'
	WHERE `orderID` = '$orderID'");
	}else{
		$q2 = mysqli_query($con,"UPDATE `order` SET `status` = '$status'
	WHERE `orderID` = '$orderID'");
	}
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