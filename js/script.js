// Cart state
let cart = [];

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    updateCartDisplay();
}

// Add item to cart
function addToCart(productElement) {
    const id = productElement.dataset.id;
    const name = productElement.dataset.name;
    const price = parseFloat(productElement.dataset.price);
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(3)} × ${item.quantity} = ${itemTotal.toFixed(3)} ريال</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="delete-btn" onclick="removeItem('${item.id}')">🗑️</button>
                </div>
            </div>
        `;
    });
    
    cartTotal.textContent = total.toFixed(3);
}

// Update item quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== id);
        }
        updateCartCount();
        updateCartDisplay();
    }
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartDisplay();
}

// Show checkout form
function showCheckoutForm() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('checkoutModal').style.display = 'block';
}

// Hide checkout form
function hideCheckoutForm() {
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('cartModal').style.display = 'block';
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered: ', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // إظهار السنة الحالية في الفوتر
    document.getElementById('year').textContent = new Date().getFullYear();

    // تفعيل القائمة المنسدلة للجوال
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('show');
            this.classList.toggle('active');
        });
    }

    // تفعيل نموذج التواصل
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكرًا لك على رسالتك، سنرد عليك في أقرب وقت ممكن!');
            this.reset();
        });
    }

    // تفعيل نموذج الطلب في صفحة الطلب
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم استلام طلبك، سنتواصل معك قريبًا!');
            this.reset();
        });
    }

    // تفعيل نموذج إتمام الطلب في صفحة المنتجات
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const deliveryTime = document.getElementById('deliveryTime').value;
            const deliveryMethod = document.getElementById('deliveryMethod').value;
            
            // Prepare WhatsApp message
            let message = `*طلب جديد*%0a%0a`;
            message += `*الاسم:* ${fullName}%0a`;
            message += `*رقم الهاتف:* ${phone}%0a`;
            message += `*وقت التسليم:* ${new Date(deliveryTime).toLocaleString('ar-OM')}%0a`;
            message += `*طريقة الاستلام:* ${deliveryMethod === 'delivery' ? 'توصيل' : 'استلام من المحل'}%0a%0a`;
            
            message += `*الطلب:*%0a`;
            cart.forEach(item => {
                message += `- ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(3)} ريال%0a`;
            });
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `%0a*المجموع:* ${total.toFixed(3)} ريال`;
            
            // Open WhatsApp with the prepared message
            window.open(`https://wa.me/96871718944?text=${message}`);
            
            // Reset cart and close modal
            cart = [];
            updateCartCount();
            document.getElementById('checkoutModal').style.display = 'none';
        });
    }
});

// تغيير الوضع الليلي (اختياري)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}