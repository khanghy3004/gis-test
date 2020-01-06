<?php
header('Access-Control-Allow-Origin: *');
function print_info($inf, $dirt, $noise, $water){
    $sum=$inf[1]+$inf[2]+$inf[3];
    $mystatus = $sum>150? "red": "green";
    printf("   {\"type\":\"Feature\",   \"geometry\":{");
    printf("\"type\":\"Point\",\"coordinates\":[ %f , %f ]},",$inf[5],$inf[6]);
    printf("\"properties\":{ \"id\": %.2f, \"dirt\": \"%.2f\",\"noise\":\"%.2f\",\"water\":\"%.2f\",\"sum\":\"%d\",\"status\":\"%s\",\"time\":\"%s\"",$inf[0],$inf[1],$inf[2],$inf[3],$sum,$mystatus,date("d-m-Y h:i:s", strtotime($inf[4])));
    // Dirt
    if ($inf[0]==1) {
        printf(",\"arr1\":[");
        for ($i = 0; $i < count($dirt[0])-1; $i++) {
            printf("%.2f,",$dirt[0][$i]);
        }
        printf("%.2f]",$dirt[0][count($dirt[0])-1]);
    }
    else if ($inf[0]==2 && count($dirt[1])>0) {
        printf(",\"arr1\":[");
        for ($i = 0; $i < count($dirt[1])-1; $i++) {
            printf("%.2f,",$dirt[1][$i]);
        }
        printf("%.2f]",$dirt[1][count($dirt[1])-1]);
    }
    // Noise
    if ($inf[0]==1) {
        printf(",\"arr2\":[");
        for ($i = 0; $i < count($noise[0])-1; $i++) {
            printf("%.2f,",$noise[0][$i]);
        }
        printf("%.2f]",$noise[0][count($noise[0])-1]);
    }
    else if ($inf[0]==2 && count($noise[1])>0) {
        printf(",\"arr2\":[");
        for ($i = 0; $i < count($noise[1])-1; $i++) {
            printf("%.2f,",$noise[1][$i]);
        }
        printf("%.2f]",$noise[1][count($noise[1])-1]);
    }
    // Water
    if ($inf[0]==1) {
        printf(",\"arr3\":[");
        for ($i = 0; $i < count($water[0])-1; $i++) {
            printf("%.2f,",$water[0][$i]);
        }
        printf("%.2f]",$water[0][count($water[0])-1]);
    }
    else if ($inf[0]==2 && count($water[1])>0) {
        printf(",\"arr3\":[");
        for ($i = 0; $i < count($water[1])-1; $i++) {
            printf("%.2f,",$water[1][$i]);
        }
        printf("%.2f]",$water[1][count($water[1])-1]);
    }
    printf("}}");
}

//Connect to mysql
  $db =array(
      'server' => 'localhost',
      'username'=>'root',
      'password'=>'',
      "dbname" =>'gis'
  );   
$con= mysqli_connect($db['server'],$db['username'],$db['password'],$db['dbname']);

// Select form sql, update data and print it each 5 seconds
date_default_timezone_set('Asia/Ho_Chi_Minh');
$date = date('Y-m-d 00:00:00', time());
$test = mysqli_query($con,"SELECT * FROM info");
$a = [];
if($test){
    while ($row= mysqli_fetch_row($test)){
        array_push($a, $row);
    }
    mysqli_free_result($test);
}
$id = 1;
$re = [];
$dirt = [];
$sub_dirt = [];
$noise = [];
$sub_noise = [];
$water = [];
$sub_water = [];
for ($i = 0; $i < count($a); $i++) {
    if ($a[$i][0] != $id) {
        array_push($dirt, $sub_dirt);
        array_push($noise, $sub_noise);
        array_push($water, $sub_water);
        $sub_dirt = [$a[$i][1]];
        $sub_noise = [$a[$i][2]];
        $sub_water = [$a[$i][3]];
        array_push($re, $a[$i-1]);
        $id = $a[$i][0];
    } 
    else {
        array_push($sub_dirt, $a[$i][1]);
        array_push($sub_noise, $a[$i][2]);
        array_push($sub_water, $a[$i][3]);
    }

}
array_push($dirt, $sub_dirt);
array_push($noise, $sub_noise);
array_push($water, $sub_water);
array_push($re, $a[count($a)-1]);
printf("{\"type\":\"FeatureCollection\",\"features\":[");
for ($i = 0; $i < count($re)-1; $i++) {
    print_info($re[$i], $dirt, $noise, $water);
    echo ",";
}
print_info($re[count($re)-1], $dirt, $noise, $water);
printf("]}");
?>