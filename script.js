// Simple script for micro-interactions

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            navbar.style.height = '80px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '90px';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.step-card, .course-card, .blog-card, .tool-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Course Filtering & Search
    const courseSearch = document.getElementById('course-search');
    const filterTags = document.querySelectorAll('.filter-tag');
    const courseCards = document.querySelectorAll('.course-card');

    if (courseSearch) {
        courseSearch.addEventListener('input', filterCourses);
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterCourses();
        });
    });

    function filterCourses() {
        const searchTerm = courseSearch ? courseSearch.value.toLowerCase() : '';
        const activeCategory = document.querySelector('.filter-tag.active')?.dataset.category || 'all';

        courseCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }
});

// Roadmap Wizard Logic
let currentClass = '';
const roadmapData = {
    '9th': [
        { id: 'cs', title: 'Tech Discovery', icon: 'fa-laptop-code', desc: 'Explore the world of Coding, AI, and Software.', path: ['Scratch/Python Basics', 'Web Fundamentals (HTML/CSS)', 'Small Logic Projects'], scope: 'Tech is the fastest-growing sector globally with infinite possibilities.' },
        { id: 'arts', title: 'Creative Arts', icon: 'fa-palette', desc: 'Visual Storytelling and Digital Creativity.', path: ['Drawing Basics', 'Intro to Photoshop/Canva', 'Basic Video Editing'], scope: 'Media and entertainment industry is booming with creator economy.' },
        { id: 'science', title: 'Science Explorer', icon: 'fa-microscope', desc: 'Biology, Physics, and Mathematical logic.', path: ['Foundation Concepts', 'Logic & Aptitude', 'Science Olympiads'], scope: 'Base for all medical, engineering and research careers.' },
        { id: 'humanities', title: 'Liberal Arts', icon: 'fa-landmark', desc: 'Understanding Society, History, and Civics.', path: ['Public Speaking', 'Critical Reading', 'Civic Projects'], scope: 'Careers in Law, Civil Services, and Social Work.' }
    ],
    '10th': [
        { id: 'web', title: 'Web Development', icon: 'fa-code', desc: 'Build your first professional websites.', path: ['HTML5 & CSS3', 'JavaScript Basics', 'Bootstrap/Tailwind'], scope: 'Essential skill for modern digital presence.' },
        { id: 'finance', title: 'Financial Literacy', icon: 'fa-chart-line', desc: 'Understanding Money, Saving, and Investing.', path: ['Basic Accounting', 'Stock Market Intro', 'Personal Finance'], scope: 'Life skill for financial independence.' },
        { id: 'prep', title: 'Board Mastery', icon: 'fa-medal', desc: 'Ace your 10th Board Exams with strategy.', path: ['Syllabus Deep-dive', 'Previous Year Papers', 'Mock Tests'], scope: 'First major milestone in academic career.' }
    ],
    '11th/12th': [
        { id: 'pcm', title: 'Engineering (PCM)', icon: 'fa-gear', desc: 'Focus on Physics, Chemistry, and Math.', path: ['JEE Mains/Adv Prep', 'Coding (C++/Java)', 'Engineering Entrance'], scope: 'IITs, NITs and top global tech companies.' },
        { id: 'pcb', title: 'Medical (PCB)', icon: 'fa-heart-pulse', desc: 'Focus on Biology and Medical Science.', path: ['NEET Prep', 'Biology Specialization', 'Medical Internships'], scope: 'Doctors, Biotech and Research Specialists.' },
        { id: 'commerce', title: 'Business & Finance', icon: 'fa-briefcase', desc: 'Accounting, Economics, and Business.', path: ['CA/CS/CMA Prep', 'Stock Trading', 'Digital Marketing'], scope: 'Banks, MNCs and Entrepreneurship.' },
        { id: 'humanities_adv', title: 'Law & Management', icon: 'fa-gavel', desc: 'CLAT, IPMAT, and Creative Careers.', path: ['CLAT/IPMAT Prep', 'Psychology', 'Design Entrance (UCEED)'], scope: 'Corporate Law, Top IIMs, and Design Studios.' }
    ],
    'College/Others': [
        { id: 'fullstack', title: 'Full-Stack Dev', icon: 'fa-layer-group', desc: 'Become a complete software developer.', path: ['Frontend (React)', 'Backend (Node.js)', 'DevOps & Cloud'], scope: 'Highest demand in tech startups and giants.' },
        { id: 'data', title: 'Data Science & AI', icon: 'fa-brain', desc: 'Master Data Analysis and Machine Learning.', path: ['Python for Data', 'ML Algorithms', 'Deep Learning/LLMs'], scope: 'The future of every industry is AI-driven.' },
        { id: 'marketing', title: 'Digital Marketing', icon: 'fa-bullhorn', desc: 'SEO, Content, and Growth Hacking.', path: ['Social Media Ads', 'Performance Marketing', 'Brand Building'], scope: 'Remote work and high agency growth.' },
        { id: 'upsc', title: 'Civil Services', icon: 'fa-shield-halved', desc: 'UPSC and Government Exams prep.', path: ['General Studies', 'Optional Subject', 'Current Affairs'], scope: 'Leadership roles in Indian Administration.' }
    ]
};

