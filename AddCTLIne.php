<?php
if(isset($_POST['data']) && isset($_POST['fileName']))
{
    $data = utf8_decode((string)$_POST['line']);
    $fileName = $_POST['fileName'];
    echo $fileName;
    $nameUs = substr($fileName,0,2);
   /* $archivo = fopen("results/$fileName","w");
    echo is_writable($fileName);
    fwrite($archivo,$data);
    fclose($archivo);
    return json_decode(true);*/
}
   
?>