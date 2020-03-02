<?php
if(isset($_POST['data']) && isset($_POST['fileName']))
{
    $data = utf8_decode((string)$_POST['data']);
    if($data == null){
        $arr = [];
    }
    else
    {
        $arr = explode("\n", $data);
    }
  
    $numLineas = $_POST['count'];
    
    $fileName = $_POST['fileName'];
    
    //$prefijo = substr($fileName,0,2);
    //$codigoHabilidation = $_POST["codigoHabilidation"];
   // $fechaFactura = $_POST["fechaFactura"];
   // $factura = $_POST["factura"];
    $archivo = fopen("results/$fileName","w");
    echo is_writable($fileName);
    fwrite($archivo,$data);
    fclose($archivo);

/*
    if($numLineas > 0)
    {
        $usFileName =  "CT".$factura . ".txt";

        if (file_exists($usFileName)) {
            $archivoUs = fopen("results/$usFileName","w");
        } else {
            $archivoUs = fopen("results/$usFileName","a");
        }
       
        fputs($archivoUs,  $codigoHabilidation.",". $fechaFactura. ",".$prefijo.$factura. ",". $numLineas."\n");
    
        fclose($archivoUs);

    }*/



    return json_decode(true);



}
   
?>