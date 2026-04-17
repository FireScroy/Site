// ========== ФУНКЦИИ ПРОКРУТКИ ==========

// Скролл к началу страницы (первая страница целиком)
function scrollToFirstPage() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Скролл к блоку ВКУСЫ (вторая страница)
function scrollToSecondPage() {
    const secondPage = document.getElementById('secondPage');
    if (secondPage) {
        const targetPosition = secondPage.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Переход на страницу доставки
function goToDeliveryPage() {
    window.location.href = 'delivery.html';
}

// Переход на страницу корзины
function goToCartPage() {
    window.location.href = 'cart.html';
}

// ========== ФУНКЦИИ ДЛЯ СТРАНИЦЫ ДОСТАВКИ ==========

// Переход на главную с прокруткой к ВКУСАМ
function goToTastesWithScroll() {
    sessionStorage.setItem('scrollTo', 'tastes');
    window.location.href = 'index.html';
}

// Переход на главную с прокруткой к началу (НАПИТКИ)
function goToDrinksWithScroll() {
    sessionStorage.setItem('scrollTo', 'drinks');
    window.location.href = 'index.html';
}

// ========== ОБРАБОТКА ВОЗВРАТА НА ГЛАВНУЮ ==========
function handleReturnScroll() {
    const scrollTo = sessionStorage.getItem('scrollTo');
    if (scrollTo === 'tastes') {
        const secondPage = document.getElementById('secondPage');
        if (secondPage) {
            setTimeout(() => {
                secondPage.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        sessionStorage.removeItem('scrollTo');
    } else if (scrollTo === 'drinks') {
        // Скролл к началу страницы (НЕ к фону)
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
        sessionStorage.removeItem('scrollTo');
    }
}

// ========== НАВИГАЦИЯ НА ГЛАВНОЙ СТРАНИЦЕ ==========

if (document.getElementById('firstPage')) {
    
    // Логотип - скролл к началу
    const logoArea = document.getElementById('logoArea');
    if (logoArea) {
        logoArea.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToFirstPage();
        });
    }

    // НАПИТКИ - скролл к началу
    const navDrinks = document.getElementById('navDrinks');
    if (navDrinks) {
        navDrinks.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToFirstPage();
        });
    }

    // ВКУСЫ - скролл ко второму блоку
    const navTastes = document.getElementById('navTastes');
    if (navTastes) {
        navTastes.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSecondPage();
        });
    }

    // ДОСТАВКА - переход на отдельную страницу
    const navDelivery = document.getElementById('navDelivery');
    if (navDelivery) {
        navDelivery.addEventListener('click', (e) => {
            e.preventDefault();
            goToDeliveryPage();
        });
    }

    // Корзина - переход на страницу корзины
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            goToCartPage();
        });
    }

    // Остальные пункты меню (МЕРЧ)
    const navOther = document.querySelectorAll('.nav-item:not(#navDrinks):not(#navTastes):not(#navDelivery)');
    navOther.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            alert(item.getAttribute('data-action'));
        });
    });

    // Кнопка "ВЫБРАТЬ НАПИТОК" - скролл ко второму блоку
    const chooseDrinkBtn = document.getElementById('chooseDrinkBtn');
    if (chooseDrinkBtn) {
        chooseDrinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSecondPage();
        });
    }

    // Изображение продукта
    const productImage = document.getElementById('productImage');
    if (productImage) {
        productImage.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Изображение продукта');
        });
    }

    // Социальные кнопки
    const socialVk = document.querySelector('.social-vk');
    if (socialVk) {
        socialVk.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://vk.com', '_blank');
        });
    }

    const socialTelegram = document.querySelector('.social-telegram');
    if (socialTelegram) {
        socialTelegram.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://t.me', '_blank');
        });
    }

    const socialEmail = document.querySelector('.social-email');
    if (socialEmail) {
        socialEmail.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Копировать email: THNDR2026');
        });
    }

    // Карточки товаров (ВКУСЫ)
    const productCards = document.querySelectorAll('.product-card');
    let activeCard = null;
    
    function closeAllCards() {
        productCards.forEach(card => {
            card.classList.remove('active');
        });
        activeCard = null;
    }
    
    function openCard(card) {
        if (activeCard === card) return;
        closeAllCards();
        card.classList.add('active');
        activeCard = card;
    }
    
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains('buy-btn-overlay')) {
                return;
            }
            if (card.classList.contains('active')) {
                closeAllCards();
            } else {
                openCard(card);
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product-card')) {
            closeAllCards();
        }
    });
    
    // Кнопки "КУПИТЬ" на второй странице - добавление в корзину
const buyBtns = document.querySelectorAll('.buy-btn-overlay');
buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Получаем данные о товаре из атрибутов
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));
        
        // Добавляем товар в корзину
        addToCart({
            name: name,
            price: price,
            quantity: 1
        });
    });
});
}

// ========== НАВИГАЦИЯ НА СТРАНИЦЕ ДОСТАВКИ ==========

