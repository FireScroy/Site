// Обработчики для всех кликабельных элементов

// Функция для плавной прокрутки к первому блоку (НАПИТКИ)
function scrollToFirstPage() {
    const firstPage = document.getElementById('firstPage');
    if (firstPage) {
        const targetPosition = firstPage.offsetTop;
        
        // Принудительная прокрутка
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Fallback на случай если smooth не работает
        setTimeout(() => {
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }, 500);
    }
}

// Функция для плавной прокрутки ко второму блоку (ВКУСЫ)
function scrollToSecondPage() {
    const secondPage = document.getElementById('secondPage');
    if (secondPage) {
        const targetPosition = secondPage.offsetTop;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }, 500);
    }
}

// Логотип - прокрутка на первый блок
const logoArea = document.getElementById('logoArea');
if (logoArea) {
    logoArea.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToFirstPage();
    });
}

// Пункты меню
const navDrinks = document.getElementById('navDrinks');
if (navDrinks) {
    navDrinks.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToFirstPage();
    });
}

const navTastes = document.getElementById('navTastes');
if (navTastes) {
    navTastes.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSecondPage();
    });
}

// Остальные пункты меню (ДОСТАВКА, МЕРЧ)
const navOther = document.querySelectorAll('.nav-item:not(#navDrinks):not(#navTastes)');
navOther.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const action = item.getAttribute('data-action');
        alert(action);
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

// Кнопка "ВЫБРАТЬ НАПИТОК" на первой странице - прокрутка на второй блок (ВКУСЫ)
const chooseDrinkBtn = document.getElementById('chooseDrinkBtn');
if (chooseDrinkBtn) {
    chooseDrinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSecondPage();
    });
}

// Изображение продукта на первой странице
const productImage = document.getElementById('productImage');
if (productImage) {
    productImage.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Изображение продукта');
    });
}

// Кнопки "КУПИТЬ" на второй странице
const buyButtonsOverlay = document.querySelectorAll('.buy-btn-overlay');
buyButtonsOverlay.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        alert('Товар добавлен в корзину');
    });
});

// Социальные кнопки на второй странице
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

// Анимация появления элементов при загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена');
    
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
});
// Обработка нажатий на карточки для адаптивной версии (всплывающий текст при нажатии)
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Убираем активный класс при клике на другую карточку
        card.addEventListener('click', (e) => {
            // Предотвращаем всплытие, чтобы не срабатывало на кнопке
            if (e.target.classList.contains('buy-btn-overlay')) {
                return;
            }
            
            // Закрываем все другие активные карточки
            productCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Переключаем активный класс на текущей карточке
            card.classList.toggle('active');
        });
    });
    
    // Закрытие карточки при клике вне её
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product-card')) {
            productCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});