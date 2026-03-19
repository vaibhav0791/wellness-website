document.addEventListener('DOMContentLoaded', () => {
    /* GALLERY EXPANSION */
    const seeMoreBtn = document.getElementById('seeMoreGalleryBtn');
    let galleryExpanded = false;
    if(seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.gallery-expandable');
            if(!galleryExpanded) {
                hiddenItems.forEach(item => {
                    item.classList.remove('d-none');
                    setTimeout(() => item.classList.add('fade-in-up', 'active'), 10);
                });
                seeMoreBtn.innerText = "See Less";
                galleryExpanded = true;
            } else {
                hiddenItems.forEach(item => {
                    item.classList.remove('active', 'fade-in-up');
                    setTimeout(() => item.classList.add('d-none'), 400); // Wait for transition
                });
                seeMoreBtn.innerText = "See More";
                galleryExpanded = false;
                
                const gallerySection = document.getElementById('gallery');
                window.scrollTo({
                    top: gallerySection.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    /* LOGIN MODAL LOGIC */
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');
    const openLoginBtns = document.querySelectorAll('.open-login-btn');
    const tabUser = document.getElementById('tab-user');
    const tabAdmin = document.getElementById('tab-admin');
    
    if(loginModal) {
        openLoginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        loginClose.addEventListener('click', () => {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        loginModal.addEventListener('click', (e) => {
            if(e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        const setLoginTab = (isActiveUser) => {
            if (isActiveUser) {
                tabUser.className = 'btn btn-primary btn-block tab-btn active';
                tabUser.style.color = 'var(--color-dark)';
                tabUser.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                
                tabAdmin.className = 'btn btn-transparent btn-block tab-btn';
                tabAdmin.style.color = '#555';
                tabAdmin.style.boxShadow = 'none';
            } else {
                tabAdmin.className = 'btn btn-primary btn-block tab-btn active';
                tabAdmin.style.color = 'var(--color-dark)';
                tabAdmin.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                
                tabUser.className = 'btn btn-transparent btn-block tab-btn';
                tabUser.style.color = '#555';
                tabUser.style.boxShadow = 'none';
            }
        };

        if(tabUser && tabAdmin) {
            tabUser.addEventListener('click', (e) => { e.preventDefault(); setLoginTab(true); });
            tabAdmin.addEventListener('click', (e) => { e.preventDefault(); setLoginTab(false); });
        }
    }

    /* HEADER SCROLL */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    /* MOBILE MENU */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans.forEach(span => span.style.transform = 'none');
                spans[1].style.opacity = '1';
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
        });
    });

    /* SCROLL ANIMATIONS */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* 
       =================================================
       GLOBAL MODAL & DATA POPULATION LOGIC (V2)
       ================================================= 
    */
    const modalData = {
        "prenatal-class": {
            title: "Prenatal Yoga Classes",
            about: "Safe and guided yoga specifically designed for pregnant women. Focuses on breathing techniques, opening the hips, and preparing the body for a smooth delivery.",
            benefits: "Relieves back pain, reduces swelling, improves sleep, and mentally prepares you for motherhood.",
            how: "Live via Zoom (Joining link & password shared after booking).",
            creator: "Girl - A certified prenatal yoga specialist with 15+ years of experience helping mothers stay healthy.",
            highlights: ["Beginner friendly", "Safe & guided", "Live interaction", "Flexible timing"]
        },
        "yin-yang-class": {
            title: "Yin & Yang Yoga Classes",
            about: "A beautiful balance of active, heat-building Vinyasa (Yang) and slow, deep connective tissue stretching (Yin).",
            benefits: "Increases flexibility, builds functional strength, and deeply releases mental stress.",
            how: "Live via Zoom (Joining link & password shared after booking).",
            creator: "Girl - Combining movement science with ancient philosophies to create the perfect balancing act for your nervous system.",
            highlights: ["All levels welcome", "Full body restore", "Live feedback", "Emotional balance"]
        },
        "personal-appointment": {
            title: "Personal Yoga Appointment",
            about: "A fully customized 1-on-1 session tailored entirely to your physical needs, injuries, and mental state. Ideal for pregnant women or individuals with specific healing goals.",
            benefits: "Maximum personal attention, rapid progress in alignment, customized routine building, and profound stress relief.",
            how: "Conducted via an interactive 1-on-1 Zoom call.",
            creator: "Girl - Dedicated attention and deep empathy during every minute of your session.",
            highlights: ["100% Personalized", "Advanced form correction", "Private atmosphere", "Flexible scheduling"]
        },
        "rec-obesity": {
            title: "Recording - Scientific Approach to Obesity Management",
            about: "A detailed, recording-based workshop bridging scientific metabolic understanding with targeted yoga practices.",
            benefits: "Metabolism repair, sustainable weight loss strategies, and hormone balancing.",
            how: "Instant lifetime digital access via our secure portal after purchase.",
            creator: "Girl - Guiding you through the science of body transformation.",
            highlights: ["Scientific breakdown", "Follow-along videos", "Dietary guidelines included"]
        },
        "rec-knee": {
            title: "Recording - Therapeutic Yoga for Knee Pain",
            about: "A gentle, therapeutic sequence demonstrating precisely how to strengthen the muscles surrounding the knee without straining the joint.",
            benefits: "Reduces inflammation, increases mobility, and relieves acute joint pain.",
            how: "Instant lifetime digital access.",
            creator: "Girl - Specialized in anatomy and joint wellness.",
            highlights: ["Low impact", "Anatomy focused", "Prop-assisted routines"]
        },
        // Reused generic logic for other recordings to keep code efficient
        "rec-generic": {
            title: "Recording - Premium Yoga Program",
            about: "An in-depth recorded workshop focusing on advanced healing modalities and targeted yoga applications.",
            benefits: "Deep holistic healing, pain relief, and sustainable long-term wellness.",
            how: "Instant lifetime digital access via our secure portal after purchase.",
            creator: "Girl - Decades of holistic wellness expertise bottled into one workshop.",
            highlights: ["Self-paced learning", "Lifetime access", "In-depth explanations"]
        }
    };

    const dynamicModal = document.getElementById('dynamic-modal');
    const modalClose = document.querySelector('.modal-close');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent default just in case it's an anchor natively acting up
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            const isRecording = modalId.startsWith('rec-');
            
            // Generate content
            const data = modalData[modalId] || { ...modalData['rec-generic'] };
            
            // If it's a recording not explicitly defined, use the button's title
            if (!modalData[modalId]) {
                const parentCard = btn.closest('.recorded-card');
                if (parentCard) {
                    data.title = parentCard.querySelector('h4').innerText;
                }
            }

            const highlightsHtml = data.highlights.map(h => `<li><i class="fa-solid fa-check text-gold"></i> ${h}</li>`).join('');

            // Inject DOM
            document.getElementById('modal-title').innerText = data.title;
            
            document.querySelector('.modal-body').innerHTML = `
                <div class="modal-section">
                    <h4>About the ${isRecording ? 'Workshop' : 'Class'}</h4>
                    <p>${data.about}</p>
                </div>
                <div class="modal-section">
                    <h4>Benefits</h4>
                    <p>${data.benefits}</p>
                </div>
                <div class="modal-section">
                    <h4>How it's conducted</h4>
                    <p>${data.how}</p>
                </div>
                <div class="modal-section bg-beige" style="padding: 20px; border-radius: 12px;">
                    <h4>Meet the Creator</h4>
                    <p class="mb-0"><strong>${data.creator}</strong></p>
                </div>
                <div class="modal-section">
                    <h4>Highlights</h4>
                    <ul style="list-style:none; padding:0; display:grid; gap:10px;">
                        ${highlightsHtml}
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>FAQs</h4>
                    <div class="accordion">
                        <div class="accordion-item">
                            <button class="accordion-header">What are the payment options? <i class="fa-solid fa-plus"></i></button>
                            <div class="accordion-content"><p>We support UPI, net banking, debit and credit cards.</p></div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">Will there be a community? <i class="fa-solid fa-plus"></i></button>
                            <div class="accordion-content"><p>Yes, a private community for discussion and support.</p></div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-header">Who can benefit? <i class="fa-solid fa-plus"></i></button>
                            <div class="accordion-content"><p>Anyone interested. No prerequisites required.</p></div>
                        </div>
                    </div>
                </div>
            `;

            // Initialize Accordions explicitly for newly injected HTML
            initAccordions();

            // Open Modal
            dynamicModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal Logic
    modalClose.addEventListener('click', () => {
        dynamicModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    dynamicModal.addEventListener('click', (e) => {
        if (e.target === dynamicModal) {
            dynamicModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function initAccordions() {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');
                
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.replace('fa-plus', 'fa-minus');
                } else {
                    content.style.maxHeight = 0;
                    icon.classList.replace('fa-minus', 'fa-plus');
                }
            });
        });
    }
});
