var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});






$(document).ready(function () {
    $("#ejecutar").click(function () {

        var files = fs.readdirSync('/files/');
        console.log(files);

        $.ajax({
            url: "files/AF039773.txt",
            dataType: "text",
            success: function (data) {
              //  console.log(data);
            }
        });
    });
});