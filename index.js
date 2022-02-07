const express = require('express');
const Joi = require('joi');

const app = express();
const port = 3000;

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

app.listen(port, ()=> console.log(`Server running on ${port}...`));
