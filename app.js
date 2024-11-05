const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(paymentRoutes);

// Маршрут для корневого URL, который теперь показывает payment.ejs
app.get('/', (req, res) => {
    res.render('payment');
});
app.get('/faq', (req, res) => {
    res.render('faq');
});
app.listen(333, () => {
    console.log('Server is running on port 3000');
});