const express = require('express');
const app = express();
const morgan = require('morgan');


//ettings
app.set('appName', 'Fazt Express Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs');

//middleware
function logger(req, res, next){
    console.log(`Routine Received ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
app.use(morgan('dev'))
app.use(express.json());
app.use(logger);


//enrutamiento
app.get('/', (req, res) => {
    const data = [{name: 'john'},{name: 'joe'},{name: 'cameron'}];
    res.render('index.ejs', {people: data});
});

app.all('/user', (req, res, next) => {
    console.log('Por aquí paso');
    next();
});

app.get('/user', (req, res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});
app.get('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} update`);
    res.send('UPDATE REQUEST RECEIVED');
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log('Server on port', app.get('port'));
});