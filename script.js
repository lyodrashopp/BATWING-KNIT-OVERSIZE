// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .gallery-item, .testimonial-card').forEach(card => {
        observer.observe(card);
    });
// Form validation
    const forms = document.querySelectorAll('.orderonline-embed-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate email
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('border-red-500');
                } else {
                    emailField.classList.remove('border-red-500');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Mohon lengkapi semua field yang wajib diisi dengan benar.');
            }
        });
    });
    
    // Image gallery lightbox
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
            lightbox.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <button class="absolute top-4 right-4 text-white text-3xl">&times;</button>
                    <img src="${this.src}" alt="Enlarged image" class="max-h-[90vh] max-w-full object-contain">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.textContent === '×') {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
    
    // Sticky CTA button
    const ctaButton = document.createElement('button');
    ctaButton.className = 'fixed bottom-6 right-6 bg-coral-accent text-white p-4 rounded-full shadow-lg z-40 md:hidden';
    ctaButton.innerHTML = '<i data-feather="shopping-cart"></i>';
    document.body.appendChild(ctaButton);
    feather.replace();
    
    ctaButton.addEventListener('click', function() {
        document.querySelector('#order-form').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Exit intent popup
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 0 && !exitIntentShown) {
            exitIntentShown = true;
            
            // Create popup
            const popup = document.createElement('div');
            popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            popup.innerHTML = `
                <div class="bg-white rounded-2xl p-6 max-w-md w-full">
                    <h3 class="text-2xl font-bold mb-4">Jangan Lewatkan Penawaran Ini!</h3>
                    <p class="mb-4">Dapatkan diskon 43% hanya hari ini. Stok terbatas!</p>
                    <div class="flex gap-3">
                        <button class="flex-1 bg-gray-200 py-2 rounded-lg">Nanti Dulu</button>
                        <button class="flex-1 bg-coral-accent text-white py-2 rounded-lg">Pesan Sekarang</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            // Close popup
            popup.addEventListener('click', function(e) {
                if (e.target.closest('button')) {
                    document.body.removeChild(popup);
                }
            });
        }
    });
});
