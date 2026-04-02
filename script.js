// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动触发动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 表单提交处理
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 模拟表单提交
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // 简单验证
    if (!name || !email || !message) {
        alert('请填写所有字段');
        return;
    }
    
    // 模拟提交成功
    alert('消息已发送！我会尽快回复你。');
    this.reset();
});

// 响应式菜单（移动端）
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 添加移动端菜单按钮（如果需要）
if (window.innerWidth <= 768) {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = '☰';
    menuButton.addEventListener('click', toggleMenu);
    
    const navbar = document.querySelector('.navbar .container');
    navbar.appendChild(menuButton);
    
    // 添加移动端菜单样式
    const style = document.createElement('style');
    style.textContent = `
        .menu-button {
            display: block;
            background: none;
            border: none;
            color: var(--primary-color);
            font-size: 24px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// 项目卡片悬停效果
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 技能卡片悬停效果
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 统计数字动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// 当统计部分进入视口时启动动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((number, index) => {
                const target = parseInt(number.textContent);
                setTimeout(() => {
                    animateCounter(number, target);
                }, index * 300);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 背景元素动画增强
const bgElements = document.querySelectorAll('.bg-element');
bgElements.forEach((element, index) => {
    element.style.animationDelay = index * 2 + 's';
});

// 页面加载完成后的动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 鼠标移动效果（可选）
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor');
    cursorElement.style.left = e.clientX + 'px';
    cursorElement.style.top = e.clientY + 'px';
});

// 添加光标样式
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    }
    
    @media (max-width: 768px) {
        .cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);