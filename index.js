const express = require('express');

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

app.listen(port, ()=> console.log(`Server running on ${port}...`));
