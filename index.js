const express = require('express');

const app = express();

app.get(['/','/index'],function(request,response) {
    response.send('<h1> Hello in our first Rest app </h1>');
});

app.post(['/','/index'],function(request,response) {
    response.send('<h1> Hello in our first Rest app VIA POST </h1>');
});

let quotes = {
    'einstein': 'We cannot solve our problems with the same thinking we used when we created them.',
    'tesla': 'The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.'
};

app.get('/quotes/:name', (request,response) => {
    response.send(quotes[request.params.name]);
});

app.get('/posts/:month/:year', (request,response) => {
    response.send('posts of : ' + JSON.stringify(request.params));
});
app.listen(3000,function () {
    console.log('Listen on 3000');
});