document.addEventListener("DOMContentLoaded", function() {
    const empireLink = document.querySelector("nav a[href='#']");
    const modal = document.getElementById("empireListModal");
    const closeModal = document.querySelector(".modal .close");

    // Открытие модального окна при клике на ссылку ИМПЕРИИ
    empireLink.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    // Закрытие модального окна при клике на крестик
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

// Функция для обновления итоговой суммы
function updateTotalAmount() {
    const campoCoinsInput = parseFloat(document.getElementById('campoCoins').value);
    const conversionRate = 1 / 3; // 1 рубль = 3 CampoCoins
    const totalAmount = (campoCoinsInput * conversionRate).toFixed(1); // Округляем до десятых

    // Обновляем поле с итоговой суммой
    document.getElementById('totalAmount').value = `${totalAmount} ₽`;
}

// Функция для перенаправления пользователя на страницу оплаты
function redirectToPayment() {
    const playerId = document.getElementById('playerId').value;
    const campoCoins = parseFloat(document.getElementById('campoCoins').value);
    const totalAmount = (campoCoins / 3).toFixed(1); // Округляем до десятых

    fetch('/api/process-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalAmount, playerId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                document.getElementById('errorMessage').textContent = "Ошибка при обработке платежа.";
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('errorMessage').textContent = "Ошибка при обработке платежа.";
        });
}