// ========== ФУНКЦИИ ПРОКРУТКИ ==========
function scrollToFirstPage() {
    const firstPage = document.getElementById('firstPage');
    if (firstPage) {
        const targetPosition = firstPage.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

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

function goToDeliveryPage() {
    window.location.href = 'delivery.html';
}

// ========== ФУНКЦИИ ДЛЯ СТРАНИЦЫ ДОСТАВКИ ==========
function goToTastesWithScroll() {
    sessionStorage.setItem('scrollTo', 'tastes');
    window.location.href = 'index.html';
}

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
        const firstPage = document.getElementById('firstPage');
        if (firstPage) {
            setTimeout(() => {
                firstPage.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        sessionStorage.removeItem('scrollTo');
    }
}

// ========== НАВИГАЦИЯ НА ГЛАВНОЙ СТРАНИЦЕ ==========
if (document.getElementById('firstPage')) {
    // Логотип
    const logoArea = document.getElementById('logoArea');
    if (logoArea) {
        logoArea.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToFirstPage();
        });
    }

    // НАПИТКИ
    const navDrinks = document.getElementById('navDrinks');
    if (navDrinks) {
        navDrinks.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToFirstPage();
        });
    }

    // ВКУСЫ
    const navTastes = document.getElementById('navTastes');
    if (navTastes) {
        navTastes.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSecondPage();
        });
    }

    // ДОСТАВКА
    const navDelivery = document.getElementById('navDelivery');
    if (navDelivery) {
        navDelivery.addEventListener('click', (e) => {
            e.preventDefault();
            goToDeliveryPage();
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

    // Корзина
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Корзина');
        });
    }

    // Кнопка "ВЫБРАТЬ НАПИТОК"
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

    // Социальные кнопки на главной
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

    // Карточки товаров на главной
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
    
    const buyBtns = document.querySelectorAll('.buy-btn-overlay');
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            alert('Товар добавлен в корзину');
        });
    });
}

// ========== НАВИГАЦИЯ НА СТРАНИЦЕ ДОСТАВКИ ==========
if (document.querySelector('.delivery-left')) {
    // Логотип - переход на главную (скролл к напиткам)
    const logoArea = document.querySelector('.logo-area');
    if (logoArea) {
        logoArea.addEventListener('click', (e) => {
            e.preventDefault();
            goToDrinksWithScroll();
        });
    }

    // НАПИТКИ - переход на главную (скролл к напиткам)
    const navDrinks = document.querySelector('.nav-item[href="index.html"]');
    if (navDrinks && navDrinks.textContent === 'НАПИТКИ') {
        navDrinks.addEventListener('click', (e) => {
            e.preventDefault();
            goToDrinksWithScroll();
        });
    }

    // ВКУСЫ - переход на главную (скролл к вкусам)
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

    // Корзина
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Корзина');
        });
    }

    // Карточки тарифов на странице доставки
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
    
    // Обработка возврата на главную страницу с параметром скролла
    handleReturnScroll();
});