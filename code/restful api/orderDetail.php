<?php
include "db.php";
$data=array();
$orderID = $_GET['orderID'];
$q=mysqli_query($con,"SELECT * FROM `order` WHERE orderID = '$orderID'");

while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
echo mysqli_error($con);
?>