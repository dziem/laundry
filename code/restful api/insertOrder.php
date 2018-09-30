<?php
include "db.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
if($data['action'] == "insert"){
 $name = $data['name'];
 $phone = $data['phone'];
 $stype = $data['stype'];
 $stime = $data['stime'];
 $status = 'Order Placed';
 $userID = $data['userID'];
 $q = mysqli_query($con,"INSERT INTO `order` (`name`,`phoneNumber`,`stype`,`stime`,`status`,`userID`) 
 VALUES ('$name','$phone','$stype','$stime','$status','$userID')");
 if($q){
	$orderID = mysqli_insert_id($con);
	$type = 'Pickup';
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