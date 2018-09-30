<?php
include "db.php";
$data=array();
$requestID = $_GET['requestID'];
$q=mysqli_query($con,"SELECT * FROM `request` r join `order` o WHERE r.orderID = o.orderID and requestID = '$requestID'");

while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
echo mysqli_error($con);
?>