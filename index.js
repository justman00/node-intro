// import http from 'http' es modules - only client/websites
const express = require('express'); // commonjs / nodejs
const shortid = require('shortid');

const server = express();
const PORT = 8080;

let courses = [
  {
    id: shortid.generate(),
    name: 'React',
    teacher: 'Vladimir Turcan',
  },
  {
    id: shortid.generate(),
    name: 'Node',
    teacher: 'Vladimir Turcan',
  },
  {
    id: shortid.generate(),
    name: 'Java',
    teacher: 'John Doe',
  },
];

// http.createServer()
server.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

server.get('/courses', (req, res) => {
  res.status(200).json({ courses });
});

server.post('/courses', express.json(), (req, res) => {
  const newCourse = req.body;

  courses.push({ ...newCourse, id: shortid.generate() });

  res.status(201).json({ status: 'ok' }); // am creat cu succes
});

server.put('/edit-course', express.json(), (req, res) => {
  const editedCourse = req.body;
  // detectam dupa id si rescriem datele
  courses = courses.map((el) => {
    if (el.id === editedCourse.id) {
      return { ...editedCourse };
    }

    return el;
  });

  res.status(200).json({ courses });
});

server.patch('/edit-course', express.json(), (req, res) => {
  const editedCourse = req.body;
  // detectam dupa id si rescriem datele
  courses = courses.map((el) => {
    // gaseste cursul dupa id
    if (el.id === editedCourse.id) {
      return {
        ...el,
        ...editedCourse,
      };
    }

    return el;
  });

  res.status(200).json({ courses });
});

server.delete('/delete-course/:courseId', (req, res) => {
    courses = courses.filter(el => {
        return el.id !== req.params.courseId
    })

    res.status(200).json({ courses });
})

// req, res
// Node js(JavaScript pe server) este un api pentru generare de html cat si de raspunsuri clasice(JSON, XML)
// JAVA(virtual machines), C#, Golang, Scala, Rust, C++, PHP, Python(Data Science)

server.listen(PORT, () => {
  console.log(`Web server is live at port ${PORT}...`);
});
