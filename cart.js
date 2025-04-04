// تهيئة سلة التسوق
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    
    if (!product) return;
    
    // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
    const existingItem = shoppingCart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // حفظ السلة في localStorage
    saveCart();
    
    // تحديث واجهة المستخدم
    updateCartUI();
    
    // إظهار تنبيه
    showAlert(`تمت إضافة "${product.title}" إلى سلة التسوق`);
}

// حفظ السلة في localStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// تحديث واجهة مستخدم السلة
function updateCartUI() {
    updateCartCount();
    updateCartDropdown();
    updateCheckoutPage();
}

// تحديث عداد السلة
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// تحديث القائمة المنسدلة للسلة
function updateCartDropdown() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (!cartDropdown) return;
    
    if (shoppingCart.length === 0) {
        cartDropdown.innerHTML = '<p>سلة التسوق فارغة</p>';
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    shoppingCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>${item.price} ر.س × ${item.quantity}</p>
                    <span>${itemTotal} ر.س</span>
                </div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
            </div>
        `;
    });
    
    cartHTML += `
        <div class="cart-subtotal">
            <span>المجموع:</span>
            <span>${subtotal} ر.س</span>
        </div>
        <div class="cart-buttons">
            <a href="cart.html" class="btn">عرض السلة</a>
            <a href="checkout.html" class="btn">الدفع</a>
        </div>
    `;
    
    cartDropdown.innerHTML = cartHTML;
    
    // إضافة أحداث النقر على أزرار الإزالة
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'));
        });
    });
}

// تحديث صفحة الدفع
function updateCheckoutPage() {
    // هذا سيتطلب تنفيذه في صفحة الدفع أو السلة
}

// إزالة منتج من السلة
function removeFromCart(productId) {
    shoppingCart = shoppingCart.filter(item => item.id != productId);
    saveCart();
    updateCartUI();
    showAlert('تمت إزالة المنتج من سلة التسوق');
}

// تغيير كمية المنتج في السلة
function updateCartItemQuantity(productId, newQuantity) {
    const item = shoppingCart.find(item => item.id == productId);
    
    if (!item) return;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
}

// عرض تنبيه
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alertBox.classList.remove('show');
        
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
    }, 3000);
}

// تهيئة السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // تهيئة القائمة المنسدلة للسلة
    const cartBtn = document.getElementById('cart-btn');
    const cartDropdown = document.createElement('div');
    cartDropdown.className = 'cart-dropdown';
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartDropdown.classList.toggle('show');
        });
        
        cartBtn.parentNode.appendChild(cartDropdown);
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
                cartDropdown.classList.remove('show');
            }
        });
    }
});