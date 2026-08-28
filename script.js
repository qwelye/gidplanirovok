document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ПЛАВНАЯ НАВИГАЦИЯ И СКРОЛЛ К ЯКОРЮ
    // ==========================================
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        if (href === 'index.html' || href === '/' || href === window.location.pathname) {
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.pushState(null, "", window.location.pathname);
            }
        }
    });

    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 400);
    }

    // ==========================================
    // 2. УМНАЯ ПОЧТОВАЯ ССЫЛКА
    // ==========================================
    const smartMailLink = document.getElementById('smart-mail-link');
    if (smartMailLink) {
        smartMailLink.addEventListener('click', function(e) {
            e.preventDefault();
            let email = this.getAttribute('href') ? this.getAttribute('href').replace('mailto:', '') : '';
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                window.location.href = `mailto:${email}`;
            } else {
                window.open(`https://e.mail.ru/compose/?to=${email}`, '_blank');
            }
        });
    }

    // ==========================================
    // 3. ЗАЩИТА ИЗОБРАЖЕНИЙ ОТ СКАЧИВАНИЯ / КЛИКА
    // ==========================================
    document.querySelectorAll('img').forEach(function(img) {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });

});