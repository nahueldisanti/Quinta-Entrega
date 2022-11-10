const express = require('express');
const app = express();
const Contenedor = require('../Contanier/index');
const routerProd = express.Router();
const contenedor = new Contenedor();
const pug = require('pug')
const PORT = 8080;


app.set('views', './views')
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extendes: true}));
app.use('/productos', routerProd)


app.get('/', (req, res) => {
    res.render('pages/formulario', true);
})

routerProd.get('/', (req, res) => {
    const items = contenedor.getAll;
    res.render('pages/historial', items);
})

routerProd.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;
    const newItem = contenedor.save(title, price, thumbnail);
    res.render('pages/formulario', newItem)
})

const server = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
});

server.on('error', (error) => {
    console.log('Server error:' , error)
});

