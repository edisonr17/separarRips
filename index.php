<!doctype html>
<html>
<meta charset="utf-8">
<head>
    <title>RIPS</title>
<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            
</head>

<body>
    <script src="./alasql/dist/alasql.min.js"></script>
    <script src="./node_modules/file-saver/dist/FileSaver.min.js"></script>
    <script src="./node_modules/jszip/dist/jszip.min.js"></script>


    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>


    

        <button class="btn waves-effect waves-light" id="ejecutar" type="submit" name="action">Separar
            <i class="material-icons right">></i>
          </button>
    
    <div class="text">
        <hr />
        <h2>Texto:</h2>
    </div>
    <?php
    $files = [];
   $fileList = glob('files/*');
   foreach($fileList as $filename){
       //Use the is_file function to make sure that it is not a directory.
       if(is_file($filename)){
        array_push($files,$filename);
       }   
   }
    ?>
        

    <script type="text/javascript">
        var files = <?php echo json_encode($files); ?>;
    </script>
    <script src="app.js"></script>
</body>

</html>