if (document.querySelector('.delivery-left')) {
    
    // Логотип - переход на главную (скролл к началу)
    const logoArea = document.querySelector('.logo-area');
    if (logoArea) {
        logoArea.addEventListener('click', (e) => {
            e.preventDefault();
            goToDrinksWithScroll();
        });
    }

    // НАПИТКИ - переход на главную (скролл к началу)
    const navDrinks = document.querySelector('.nav-item[href="index.html"]');
    if (navDrinks && navDrinks.textContent === 'НАПИТКИ') {
        navDrinks.addEventListener('click', (e) => {
            e.preventDefault();
            goToDrinksWithScroll();
        });
    }

    // ВКУСЫ - переход на главную (скролл к ВКУСАМ)
    const tastesLink = document.getElementById('tastesLink');
    if (tastesLink) {
        tastesLink.addEventListener('click', (e) => {
            e.preventDefault();
            goToTastesWithScroll();
        });
    }

    // МЕРЧ
    const merchLink = document.querySelector('.nav-item[href="#"]');
    if (merchLink && merchLink.textContent === 'МЕРЧ') {
        merchLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('МЕРЧ');
        });
    }

    // Корзина на странице доставки
    const cartIconDelivery = document.querySelector('.cart-icon');
    if (cartIconDelivery) {
        cartIconDelivery.addEventListener('click', (e) => {
            e.preventDefault();
            goToCartPage();
        });
    }

    // ========== КНОПКИ ВЫБОРА ТАРИФОВ ==========
const tariffBtns = document.querySelectorAll('.tariff-btn-overlay');
tariffBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Получаем цену доставки из атрибута
        const deliveryPrice = parseInt(btn.getAttribute('data-delivery-price'));
        
        if (deliveryPrice) {
            // Сохраняем цену доставки
            saveDeliveryPrice(deliveryPrice);
            showNotification(`Доставка выбрана! Стоимость: ${deliveryPrice}р`);
        }
    });
});

    // Карточки тарифов (для вылетающего текста)
    const tariffCards = document.querySelectorAll('.tariff-card');
    let activeTariffCard = null;
    
    function closeAllTariffCards() {
        tariffCards.forEach(card => {
            card.classList.remove('active');
        });
        activeTariffCard = null;
    }
    
    function openTariffCard(card) {
        if (activeTariffCard === card) return;
        closeAllTariffCards();
        card.classList.add('active');
        activeTariffCard = card;
    }
    
    tariffCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains('tariff-btn-overlay')) {
                return;
            }
            if (card.classList.contains('active')) {
                closeAllTariffCards();
            } else {
                openTariffCard(card);
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tariff-card')) {
            closeAllTariffCards();
        }
    });
}

// ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ ==========

document.addEventListener('DOMContentLoaded', () => {
    
    // Анимация для главной страницы
    const leftContent = document.querySelector('.first-page .left-content');
    const rightContent = document.querySelector('.first-page .right-content');
    
    if (leftContent) {
        leftContent.style.opacity = '0';
        leftContent.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            leftContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            leftContent.style.opacity = '1';
            leftContent.style.transform = 'translateX(0)';
        }, 100);
    }
    
    if (rightContent) {
        rightContent.style.opacity = '0';
        rightContent.style.transform = 'translateX(30px)';
        setTimeout(() => {
            rightContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            rightContent.style.opacity = '1';
            rightContent.style.transform = 'translateX(0)';
        }, 200);
    }
    
    // Анимация для страницы доставки
    const deliveryLeft = document.querySelector('.delivery-left');
    const deliveryRight = document.querySelector('.delivery-right');
    
    if (deliveryLeft) {
        deliveryLeft.style.opacity = '0';
        deliveryLeft.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            deliveryLeft.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            deliveryLeft.style.opacity = '1';
            deliveryLeft.style.transform = 'translateX(0)';
        }, 100);
    }
    
    if (deliveryRight) {
        deliveryRight.style.opacity = '0';
        deliveryRight.style.transform = 'translateX(30px)';
        setTimeout(() => {
            deliveryRight.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            deliveryRight.style.opacity = '1';
            deliveryRight.style.transform = 'translateX(0)';
        }, 200);
    }
    
    // Обработка возврата на главную страницу
    handleReturnScroll();
});
// ========== КОРЗИНА (РАБОТА С LOCALSTORAGE) ==========

const CART_STORAGE_KEY = 'thndr_cart';
const DELIVERY_PRICE_KEY = 'thndr_delivery_price';

// Получить корзину
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Сохранить корзину
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Получить цену доставки
function getDeliveryPrice() {
    const price = localStorage.getItem(DELIVERY_PRICE_KEY);
    return price ? parseInt(price) : 200; // по умолчанию 200р
}

// Сохранить цену доставки
function saveDeliveryPrice(price) {
    localStorage.setItem(DELIVERY_PRICE_KEY, price);
}

// Добавить товар в корзину
function addToCart(product) {
    if (!product.name || product.name === 'null' || !product.price) {
        console.error('Ошибка: некорректный товар', product);
        return;
    }
    
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push({
            id: Date.now() + product.name,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            type: 'drink'
        });
    }
    
    saveCart(cart);
    showNotification(`${product.name} добавлен в корзину!`);
    
    return cart;
}

// Показать уведомление
function showNotification(message) {
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #F9B121;
        color: #030405;
        padding: 12px 24px;
        border-radius: 40px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: fadeInOut 2s ease forwards;
    `;
    
    // Добавляем стили анимации, если их нет
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 2 секунды
    setTimeout(() => {
        notification.remove();
    }, 2000);
}