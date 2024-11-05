const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Функция для создания SHA-256 хэша
async function sha256(ascii) {
    const hash = crypto.createHash('sha256');
    hash.update(ascii);
    return hash.digest('hex');
}

// POST-метод для обработки платежа
router.post('/api/process-payment', async (req, res) => {
    const { totalAmount, playerId } = req.body;
    const currency = 'RUB'; // Валюта - рубли

    // Константы для создания подписи платежа
    const merchant_id = 'f08a1209-6fc8-4bd3-85da-0810fc49926f';
    const secret = '1c9238be1fb3e72b5bc23df926bfaf21';
    const order_id = Date.now().toString();
    const desc = `Order for player ID: ${playerId}`;
    const lang = 'ru';

    // Создание строки для подписи
    const sign_data = [merchant_id, totalAmount, currency, secret, order_id].join(':');
    const sign = await sha256(sign_data);

    // Параметры для URL платежного шлюза
    const params = {
        'merchant_id': merchant_id,
        'amount': totalAmount,
        'currency': currency,
        'order_id': order_id,
        'sign': sign,
        'desc': desc,
        'lang': lang
    };

    // Создание URL для перенаправления пользователя на платежный шлюз
    const paymentUrl = `https://aaio.so/merchant/pay?${new URLSearchParams(params).toString()}`;
    res.json({ paymentUrl });
});

module.exports = router;