document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data ---
    const blogPosts = [
        {
            id: 1,
            title: "How I grew my YouTube Channel to 100k",
            category: "YouTube Growth",
            excerpt: "The meaningful strategies and consistent habits that helped me scale my channel from zero to hero.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            content: `
                <p>Growing a YouTube channel to 100,000 subscribers is a dream for many, but it requires more than just luck. It's about consistency, value, and understanding your audience.</p>
                <h3>1. Niche Down</h3>
                <p>When I started, I tried to cover everything. It wasn't until I focused on tech and tutorials that I saw real growth.</p>
                <h3>2. Quality Over Quantity</h3>
                <p>Don't just post for the sake of posting. Make sure every video adds value to your viewer's life.</p>
                <h3>3. Engage with Your Community</h3>
                <p>Reply to comments, ask questions, and build a relationship with your subscribers. They are your biggest asset.</p>
                <p>Remember, overnight success usually takes about 10 years. Keep creating!</p>
            `
        },
        {
            id: 2,
            title: "Top 5 Gadgets of 2026",
            category: "Tech Review",
            excerpt: "A curated list of the must-have tech that is changing the way we live and work this year.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            content: `
                <p>2026 has been an incredible year for technology. Here are my top 5 picks that are worth every penny.</p>
                <h3>1. The Holo-Phone X</h3>
                <p>With its holographic display, this phone is a game-changer for media consumption.</p>
                <h3>2. Neural Link Earbuds</h3>
                <p>Translation in real-time? Yes, please. These earbuds break down language barriers instantly.</p>
                <h3>3. Smart Home Hub 5.0</h3>
                <p>Control your entire house with just your voice, now with improved AI that anticipates your needs.</p>
                <p>Check out my full review video for a deep dive into each of these gadgets.</p>
            `
        },
        {
            id: 3,
            title: "My Daily Routine as a Creator",
            category: "Lifestyle",
            excerpt: "Behind the scenes: How I manage content creation, editing, and personal life without burning out.",
            image: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            content: `
                <p>Being a full-time content creator is rewarding but demanding. Here's what a typical day looks like for me.</p>
                <h3>Morning: 6:00 AM - 10:00 AM</h3>
                <p>I start with a workout, followed by a healthy breakfast. Then, it's deep work time—scripting and planning.</p>
                <h3>Mid-Day: 10:00 AM - 2:00 PM</h3>
                <p>Filming. This is when the magic happens. I try to batch record videos to save time.</p>
                <h3>Afternoon: 2:00 PM - 6:00 PM</h3>
                <p>Editing and emails. The less glamorous part, but essential.</p>
                <h3>Evening</h3>
                <p>Disconnecting. It's crucial to step away from screens to recharge for the next day.</p>
            `
        }
    ];

    const dailyUpdates = [
        "New video dropping this Friday at 6 PM! 🎥",
        "Just hit 50k on TikTok! Thank you fam! ❤️",
        "Thinking about starting a podcast... thoughts? 🤔",
        "Live stream moved to Sunday due to technical upgrades! ⚡",
        "Check out my new Instagram reel for a surprise! 🎁"
    ];

    // --- Render Functions ---

    function renderBlogs() {
        const grid = document.getElementById('blog-grid');
        if (!grid) return;
        grid.innerHTML = blogPosts.map(post => `
            <article class="blog-card">
                <div class="blog-image" style="background-image: url('${post.image}')">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-content">
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-footer">
                        <span>Feb 10, 2026</span>
                        <a href="article.html?id=${post.id}" class="post-link">Read More &rarr;</a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    function renderUpdates() {
        const ticker = document.getElementById('updates-ticker');
        if (!ticker) return;
        // Duplicate content purely for infinite scroll illusion if needed, 
        // but css animation handles loop. We'll just add items.
        // To make it loop seamlessly in CSS, we usually need enough content or duplication.
        const content = dailyUpdates.map(update =>
            `<div class="update-item"><span>Update:</span> ${update}</div>`
        ).join('');
        ticker.innerHTML = content + content; // Duplicate for smooth loop
    }

    // --- Interactivity ---

    function setupAuth() {
        const modal = document.getElementById('auth-modal');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const closeBtn = document.querySelector('.close-modal');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const forms = document.querySelectorAll('.auth-form');

        const openModal = (tabName) => {
            modal.style.display = 'flex';
            // Switch tab
            tabBtns.forEach(btn => {
                if (btn.dataset.target === tabName) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            forms.forEach(form => {
                if (form.id === `${tabName}-form`) {
                    form.classList.add('active');
                    form.style.display = 'block';
                } else {
                    form.classList.remove('active');
                    form.style.display = 'none';
                }
            });
        };

        loginBtn.addEventListener('click', () => openModal('login'));
        signupBtn.addEventListener('click', () => openModal('signup'));

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Tab Switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;

                // Update Tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Forms
                forms.forEach(f => {
                    f.classList.remove('active');
                    f.style.display = 'none';
                });
                const activeForm = document.getElementById(`${target}-form`);
                activeForm.classList.add('active');
                activeForm.style.display = 'block';
            });
        });

        // Mock Submission
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Processing...';
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    alert('Action simulated successfully! Welcome to the supiri community.');
                    modal.style.display = 'none';
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupFileUpload() {
        const uploadZone = document.getElementById('upload-zone');
        const fileInput = document.getElementById('file-upload');

        if (!uploadZone || !fileInput) return;

        uploadZone.addEventListener('click', () => fileInput.click());

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--accent-color)';
            uploadZone.style.background = 'var(--glass-bg)';
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = 'var(--glass-border)';
            uploadZone.style.background = 'transparent';
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--glass-border)';
            uploadZone.style.background = 'transparent';

            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        });

        function handleFiles(files) {
            const fileName = files[0].name;
            const p = uploadZone.querySelector('p');
            p.innerHTML = `Selected: <span style="color: var(--accent-color)">${fileName}</span><br>Uploading...`;

            // Mock upload progress
            setTimeout(() => {
                p.innerHTML = `Success! <span style="color: var(--primary-color)">${fileName}</span> has been uploaded.`;
            }, 2000);
        }
    }

    // --- Single Article Rendering ---
    function renderSingleArticle() {
        const articleContainer = document.getElementById('article-content');
        if (!articleContainer) return;

        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id'));

        const post = blogPosts.find(p => p.id === articleId);

        if (post) {
            document.title = `${post.title} | Teeshan Senarathne`;

            // Set Hero properties dynamically if they exist
            const heroTitle = document.querySelector('.article-hero-title');
            const heroSubtitle = document.querySelector('.article-hero-subtitle');
            if (heroTitle) heroTitle.innerText = post.title;
            if (heroSubtitle) heroSubtitle.innerText = post.category;

            // Render content
            articleContainer.innerHTML = `
                <div class="article-header-image" style="background-image: url('${post.image}'); height: 400px; background-size: cover; background-position: center; border-radius: 20px; margin-bottom: 40px;"></div>
                <div class="article-body">
                    ${post.content}
                </div>
                <div class="article-footer" style="margin-top: 50px; border-top: 1px solid var(--glass-border); padding-top: 20px;">
                    <a href="blog.html" class="btn btn-outline">&larr; Back to Blog</a>
                </div>
            `;
        } else {
            articleContainer.innerHTML = '<p>Article not found.</p>';
        }
    }

    // --- Init ---
    renderBlogs();
    renderUpdates();
    renderSingleArticle();
    setupAuth();
    setupFileUpload();

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
