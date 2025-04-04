// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض المنتجات في الصفحة الرئيسية
    displayHotDeals();
    displayNewArrivals();
    displayBestSellers();
    displayForYou();
    
    // تهيئة عداد التنازل
    initCountdownTimer();
    
    // تهيئة شريط البحث
    initSearch();
    
    // تهيئة القائمة المتحركة
    initMobileMenu();
});

// عرض العروض الحصرية
function displayHotDeals() {
    const dealsContainer = document.getElementById('deals-carousel');
    
    if (!dealsContainer) return;
    
    dealsContainer.innerHTML = '';
    
    hotDeals.forEach(product => {
        dealsContainer.innerHTML += `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ر.س</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
    });
    
    // إضافة حدث النقر على أزرار إضافة إلى السلة
    addCartEventListeners();
}

// عرض أحدث المنتجات
function displayNewArrivals() {
    const arrivalsContainer = document.getElementById('new-arrivals');
    
    if (!arrivalsContainer) return;
    
    arrivalsContainer.innerHTML = '';
    
    newArrivals.forEach(product => {
        arrivalsContainer.innerHTML += `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ر.س</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
    });
    
    addCartEventListeners();
}

// عرض الأكثر مبيعًا
function displayBestSellers() {
    const sellersContainer = document.getElementById('best-sellers');
    
    if (!sellersContainer) return;
    
    sellersContainer.innerHTML = '';
    
    bestSellers.forEach(product => {
        sellersContainer.innerHTML += `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ر.س</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
    });
    
    addCartEventListeners();
}

// عرض الاختيارات الشخصية
function displayForYou() {
    const forYouContainer = document.getElementById('for-you');
    
    if (!forYouContainer) return;
    
    forYouContainer.innerHTML = '';
    
    forYou.forEach(product => {
        forYouContainer.innerHTML += `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ر.س</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
                </div>
            </div>
        `;
    });
    
    addCartEventListeners();
}

// إنشاء نجوم التقييم
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// تهيئة عداد التنازل
function initCountdownTimer() {
    const timerElement = document.querySelector('.timer');
    
    if (!timerElement) return;
    
    const endDate = timerElement.getAttribute('data-end');
    const countDownDate = new Date(endDate).getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            timerElement.innerHTML = "انتهى العرض!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timerElement.innerHTML = `ينتهي خلال: ${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
    }, 1000);
}

// تهيئة شريط البحث
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionsContainer = document.querySelector('.search-suggestions');
    
    if (!searchInput || !searchBtn || !suggestionsContainer) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const matchedProducts = products.filter(product => 
            product.title.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (matchedProducts.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
            suggestionsContainer.style.display = 'block';
            return;
        }
        
        let suggestionsHTML = '';
        
        matchedProducts.forEach(product => {
            suggestionsHTML += `
                <div class="suggestion-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}">
                    <div>
                        <h4>${product.title}</h4>
                        <p>${product.brand} - ${product.category}</p>
                        <span>${product.price} ر.س</span>
                    </div>
                </div>
            `;
        });
        
        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.style.display = 'block';
    });
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value.trim());
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.trim());
        }
    });
    
    // إخفاء الاقتراحات عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // النقر على اقتراح
    suggestionsContainer.addEventListener('click', function(e) {
        const suggestionItem = e.target.closest('.suggestion-item');
        
        if (suggestionItem) {
            const productId = suggestionItem.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            
            if (product) {
                window.location.href = `product.html?id=${product.id}`;
            }
        }
    });
}

// تنفيذ البحث
function performSearch(query) {
    if (query.length < 2) return;
    
    // هنا يمكن توجيه المستخدم إلى صفحة نتائج البحث
    // أو عرض النتائج في الصفحة الحالية
    console.log('بحث عن:', query);
    alert(`سيتم البحث عن: ${query}`);
}

// تهيئة القائمة المتحركة للهواتف
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    navbar.parentNode.insertBefore(menuToggle, navbar);
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// إضافة أحداث النقر على أزرار إضافة إلى السلة
function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    // هذه الوظيفة سيتم تنفيذها في ملف cart.js
    console.log('تمت إضافة المنتج إلى السلة:', productId);
    alert('تمت إضافة المنتج إلى سلة التسوق');
    
    // تحديث عداد السلة
    updateCartCount();
}

// تحديث عداد السلة
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        // هنا يمكنك الحصول على عدد المنتجات من localStorage أو متغير آخر
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        cartCount.style.display = 'inline-block';
    }
}