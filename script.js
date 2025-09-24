// Professional AI Learning Hub - Advanced JavaScript
class AILearningHub {
    constructor() {
        this.books = [
            {
                id: 1,
                title: "Artificial Intelligence: A Modern Approach",
                description: "Comprehensive introduction to AI concepts, algorithms, and applications",
                level: "intermediate",
                file: "books/Artificial Intelligence - A Modern Approach (3rd Edition).pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 120,
                difficulty: 8,
                tags: ["AI", "Algorithms", "Theory"]
            },
            {
                id: 2,
                title: "Deep Learning with Python",
                description: "Practical deep learning using Python, Keras, and TensorFlow",
                level: "intermediate",
                file: "books/Deep Learning with Python.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 80,
                difficulty: 7,
                tags: ["Deep Learning", "Python", "Keras"]
            },
            {
                id: 3,
                title: "Hands-On Machine Learning",
                description: "Complete guide to ML with Scikit-Learn, Keras, and TensorFlow",
                level: "beginner",
                file: "books/Hands On Machine Learning with Scikit Learn and TensorFlow.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 100,
                difficulty: 6,
                tags: ["Machine Learning", "Scikit-Learn", "TensorFlow"]
            },
            {
                id: 4,
                title: "Elements of Statistical Learning",
                description: "Mathematical foundations of machine learning and statistical inference",
                level: "advanced",
                file: "books/The Elements of Statistical Learning (2nd Edition).pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 150,
                difficulty: 9,
                tags: ["Statistics", "Mathematics", "Theory"]
            },
            {
                id: 5,
                title: "Feature Engineering for ML",
                description: "Advanced techniques for creating better features and improving models",
                level: "intermediate",
                file: "books/Feature Engineering for Machine Learning.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 60,
                difficulty: 7,
                tags: ["Feature Engineering", "Data Science"]
            },
            {
                id: 6,
                title: "Generative Deep Learning",
                description: "Teaching machines to paint, write, compose, and play using generative models",
                level: "advanced",
                file: "books/generative-deep-learning-teaching-machines-to-paint-write-compose-and-play-1492041947-978-1492041948_compress.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 90,
                difficulty: 8,
                tags: ["Generative AI", "Deep Learning", "Creative AI"]
            },
            {
                id: 7,
                title: "ML Design Patterns",
                description: "Solutions to common challenges in data preparation, model building, and MLOps",
                level: "intermediate",
                file: "books/machine-learning-design-patterns-solutions-to-common-challenges-in-data-preparation-model-building-and-mlops-1098115783-9781098115784_compress.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 70,
                difficulty: 7,
                tags: ["MLOps", "Design Patterns", "Best Practices"]
            },
            {
                id: 8,
                title: "Essential Math for AI",
                description: "Mathematical foundations for efficient and successful AI systems",
                level: "beginner",
                file: "books/essential-math-for-ai-next-level-mathematics-for-efficient-and-successful-ai-systems-1nbsped-1098107632-9781098107635_compress.pdf",
                progress: 0,
                favorite: false,
                estimatedHours: 80,
                difficulty: 6,
                tags: ["Mathematics", "Linear Algebra", "Statistics"]
            }
        ];

        this.todos = JSON.parse(localStorage.getItem('aiHub_todos')) || [];
        this.bookProgress = JSON.parse(localStorage.getItem('aiHub_bookProgress')) || {};
        this.userStats = JSON.parse(localStorage.getItem('aiHub_userStats')) || {
            totalHours: 0,
            streak: 0,
            lastStudyDate: null,
            achievements: []
        };

        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.studyTimer = {
            minutes: 25,
            seconds: 0,
            isRunning: false,
            interval: null
        };

        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.renderBooks();
        this.renderTodos();
        this.updateAnalytics();
        this.initializeAnimations();
        this.hideLoadingScreen();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(e.target);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Book filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target));
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewToggle(e.target));
        });

        // Search
        const searchInput = document.getElementById('bookSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Todo functionality
        const addTodoBtn = document.getElementById('addTodo');
        const todoInput = document.getElementById('todoInput');
        
        if (addTodoBtn) {
            addTodoBtn.addEventListener('click', () => this.addTodo());
        }
        
        if (todoInput) {
            todoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addTodo();
            });
        }

        // Study timer
        this.setupTimerControls();

        // Scroll animations
        this.setupScrollAnimations();

        // Auto-save
        setInterval(() => this.saveData(), 30000);
    }

    handleNavigation(link) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const target = link.getAttribute('href');
        const element = document.querySelector(target);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('aiHub_theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        this.showToast('Theme updated', 'success');
    }

    handleFilter(button) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentFilter = button.dataset.filter;
        this.renderBooks();
    }

    handleViewToggle(button) {
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentView = button.dataset.view;
        this.renderBooks();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.renderBooks();
    }

    renderBooks() {
        const booksGrid = document.getElementById('booksGrid');
        if (!booksGrid) return;

        let filteredBooks = this.books;

        // Apply filters
        if (this.currentFilter !== 'all') {
            if (this.currentFilter === 'favorites') {
                filteredBooks = filteredBooks.filter(book => book.favorite);
            } else {
                filteredBooks = filteredBooks.filter(book => book.level === this.currentFilter);
            }
        }

        // Apply search
        if (this.searchQuery) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(this.searchQuery) ||
                book.description.toLowerCase().includes(this.searchQuery) ||
                book.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
        }

        // Update grid class based on view
        booksGrid.className = this.currentView === 'list' ? 'books-list' : 'books-grid';

        booksGrid.innerHTML = filteredBooks.map(book => this.createBookCard(book)).join('');
    }

    createBookCard(book) {
        const progress = this.bookProgress[book.id] || 0;
        const progressWidth = Math.min(progress, 100);
        
        return `
            <div class="book-card animate-fade-in-up" data-book-id="${book.id}">
                <button class="book-favorite ${book.favorite ? 'active' : ''}" 
                        onclick="aiHub.toggleFavorite(${book.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="book-level ${book.level}">${book.level}</div>
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <div class="book-meta">
                    <span class="book-duration">
                        <i class="fas fa-clock"></i> ${book.estimatedHours}h
                    </span>
                    <span class="book-difficulty">
                        <i class="fas fa-signal"></i> ${book.difficulty}/10
                    </span>
                </div>
                <div class="book-tags">
                    ${book.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="book-progress">
                    <div class="book-progress-fill" style="width: ${progressWidth}%"></div>
                </div>
                <div class="progress-text">${progress}% Complete</div>
                <div class="book-actions">
                    <a href="${book.file}" class="btn btn-primary" target="_blank" 
                       onclick="aiHub.trackBookOpen(${book.id})">
                        <i class="fas fa-book-open"></i> Read
                    </a>
                    <button class="btn btn-secondary" onclick="aiHub.updateBookProgress(${book.id})">
                        <i class="fas fa-plus"></i> +25%
                    </button>
                </div>
            </div>
        `;
    }

    toggleFavorite(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            book.favorite = !book.favorite;
            this.renderBooks();
            this.saveData();
            this.showToast(
                book.favorite ? 'Added to favorites' : 'Removed from favorites',
                'success'
            );
        }
    }

    trackBookOpen(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.userStats.totalHours += 0.1; // Track opening as small time increment
            this.updateStreak();
            this.saveData();
        }
    }

    updateBookProgress(bookId) {
        const currentProgress = this.bookProgress[bookId] || 0;
        const newProgress = Math.min(currentProgress + 25, 100);
        
        this.bookProgress[bookId] = newProgress;
        
        if (newProgress === 100) {
            this.checkAchievements();
            this.showToast('Book completed! 🎉', 'success');
        } else {
            this.showToast(`Progress updated: ${newProgress}%`, 'success');
        }
        
        this.renderBooks();
        this.updateAnalytics();
        this.updateRoadmapProgress();
        this.saveData();
    }

    // Todo Management
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'normal'
        };
        
        this.todos.unshift(todo);
        input.value = '';
        this.renderTodos();
        this.saveData();
        this.showToast('Task added', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            if (todo.completed) {
                this.userStats.totalHours += 0.5; // Add time for completed tasks
                this.updateStreak();
            }
            this.renderTodos();
            this.updateAnalytics();
            this.saveData();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.renderTodos();
        this.saveData();
        this.showToast('Task deleted', 'info');
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const todoCount = document.getElementById('todoCount');
        
        if (!todoList) return;
        
        const activeTodos = this.todos.filter(t => !t.completed);
        const completedTodos = this.todos.filter(t => t.completed);
        
        if (todoCount) {
            todoCount.textContent = `${activeTodos.length} active tasks`;
        }
        
        todoList.innerHTML = this.todos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" class="todo-checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       onchange="aiHub.toggleTodo(${todo.id})">
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="todo-delete" onclick="aiHub.deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        `).join('');
    }

    // Study Timer
    setupTimerControls() {
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        const resetBtn = document.getElementById('resetTimer');
        
        if (startBtn) startBtn.addEventListener('click', () => this.startTimer());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseTimer());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetTimer());
    }

    startTimer() {
        if (this.studyTimer.isRunning) return;
        
        this.studyTimer.isRunning = true;
        this.studyTimer.interval = setInterval(() => {
            if (this.studyTimer.seconds === 0) {
                if (this.studyTimer.minutes === 0) {
                    this.timerComplete();
                    return;
                }
                this.studyTimer.minutes--;
                this.studyTimer.seconds = 59;
            } else {
                this.studyTimer.seconds--;
            }
            this.updateTimerDisplay();
        }, 1000);
        
        this.showToast('Study timer started', 'success');
    }

    pauseTimer() {
        this.studyTimer.isRunning = false;
        if (this.studyTimer.interval) {
            clearInterval(this.studyTimer.interval);
        }
        this.showToast('Timer paused', 'info');
    }

    resetTimer() {
        this.pauseTimer();
        this.studyTimer.minutes = 25;
        this.studyTimer.seconds = 0;
        this.updateTimerDisplay();
        this.showToast('Timer reset', 'info');
    }

    timerComplete() {
        this.pauseTimer();
        this.userStats.totalHours += 0.42; // 25 minutes = 0.42 hours
        this.updateStreak();
        this.updateAnalytics();
        this.saveData();
        this.showToast('Study session complete! 🎉', 'success');
        this.resetTimer();
    }

    updateTimerDisplay() {
        const display = document.getElementById('timerDisplay');
        if (display) {
            const minutes = String(this.studyTimer.minutes).padStart(2, '0');
            const seconds = String(this.studyTimer.seconds).padStart(2, '0');
            display.textContent = `${minutes}:${seconds}`;
        }
    }

    // Analytics and Progress
    updateAnalytics() {
        this.updateProgressCards();
        this.updateProgressRings();
        this.updateRoadmapProgress();
    }

    updateProgressCards() {
        const completedBooks = Object.values(this.bookProgress).filter(p => p >= 100).length;
        const totalBooks = this.books.length;
        const completionRate = totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0;
        
        // Update metric values
        const cards = document.querySelectorAll('.analytics-card');
        cards.forEach(card => {
            const header = card.querySelector('.card-header h3').textContent;
            const valueElement = card.querySelector('.metric-value');
            
            if (header.includes('Books')) {
                valueElement.innerHTML = `${completedBooks}<span class="metric-total">/${totalBooks}</span>`;
            } else if (header.includes('Streak')) {
                valueElement.innerHTML = `${this.userStats.streak}<span class="metric-unit">days</span>`;
            } else if (header.includes('Hours')) {
                valueElement.innerHTML = `${Math.round(this.userStats.totalHours)}<span class="metric-unit">h</span>`;
            } else if (header.includes('Rate')) {
                valueElement.innerHTML = `${completionRate}<span class="metric-unit">%</span>`;
            }
        });
    }

    updateProgressRings() {
        const completedBooks = Object.values(this.bookProgress).filter(p => p >= 100).length;
        const totalBooks = this.books.length;
        const percentage = totalBooks > 0 ? (completedBooks / totalBooks) * 100 : 0;
        
        const circle = document.querySelector('.progress-ring-circle');
        if (circle) {
            const circumference = 2 * Math.PI * 25; // radius = 25
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
    }

    updateRoadmapProgress() {
        const completedBooks = Object.values(this.bookProgress).filter(p => p >= 100).length;
        const totalBooks = this.books.length;
        const booksPerPhase = Math.ceil(totalBooks / 4);
        
        document.querySelectorAll('.progress-fill').forEach((fill, index) => {
            const phaseStart = index * booksPerPhase;
            const phaseEnd = Math.min((index + 1) * booksPerPhase, totalBooks);
            const phaseCompleted = Math.min(completedBooks - phaseStart, booksPerPhase);
            const phaseProgress = Math.max(0, (phaseCompleted / booksPerPhase) * 100);
            
            fill.style.width = `${phaseProgress}%`;
            
            const progressText = fill.parentElement.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${Math.round(phaseProgress)}%`;
            }
            
            // Update roadmap step status
            const step = document.querySelectorAll('.roadmap-step')[index];
            if (step && phaseProgress >= 100) {
                step.classList.add('completed');
            }
        });
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.userStats.lastStudyDate;
        
        if (lastStudy !== today) {
            if (lastStudy === new Date(Date.now() - 86400000).toDateString()) {
                this.userStats.streak++;
            } else if (lastStudy !== today) {
                this.userStats.streak = 1;
            }
            this.userStats.lastStudyDate = today;
        }
    }

    checkAchievements() {
        const completedBooks = Object.values(this.bookProgress).filter(p => p >= 100).length;
        const achievements = [];
        
        if (completedBooks >= 1 && !this.userStats.achievements.includes('first_book')) {
            achievements.push('first_book');
            this.showToast('Achievement unlocked: First Book! 🏆', 'success');
        }
        
        if (this.userStats.streak >= 7 && !this.userStats.achievements.includes('week_streak')) {
            achievements.push('week_streak');
            this.showToast('Achievement unlocked: Week Streak! 🔥', 'success');
        }
        
        if (completedBooks >= 5 && !this.userStats.achievements.includes('ai_expert')) {
            achievements.push('ai_expert');
            this.showToast('Achievement unlocked: AI Expert! 🧠', 'success');
        }
        
        this.userStats.achievements.push(...achievements);
        this.updateAchievementDisplay();
    }

    updateAchievementDisplay() {
        const achievementList = document.getElementById('achievementList');
        if (!achievementList) return;
        
        const achievements = [
            { id: 'first_book', icon: 'fas fa-medal', title: 'First Book', desc: 'Complete your first book' },
            { id: 'week_streak', icon: 'fas fa-fire', title: 'Week Streak', desc: 'Study for 7 consecutive days' },
            { id: 'ai_expert', icon: 'fas fa-trophy', title: 'AI Expert', desc: 'Complete 5 books' }
        ];
        
        achievementList.innerHTML = achievements.map(achievement => `
            <div class="achievement ${this.userStats.achievements.includes(achievement.id) ? '' : 'locked'}">
                <i class="${achievement.icon}"></i>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.desc}</p>
                </div>
            </div>
        `).join('');
    }

    // Animations and UI
    initializeAnimations() {
        // Animate hero stats
        this.animateCounters();
        
        // Initialize theme
        const savedTheme = localStorage.getItem('aiHub_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.book-card, .analytics-card, .resource-card').forEach(el => {
            observer.observe(el);
        });
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');
        
        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        icon.className = `toast-icon ${icons[type]}`;
        messageEl.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    saveData() {
        localStorage.setItem('aiHub_todos', JSON.stringify(this.todos));
        localStorage.setItem('aiHub_bookProgress', JSON.stringify(this.bookProgress));
        localStorage.setItem('aiHub_userStats', JSON.stringify(this.userStats));
    }
}

// Global functions for onclick handlers
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showComingSoon() {
    if (window.aiHub) {
        window.aiHub.showToast('Coming soon! Stay tuned for updates.', 'info');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.aiHub = new AILearningHub();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}