$(document).ready(function () {
  fullDataUs = [];
  procesoCompleto = false;
  CTDATA = "";
  archivosRips = [];
  usuariosFactura = new Map();
  datosCT = new Map();
  queue = [];
  consolidateUs = [];
  recuperarArchivosRips();
  $("#ejecutar").click(function () {

    console.log(files);

    //archivo AC
    console.log(files[0]);
    //Archivo AF
    console.log(files[1]);

    //console AH
    console.log(files[2]);

    //Archivo AM
    console.log(files[3]);

    //Archivo AN
    console.log(files[4]);

    //ARchivo AP
    console.log(files[5]);

    //archivo AT
    console.log(files[6]);

    //archivo AU

    console.log(files[7]);


    //arhicvo CT
    console.log(files[8]);
    //archivo US
    console.log(files[9]);

    $.ajax({
      url: files[1],
      dataType: "text",
      async: false,
      success: function (data) {
        var contadorAF = 0;
        var fileName = "";
        var fileNameWithOutExtension = "";

        var codigoHabilidation = "";
        var fechaFactura = "";
        var af_data = data.split("\n");
        af_data.forEach(function (lineaActual, index, array) {
          CTDATA = "";
          var lineaActualArray = lineaActual.split(",");
          if (lineaActualArray[4] != undefined) {
            contadorAF = contadorAF + 1;

            fileName = "AF" + lineaActualArray[4];
            fileNameWithOutExtension = "AF" + lineaActualArray[4];
            codigoHabilidation = lineaActualArray[0];
            fechaFactura = lineaActualArray[5];

            makeAF(fileName, lineaActualArray, codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAC(archivosRips[obtenerIndice('AC', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAH(archivosRips[obtenerIndice('AH', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAM(archivosRips[obtenerIndice('AM', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAN(archivosRips[obtenerIndice('AN', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAP(archivosRips[obtenerIndice('AP', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAT(archivosRips[obtenerIndice('AT', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeAU(archivosRips[obtenerIndice('AU', files)], lineaActualArray[4], codigoHabilidation, fechaFactura, lineaActualArray[4]);
            makeUS(lineaActualArray[4], codigoHabilidation, fechaFactura);
          }
        });



        procesoCompleto = true;

        setInterval(function () {
          for (var u = 1; u < 10; u++) {
            if (queue.length > 0 && procesoCompleto == true) {
              console.log("entro");
              var queueData = queue.shift();
              $.ajax({
                data: queueData,
                url: "makeFile.php",
                type: "post",
                success: function (response) {
                  console.log("archivo " + response + "creado");
                }
              });
              if (queueData.fileName.indexOf("CT") < 0 ) {
                var linea = queueData.codigoHabilidation + "," + queueData.fechaFactura + "," + queueData.fileName.substring(0, 2) + queueData.factura + "," + queueData.count + "\n";
                
                var ctFactura = datosCT.get(queueData.factura);

                if (ctFactura == undefined) {
                  datosCT.set(queueData.factura, linea);
                } else {
                  datosCT.set(queueData.factura, ctFactura + linea);
                }

              }
            }
            if (queue.length == 0) {
              datosCT.forEach(function (value, index, map) {
                downloadFile("CT" + index + ".txt", {
                  data: value,
                  count: 0
                }, 0, 0, index);
              });
              datosCT = new Map();

            }

          }

        }, 1000);
        console.log("Proceso completo");
      }
    });



  });

  function downloadFile(fileName, data, codigoHabilidation, fechaFactura, factura) {
    /* var blob = new Blob([data], {
       type: "text/plain;charset=utf-8"
     });
     saveAs(blob, fileName);
     */
    parameters = {
      fileName: fileName,
      data: data.data,
      count: data.count,
      codigoHabilidation: codigoHabilidation,
      fechaFactura: fechaFactura,
      factura: factura
    };
    queue.push(parameters);

  }


  function findInUs(document) {
    var res = alasql('SELECT * FROM ? where [1] = ?', [fullDataUs, document]);
    return res[0];
  }

  function makeUS(numFactura, codHab, fecFac) {
    var fileName = "US" + numFactura + ".txt";
    var response = alasql('SELECT DISTINCT * FROM ?', [consolidateUs]);

    var linea = "";
    var contador = 0;
    usuariosFactura.get(numFactura).forEach(function (lineaActual, key, map) {

      //console.log(lineaActual);
      if (lineaActual != undefined) {
        if (linea == "") {
          linea = decodeURIComponent(lineaActual[0] + "," + lineaActual[1] + "," + lineaActual[2] + "," + lineaActual[3] + "," + lineaActual[4] + "," + lineaActual[5] + "," + lineaActual[6] + "," + lineaActual[7] + "," + lineaActual[8] + "," + lineaActual[9] + "," + lineaActual[10] + "," + lineaActual[11] + "," + lineaActual[12] + "," + lineaActual[13] + "\n");
        } else {
          linea = decodeURIComponent(linea + lineaActual[0] + "," + lineaActual[1] + "," + lineaActual[2] + "," + lineaActual[3] + "," + lineaActual[4] + "," + lineaActual[5] + "," + lineaActual[6] + "," + lineaActual[7] + "," + lineaActual[8] + "," + lineaActual[9] + "," + lineaActual[10] + "," + lineaActual[11] + "," + lineaActual[12] + "," + lineaActual[13] + "\n");
        }
        contador = contador + 1;
      }

    });
    downloadFile(fileName, {
      data: linea,
      count: contador
    }, codHab, fecFac, numFactura);
  }


  function obtenerIndice(prefijo, archivos) {
    for (var i = 0; i < archivos.length; i++) {
      if (archivos[i].indexOf(prefijo) >= 0) {
        return i;
      }
    }
  }



  function getUs() {

    var usData = [];
    $.ajax({
      url: files[obtenerIndice("US", files)],
      dataType: "text",
      success: function (data) {
        var datos = "";

        var af_data = data.split("\n");
        af_data.forEach(function (lineaActual, index, array) {
          var lineaActualArray = lineaActual.split(",");
          fullDataUs.push(lineaActualArray);

        });

        for (var k = 0; k < files.length; k++) {
          recuperarDatosArchivo(k);
          sleep(10000);
        }
        //  downloadFile(fileName, {data:datos, af_data});
        console.log("termino de cargar us");
      }

    });

  }


  function sleep(milliseconds) {
    let timeStart = new Date().getTime();
    while (true) {
      let elapsedTime = new Date().getTime() - timeStart;
      if (elapsedTime > milliseconds) {
        break;
      }
    }
  }





  function makeAF(fileName, data, codigoHabilidation, fechaFactura, factura) {
    var string = data[0] + "," + data[1] + "," + data[2] + "," + data[3] + "," + data[4] + "," + data[5] + "," + data[6] + "," + data[7] + "," + data[9] + "," + data[10] + "," + data[11] + "," + data[12] + "," + data[13];
    downloadFile(fileName, {
      data: string,
      count: 1
    }, codigoHabilidation, fechaFactura, factura);
  }


  function makeAC(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {
    return readFile(archivoOriginal, "AC" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeAM(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {
    return readFile(archivoOriginal, "AM" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }


  function makeAP(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {
    return readFile(archivoOriginal, "AP" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeAT(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {

    return readFile(archivoOriginal, "AT" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeAH(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {
    return readFile(archivoOriginal, "AH" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeAN(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {
    return readFile(archivoOriginal, "AN" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeAU(archivoOriginal, numFactura, codigoHabilidation, fechaFactura, factura) {

    return readFile(archivoOriginal, "AU" + numFactura + ".txt", numFactura, 0, codigoHabilidation, fechaFactura, factura);
  }

  function makeCT(numFactura, fechaFactura, codigoHabilidation) {
    // return readFile( "CT" + numFactura + ".txt", numFactura, 0);

  }





  function recuperarArchivosRips() {
    getUs();

  }

  function recuperarIndiceIdentificacion(nombreArchivo) {
    if (nombreArchivo.indexOf("AC") >= 0 ||
      nombreArchivo.indexOf("AH") >= 0 ||
      nombreArchivo.indexOf("AM") >= 0 ||
      nombreArchivo.indexOf("AP") >= 0 ||
      nombreArchivo.indexOf("AN") >= 0 ||
      nombreArchivo.indexOf("AT") >= 0) {
      return 3;
    }



    return -1;
  }


  function recuperarDatosArchivo(k) {
    var indiceFactura = recuperarIndiceFactura(files[k]);
    var indiceIdetificacion = recuperarIndiceIdentificacion(files[k]);
    if (indiceFactura >= 0) {
      $.ajax({
        url: files[k],
        dataType: "text",
        async: false,
        success: function (data) {
          archivosRipsMap = new Map();
          usuariosFacturaMap = new Map();
          var af_data = data.split("\n");
          var contadorArchivo = 0;
          af_data.forEach(function (lineaActual, index, array) {
            var lineaActualArray = lineaActual.split(",");


            var numFac = lineaActualArray[indiceFactura];



            if (numFac != undefined) {

              if (indiceIdetificacion > 0) {
                var lineaActualDocumento = lineaActualArray[indiceIdetificacion]
                var user = findInUs(lineaActualDocumento);
                var usuarios = usuariosFactura.get(numFac);
                if (usuarios != undefined) {
                  var infoUsuario = usuarios.get(lineaActualDocumento);
                  if (infoUsuario == undefined) {
                    usuarios.set(lineaActualDocumento, user);
                  }

                } else {
                  var map = new Map();
                  map.set(lineaActualDocumento, user);
                  usuariosFactura.set(numFac, map);
                }
              }


              contadorArchivo = 1;
              var registrosFactura = archivosRipsMap.get(numFac);
              if (registrosFactura == undefined) {
                registrosFactura = lineaActual + "\n";
              } else {
                lineaActual = registrosFactura.data + lineaActual + "\n";
                contadorArchivo = registrosFactura.count + 1;
              }
              archivosRipsMap.set(numFac, {
                data: lineaActual,
                count: contadorArchivo
              });

            }
          });

          archivosRips[k] = archivosRipsMap;
          console.log(archivosRips[k]);
        }
      });
    }


  }

  function recuperarIndiceFactura(nombreArchivo) {
    if (nombreArchivo.indexOf("AF") >= 0) {
      return 4;
    }

    if (nombreArchivo.indexOf("US") >= 0) {
      return -1;
    }

    return 0;
  }


  function readFile(data, nombreArchivoSalida, numFactura, indiceNumeroFactura, codHab, fecFac, factura) {


    var contador = 0;
    var datos = data.get(numFactura);
    if (datos == undefined) {
      datos = {
        data: "",
        count: 0
      };
    }

    var fileName = nombreArchivoSalida;
    downloadFile(fileName, datos, codHab, fecFac, factura);


  }




















});