function nextStep(step, value) {
    if (step === 2) {
        currentClass = value;
        renderStreams(value);
    }
    
    document.querySelectorAll('.wizard-step').forEach(s => {
        s.classList.remove('active');
    });
    
    const nextStepEl = document.getElementById(`step-${step}`);
    nextStepEl.classList.add('active');

    // Scroll to top of wizard
    document.getElementById('roadmap-wizard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function prevStep(step) {
    document.querySelectorAll('.wizard-step').forEach(s => {
        s.classList.remove('active');
    });
    const prevStepEl = document.getElementById(`step-${step}`);
    prevStepEl.classList.add('active');
}

function renderStreams(cls) {
    const streamOptions = document.getElementById('stream-options');
    streamOptions.innerHTML = '';
    const streams = roadmapData[cls] || roadmapData['9th'];
    
    streams.forEach(stream => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.onclick = () => showRoadmap(stream.id);
        card.innerHTML = `
            <i class="fa-solid ${stream.icon}"></i>
            <h3>${stream.title}</h3>
            <p>${stream.desc}</p>
        `;
        streamOptions.appendChild(card);
    });
}

function showRoadmap(streamId) {
    const streams = roadmapData[currentClass] || roadmapData['9th'];
    const stream = streams.find(s => s.id === streamId);
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <div class="result-header">
            <div class="header-main">
                <i class="fa-solid ${stream.icon} stream-main-icon"></i>
                <div>
                    <h2>${stream.title} Roadmap</h2>
                    <p>Current Stage: <strong>${currentClass}</strong></p>
                </div>
            </div>
            <div class="header-tags">
                <span class="badge high-demand">High Demand</span>
                <span class="badge level">Beginner Friendly</span>
            </div>
        </div>
        
        <div class="path-timeline">
            ${stream.path.map((p, i) => `
                <div class="timeline-item">
                    <div class="timeline-dot"><span>${i+1}</span></div>
                    <div class="timeline-content">
                        <h4>${p}</h4>
                        <p>Essential mastery required for this stage.</p>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="roadmap-footer">
            <div class="scope-box">
                <h4><i class="fa-solid fa-rocket"></i> Why Choose This Path?</h4>
                <p>${stream.scope}</p>
            </div>
            <div class="action-box">
                <h4>Ready to start?</h4>
                <p>Unlock premium courses and mentorship.</p>
                <a href="courses.html" class="primary-btn sm">View Courses</a>
            </div>
        </div>
    `;
    
    nextStep(3);
}

function resetWizard() {
    currentClass = '';
    nextStep(1);
}

