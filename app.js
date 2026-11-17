/**
 * Kartik Karnwal Portfolio — Interactive Engine
 * Inspired by Aryan Gupta's Handcrafted, Animated & Tactile Experience
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------
       1. THEME SWITCHER (Dark / Light Mode)
       ------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootHtml = document.documentElement;

    // Detect saved theme or system preference
    const savedTheme = localStorage.getItem('kartik-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    rootHtml.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            rootHtml.setAttribute('data-theme', nextTheme);
            localStorage.setItem('kartik-theme', nextTheme);
            showToast(nextTheme === 'dark' ? '🌙 Night mode enabled' : '☀️ Day mode enabled');
        });
    }

    /* -------------------------------------------------------------------------
       2. TOAST NOTIFICATION UTILITY
       ------------------------------------------------------------------------- */
    const toastBox = document.getElementById('toastNotification');
    let toastTimeout;

    function showToast(message) {
        if (!toastBox) return;
        toastBox.textContent = message;
        toastBox.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastBox.classList.remove('show');
        }, 3000);
    }

    /* -------------------------------------------------------------------------
       3. 3D KEYBOARD KEYS INTERACTION (Aryan Gupta Signature Style)
       ------------------------------------------------------------------------- */
    const keyMail = document.getElementById('keyMail');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailAddress = "kartikkarnwal07@gmail.com";

    // Copy Email Function
    function copyEmail() {
        navigator.clipboard.writeText(emailAddress).then(() => {
            showToast('📋 Copied kartikkarnwal07@gmail.com to clipboard!');
            if (copyEmailBtn) {
                const icon = copyEmailBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-check text-green';
                    setTimeout(() => {
                        icon.className = 'far fa-copy';
                    }, 2500);
                }
            }
        }).catch(() => {
            window.location.href = `mailto:${emailAddress}`;
        });
    }

    if (keyMail) {
        keyMail.addEventListener('click', () => {
            pressKeyAnimation(keyMail);
            copyEmail();
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', copyEmail);
    }

    // Helper to animate 3D key press
    function pressKeyAnimation(element) {
        if (!element) return;
        element.classList.add('pressed');
        setTimeout(() => element.classList.remove('pressed'), 200);
    }

    // Physical Keyboard Shortcuts (M, L, G, P)
    window.addEventListener('keydown', (e) => {
        // Do not trigger if typing inside input or textarea
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
            return;
        }

        const key = e.key.toLowerCase();
        const targetKeyEl = document.querySelector(`.key-3d[data-key="${key}"]`);

        if (targetKeyEl) {
            pressKeyAnimation(targetKeyEl);
            if (key === 'm') {
                copyEmail();
            } else if (key === 'l') {
                showToast('🚀 Opening LinkedIn...');
                window.open(targetKeyEl.getAttribute('href'), '_blank');
            } else if (key === 'g') {
                showToast('💻 Opening GitHub...');
                window.open(targetKeyEl.getAttribute('href'), '_blank');
            } else if (key === 'p') {
                showToast('📞 Calling Kartik...');
                window.location.href = targetKeyEl.getAttribute('href');
            }
        }
    });

    /* -------------------------------------------------------------------------
       4. INTERACTIVE TOOLKIT / STACK INSPECTOR
       ------------------------------------------------------------------------- */
    const stackItems = document.querySelectorAll('.stack-item');
    const detailTitle = document.getElementById('detailTitle');
    const detailRole = document.getElementById('detailRole');
    const detailDesc = document.getElementById('detailDesc');

    stackItems.forEach(item => {
        const updateDetail = () => {
            stackItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const toolName = item.getAttribute('data-tool');
            const toolRole = item.getAttribute('data-role');
            const toolHow = item.getAttribute('data-how');

            if (detailTitle) detailTitle.textContent = toolName;
            if (detailRole) detailRole.textContent = toolRole;
            if (detailDesc) detailDesc.textContent = toolHow;
        };

        item.addEventListener('mouseenter', updateDetail);
        item.addEventListener('click', updateDetail);
    });

    /* -------------------------------------------------------------------------
       5. PROJECT CATEGORY FILTERING
       ------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* -------------------------------------------------------------------------
       6. VISITOR NOTES WALL (Interactive Board with LocalStorage)
       ------------------------------------------------------------------------- */
    const visitorForm = document.getElementById('visitorNoteForm');
    const notesFeed = document.getElementById('notesFeed');
    const LOCAL_NOTES_KEY = 'kartik_visitor_notes';

    // Load saved custom notes
    function loadVisitorNotes() {
        try {
            const savedNotes = JSON.parse(localStorage.getItem(LOCAL_NOTES_KEY) || '[]');
            savedNotes.forEach(note => renderNote(note.name, note.emoji, note.message, false));
        } catch (e) {
            console.warn('Could not parse saved visitor notes', e);
        }
    }

    function renderNote(name, emoji, message, prepend = true) {
        if (!notesFeed) return;
        const colorClasses = ['note-color-1', 'note-color-2', 'note-color-3', 'note-color-4'];
        const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

        const noteDiv = document.createElement('div');
        noteDiv.className = `feed-note ${randomColor}`;
        noteDiv.innerHTML = `
            <div class="note-header">
                <b>${escapeHTML(name)}</b>
                <span>${emoji}</span>
            </div>
            <p>"${escapeHTML(message)}"</p>
        `;

        if (prepend) {
            notesFeed.prepend(noteDiv);
        } else {
            notesFeed.appendChild(noteDiv);
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    if (visitorForm) {
        visitorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('visitorName');
            const emojiSelect = document.getElementById('visitorEmoji');
            const messageInput = document.getElementById('visitorMessage');

            const name = nameInput.value.trim();
            const emoji = emojiSelect.value;
            const message = messageInput.value.trim();

            if (!name || !message) return;

            renderNote(name, emoji, message, true);

            // Save to localStorage
            try {
                const currentNotes = JSON.parse(localStorage.getItem(LOCAL_NOTES_KEY) || '[]');
                currentNotes.unshift({ name, emoji, message, date: new Date().toISOString() });
                localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(currentNotes));
            } catch (err) {
                console.error(err);
            }

            visitorForm.reset();
            showToast('📌 Note pinned to the wall! Thank you!');
        });

        loadVisitorNotes();
    }

    /* -------------------------------------------------------------------------
       7. CONTACT FORM DIRECT MESSAGE
       ------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = 'var(--grass)';
                if (formStatus) {
                    formStatus.textContent = "Thanks for reaching out! I'll get back to you shortly.";
                    formStatus.style.color = "var(--grass)";
                }
                showToast("✨ Message sent! Looking forward to talking!");
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3500);
            }, 900);
        });
    }

    /* -------------------------------------------------------------------------
       8. LIVE LOCAL CLOCK IN FOOTER (IST)
       ------------------------------------------------------------------------- */
    const liveClockEl = document.getElementById('liveClock');

    function updateISTClock() {
        if (!liveClockEl) return;
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        liveClockEl.textContent = now.toLocaleTimeString('en-US', options);
    }

    updateISTClock();
    setInterval(updateISTClock, 1000);

    /* -------------------------------------------------------------------------
       9. FLOATING BOTTOM DOCK SCROLLSPY
       ------------------------------------------------------------------------- */
    const dockLinks = document.querySelectorAll('.dock-link');
    const sections = document.querySelectorAll('section[id]');

    function onScrollSpy() {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        dockLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
});
