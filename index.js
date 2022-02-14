const express = require('express');

const morgan = require('morgan');
const config = require('config');
const appDebug = require('debug')('app:debug');
const dbDebug = require('debug')('app:db');
const student_router = require('./routers/students');

const app = express();
const port = process.env.PORT || 3000;


appDebug(app.get('env'));
appDebug('App name :',config.get('app-name'));
dbDebug('DB host :',config.get('DB.host'));
dbDebug('DB pass :',config.get('DB.password'));
if(app.get('env') === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/students',student_router);



// app.use((req,res,next) => {
//     console.log('Auth');
//     if(!req.headers.authorization)
//         return res.status(403).send('Must Auth');
//     next();
// });



app.listen(port, ()=> appDebug(`Server running on ${port}...`));

