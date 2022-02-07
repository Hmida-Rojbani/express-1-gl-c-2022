const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const config = require('config');
const appDebug = require('debug')('app:debug');
const dbDebug = require('debug')('app:db');


const app = express();
const port = process.env.PORT || 3000;


appDebug(app.get('env'));
appDebug('App name :',config.get('app-name'));
dbDebug('DB host :',config.get('DB.host'));
dbDebug('DB pass :',config.get('DB.password'));
if(app.get('env') === 'development'){
    app.use(morgan('dev'));
}


let students = [
    {id :1 , name : 'student1'},
    {id :2 , name : 'student2'},
    {id :3 , name : 'student3'}
]

app.get('/api/students', (req,res)=>{
    res.send(students);
});

app.get('/api/students/:id',(req,res)=>{
    const student = students.find(s=>s.id === parseInt(req.params.id));
    if (!student)
        return res.status(404).send('The given id is not found');
    res.send(student);
});
// app.use((req,res,next) => {
//     console.log('Auth');
//     if(!req.headers.authorization)
//         return res.status(403).send('Must Auth');
//     next();
// });
app.use(express.json());
const valid_schema = Joi.object({
    name : Joi.string().min(3).pattern(new RegExp('^[a-zA-Z]{3,}$')).required()
});
app.post('/api/students', (req,res)=>{
    // if(! req.body.name)
    //     return res.status(400).send('Name is required.');
    // if(req.body.name.length < 3)
    //     return res.status(400).send('Name length must be over 3 chars.');
    let valid_results = valid_schema.validate(req.body);
    if(valid_results.error)
        return res.status(400).send(valid_results.error.details[0].message);
    let student = {
        id : students.length+1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
});

app.put('/api/students/:id',(req,res)=>{
    let student = students.find(s=>s.id === parseInt(req.params.id));
    if (!student)
        return res.status(404).send('The given id is not found');
    let valid_results = valid_schema.validate(req.body);
    if(valid_results.error)
        return res.status(400).send(valid_results.error.details[0].message);
    student.name=req.body.name;
    res.send(student);
});

app.delete('/api/students/:id',(req,res)=>{
    const student = students.find(s=>s.id === parseInt(req.params.id));
    if (!student)
        return res.status(404).send('The given id is not found');
    students = students.filter(s=>s.id !== parseInt(req.params.id))
    res.send(student);
});

app.listen(port, ()=> appDebug(`Server running on ${port}...`));
