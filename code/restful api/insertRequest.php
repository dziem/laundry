<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
if($data['action'] == "insert"){
 $status = 'Delivery Scheduled';
 $orderID = $data['orderID'];
 $q = mysqli_query($con,"UPDATE `order` SET `status` = '$status' WHERE `orderID` = '$orderID'");
 if($q){
	$type = 'Delivery';
	$address = $data['address'];
	$date = $data['date'];
	$time = $data['time'];
	$note = $data['note'];
	$rstatus = 'Waiting';
	$q2 = mysqli_query($con,"INSERT INTO `request` (`orderID`,`type`,`address`,`date`,`time`,`note`,`rstatus`) 
	VALUES ('$orderID','$type','$address','$date','$time','$note','$rstatus')");
	if($q2){
		$message['status'] = "success";
	}else{
		$message['status'] = "error";
	}
 }
 else{
 $message['status'] = "error";
 }
 echo json_encode($message);
}
echo mysqli_error($con);
?>