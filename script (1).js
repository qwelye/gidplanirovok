document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. АНИМАЦИЯ / ВЫБОР В ОПРОСНИКЕ (КВИЗЕ)
    // ==========================================
    // Находим все карточки/варианты в опроснике.
    // Замените '.quiz-option' на ваш класс блока с картинкой/цветом (например, '.quiz__item' или '.option-card')
    const quizOptions = document.querySelectorAll('.quiz-option, [data-quiz-option]');

    quizOptions.forEach(option => {
        // Поддержка клика на ПК и тапа на мобильных
        const handleSelect = (e) => {
            // Если это список с одиночным выбором (радио-кнопки):
            // Снимаем класс 'active' со всех соседних вариантов в этом же вопросе
            const parentBlock = option.closest('.quiz-question') || option.parentElement;
            if (parentBlock) {
                parentBlock.querySelectorAll('.quiz-option, [data-quiz-option]').forEach(item => {
                    item.classList.remove('active');
                });
            }

            // Добавляем класс 'active' выбранному элементу
            option.classList.add('active');
        };

        option.addEventListener('click', handleSelect);
    });

    // ==========================================
    // 3. ПЛАВНАЯ НАВИГАЦИЯ И СКРОЛЛ К ЯКОРЮ
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
    // 4. УМНАЯ ПОЧТОВАЯ ССЫЛКА
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
    // 5. ЗАЩИТА ИЗОБРАЖЕНИЙ ОТ СКАТИВАНИЯ / КЛИКА
    // ==========================================
    document.querySelectorAll('img').forEach(function(img) {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // ОДИНОЧНЫЙ ВЫБОР (Вопросы 3-6) с комфортной паузой
    document.querySelectorAll('[data-single]').forEach(group => {
        const key = group.dataset.single;
        const panelId = group.dataset.panel;
        const nextStep = group.dataset.next;
        const dotNum = parseInt(group.dataset.dot, 10);

        group.querySelectorAll('.survey-option').forEach(opt => {
            opt.addEventListener('click', () => {
                stopAutoPreviewRotation();

                group.querySelectorAll('.survey-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                answers[key] = opt.dataset.value;

                if (panelId && opt.dataset.overlay) {
                    clearPanelVisuals(panelId);
                    setPreview(panelId, opt.dataset.overlay);
                }

                // Задержка 500мс дает пользователю увидеть свой выбор перед плавным переходом
                setTimeout(() => {
                    goToStep(nextStep, dotNum);
                }, 500);
            });
        });
    });

});