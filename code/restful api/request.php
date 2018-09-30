<?php
include "db.php";
$data=array();
$userID = $_GET['userID'];
$q=mysqli_query($con,"SELECT * FROM `request` WHERE courierID = $userID order by requestID desc");

while ($row=mysqli_fetch_object($q)){
 $data[]=$row;
}
echo json_encode($data);
echo mysqli_error($con);
?>