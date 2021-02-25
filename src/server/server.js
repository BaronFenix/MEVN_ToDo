// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 3000;

// // app.listen(app.get('port'), () => {
// //     console.log(`[OK] Server is running on localhost:${app.get('port')}`);
// // });

// //mongodb://localhost:27017/test // mongodb://localhost/myDB/test
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(db => console.log('[OK] DB is connected'))
// .catch(err => console.error(err));

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(morgan('dev'));
// app.use(cors())

// app.use('/users', require('./routes/records'));

// app.listen(port, () => {
//     console.log(`Сервер был запущен: http://localhost:${port}\n`);
// });


const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
// ToDoListDB
const app = express();
app.use(express.json())
app.use(cors())
const port = 3000; // process.env.PORT

app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

const TodoSchema = new mongoose.Schema({
    header: String,
    content: String,
    statu5: Boolean,
});

const Note = mongoose.model('Notes', TodoSchema); 

(async () => {
    
    app.get('/test', async (req, res) => {
        res.status(200).send({ msg: "hello, everything is good" });
    });

    app.get('/notes', async (req, res) => {
        const notes = await Note.find({});
        if (notes) {
            res.status(200).send(notes);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.get('/checked_notes', async (req, res) => {
        const notes = await Note.find({statu5 : true});
        if (notes) {
            res.status(200).send(notes);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.get('/unchecked_notes', async (req, res) => {
        const notes = await Note.find({statu5 : false});
        if (notes) {
            res.status(200).send(notes);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.get('/notes/:_id', async (req, res) => {
        const note = await Note.findById(req.params._id);
        if (note) {
            res.status(200).send(note);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
    
    app.put('/notes/:_id',async (req, res) => {
        const note = await Note.findById(req.params._id);
        console.log(req.body.header);
        note.header = req.body.header;
        note.content = req.body.content;
        note.statu5 = req.body.statu5;
        await note.save();
        res.status(200).send({msg : "note updated"})
    })

    app.patch('/notes/:_id',async (req, res) => {
        const note = await Note.findById(req.params._id);
        console.log(req.body);
        note.statu5 = req.body.statu5;
        await note.save();
        res.status(200).send({msg : "note status updated"})
    })

    app.post('/notes', async (req, res) => { 
        const note = new Note();
        note.header = req.body.header;
        note.content = req.body.content;
        note.statu5 = req.body.statu5;
        await note.save();
        res.status(200).send({ msg: "note created" });
    });

    app.delete('/notes/:_id', async (req, res) => { 
        const note = await Note.findById(req.params._id);
        if (note) {
            await note.delete();
            res.status(200).send({ msg: "note deleted" });
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
})();

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
});
