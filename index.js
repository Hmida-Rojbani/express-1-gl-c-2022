const express = require('express');

const app = express();

app.get(['/','/index'],function(request,response) {
    response.send('<h1> Hello in our first Rest app </h1>')
});

app.post(['/','/index'],function(request,response) {
    response.send('<h1> Hello in our first Rest app VIA POST </h1>')
});

app.listen(3000,function () {
    console.log('Listen on 3000');
});