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

    // تفعيل نموذج الطلب
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم استلام طلبك، سنتواصل معك قريبًا!');
            this.reset();
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
});

// تغيير الوضع الليلي (اختياري)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // يمكنك إضافة المزيد من العناصر التي تريد تغييرها هنا
}