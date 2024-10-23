import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Just works!');
});

app.listen(1000, () => console.log('Server is listen on http://localhost:1000'));