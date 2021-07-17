const express = require('express');
const app = express();
const os = require('os');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');
var exec = require('child_process').exec;

function execute_command(command, cb){
    var child = exec(command, function (err, stdout, stderr) {
        if (err != null) {
            return cb(new Error(err), null);
        } else if (typeof (stderr) != "string") {
            return cb(new Error(stderr), null);
        } else {
            return cb(null, stdout);
        }
    });
}

app.get('/',(req,res)=>{
    execute_command("sh temp.sh", function (err, response) {
        if (!err) {
            res.send("Hi "+response);
        } else {
            res.send(err);
        }
    });
});

app.listen(3000,()=>{
    console.log('Server is on');
})