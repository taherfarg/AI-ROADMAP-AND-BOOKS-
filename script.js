// AI Learning Hub - Interactive JavaScript
class AILearningHub {
    constructor() {
        this.books = [];
        this.notes = [];
        this.currentNote = null;
        this.userProgress = {
            booksRead: 0,
            hoursSpent: 0,
            achievements: 0,
            completionRate: 0
        };

        this.init();
    }

    init() {
        this.loadBooks();
        this.setupEventListeners();
        this.loadUserData();
        this.updateProgressDisplay();
        this.animateOnLoad();
    }

    // Load books data
    loadBooks() {
        this.books = [
            {
                id: 1,
                title: "Artificial Intelligence - A Modern Approach",
                author: "Stuart Russell & Peter Norvig",
                category: "core-ai",
                description: "Comprehensive introduction to the theory and practice of artificial intelligence, covering foundational concepts, algorithms, and applications.",
                pages: 1152,
                difficulty: "Advanced",
                tags: ["AI Fundamentals", "Search", "Logic", "Planning"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 2,
                title: "Deep Learning with Python",
                author: "François Chollet",
                category: "deep-learning",
                description: "Practical guide to deep learning using Keras and TensorFlow, covering neural networks, CNNs, RNNs, and advanced architectures.",
                pages: 384,
                difficulty: "Intermediate",
                tags: ["Keras", "TensorFlow", "Neural Networks", "Computer Vision"],
                path: "Deep Learning Mastery"
            },
            {
                id: 3,
                title: "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
                author: "Aurélien Géron",
                category: "deep-learning",
                description: "Practical guide to machine learning with scikit-learn, Keras, and TensorFlow, covering end-to-end ML projects.",
                pages: 856,
                difficulty: "Intermediate",
                tags: ["Scikit-learn", "TensorFlow", "ML Projects", "Best Practices"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 4,
                title: "The Elements of Statistical Learning",
                author: "Trevor Hastie, Robert Tibshirani & Jerome Friedman",
                category: "mathematics",
                description: "Comprehensive treatment of statistical learning methods, covering supervised and unsupervised learning algorithms.",
                pages: 745,
                difficulty: "Advanced",
                tags: ["Statistical Learning", "Linear Models", "SVM", "Unsupervised Learning"],
                path: "Mathematics for AI"
            },
            {
                id: 5,
                title: "Feature Engineering for Machine Learning",
                author: "Alice Zheng & Amanda Casari",
                category: "applications",
                description: "Practical guide to feature engineering techniques and best practices for building effective machine learning models.",
                pages: 214,
                difficulty: "Intermediate",
                tags: ["Feature Engineering", "Data Preprocessing", "Model Performance"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 6,
                title: "Essential Math for AI",
                author: "Hala Nelson",
                category: "mathematics",
                description: "Next-level mathematics for efficient and successful AI systems, covering essential mathematical concepts for AI practitioners.",
                pages: 608,
                difficulty: "Intermediate",
                tags: ["Linear Algebra", "Probability", "Calculus", "AI Math"],
                path: "Mathematics for AI"
            },
            {
                id: 7,
                title: "Generative Deep Learning",
                author: "David Foster",
                category: "deep-learning",
                description: "Teaching machines to paint, write, compose, and play - comprehensive guide to generative models and creative AI.",
                pages: 456,
                difficulty: "Advanced",
                tags: ["GANs", "VAEs", "Generative Models", "Creative AI"],
                path: "Deep Learning Mastery"
            },
            {
                id: 8,
                title: "Machine Learning Design Patterns",
                author: "Valliappa Lakshmanan, Sara Robinson & Michael Munn",
                category: "applications",
                description: "Solutions to common challenges in data preparation, model building, and MLOps for production machine learning systems.",
                pages: 408,
                difficulty: "Intermediate",
                tags: ["MLOps", "Design Patterns", "Production ML", "Best Practices"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 9,
                title: "Artificial Intelligence: An Introduction to the Big Ideas",
                author: "Robert H. Chen & Chelsea C. Chen",
                category: "core-ai",
                description: "Accessible introduction to the big ideas and concepts in artificial intelligence for beginners and enthusiasts.",
                pages: 192,
                difficulty: "Beginner",
                tags: ["AI Concepts", "Introduction", "Big Ideas", "Philosophy"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 10,
                title: "Computer Vision: Algorithms and Applications",
                author: "Richard Szeliski",
                category: "applications",
                description: "Comprehensive introduction to computer vision covering fundamental concepts, algorithms, and real-world applications.",
                pages: 832,
                difficulty: "Advanced",
                tags: ["Computer Vision", "Image Processing", "Feature Detection", "3D Vision"],
                path: "Computer Vision"
            },
            {
                id: 11,
                title: "Natural Language Processing with Transformers",
                author: "Lewis Tunstall, Leandro von Werra & Thomas Wolf",
                category: "applications",
                description: "Practical guide to building, training, and fine-tuning transformer models for natural language processing tasks.",
                pages: 406,
                difficulty: "Intermediate",
                tags: ["NLP", "Transformers", "Hugging Face", "BERT", "GPT"],
                path: "Natural Language Processing"
            },
            {
                id: 12,
                title: "Reinforcement Learning: An Introduction",
                author: "Richard S. Sutton & Andrew G. Barto",
                category: "core-ai",
                description: "Comprehensive introduction to reinforcement learning covering theory, algorithms, and applications.",
                pages: 552,
                difficulty: "Advanced",
                tags: ["Reinforcement Learning", "Markov Decision Processes", "Q-Learning"],
                path: "Machine Learning Fundamentals"
            },
            {
                id: 13,
                title: "Pattern Recognition and Machine Learning",
                author: "Christopher M. Bishop",
                category: "mathematics",
                description: "Statistical pattern recognition and machine learning covering Bayesian methods, neural networks, and graphical models.",
                pages: 738,
                difficulty: "Advanced",
                tags: ["Pattern Recognition", "Bayesian Methods", "Graphical Models"],
                path: "Mathematics for AI"
            },
            {
                id: 14,
                title: "Speech and Language Processing",
                author: "Daniel Jurafsky & James H. Martin",
                category: "applications",
                description: "Comprehensive introduction to speech and language processing covering ASR, NLP, and dialogue systems.",
                pages: 1024,
                difficulty: "Advanced",
                tags: ["Speech Recognition", "NLP", "Dialogue Systems", "Computational Linguistics"],
                path: "Natural Language Processing"
            },
            {
                id: 15,
                title: "Arabic Natural Language Processing",
                author: "Nizar Y. Habash",
                category: "applications",
                description: "Comprehensive guide to Arabic NLP covering morphology, syntax, and computational approaches for Arabic text processing.",
                pages: 432,
                difficulty: "Advanced",
                tags: ["Arabic NLP", "Morphology", "Syntax", "Computational Linguistics"],
                path: "Natural Language Processing"
            }
        ];

        this.renderBooks(this.books);
    }

    // Render books to the grid
    renderBooks(books) {
        const booksGrid = document.getElementById('booksGrid');
        booksGrid.innerHTML = '';

        if (books.length === 0) {
            booksGrid.innerHTML = '<div class="loading">No books found matching your search.</div>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card fade-in';
            bookCard.dataset.id = book.id;
            bookCard.dataset.category = book.category;

            const progress = this.getBookProgress(book.id);
            const progressWidth = Math.min((progress / book.pages) * 100, 100);

            bookCard.innerHTML = `
                <div class="book-category">${this.getCategoryName(book.category)}</div>
                <h3 class="book-title">${book.title}</h3>
                <div class="book-author">by ${book.author}</div>
                <div class="book-description">${book.description}</div>
                <div class="book-meta">
                    <span><i class="fas fa-book"></i> ${book.pages} pages</span>
                    <span><i class="fas fa-signal"></i> ${book.difficulty}</span>
                </div>
                <div class="book-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressWidth}%"></div>
                    </div>
                    <span>${progress}/${book.pages} pages</span>
                </div>
                <div class="book-actions">
                    <button class="btn btn-outline btn-book" onclick="aiHub.openBook(${book.id})">
                        <i class="fas fa-book-open"></i> Read
                    </button>
                    <button class="btn btn-outline btn-book" onclick="aiHub.takeNotes(${book.id})">
                        <i class="fas fa-sticky-note"></i> Notes
                    </button>
                </div>
            `;

            booksGrid.appendChild(bookCard);
        });
    }

    // Get category display name
    getCategoryName(category) {
        const categories = {
            'core-ai': 'Core AI',
            'deep-learning': 'Deep Learning',
            'mathematics': 'Mathematics',
            'applications': 'Applications'
        };
        return categories[category] || category;
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Mobile navigation
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filterBooks(e.target.value);
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterByCategory(btn.dataset.category);
            });
        });

        // Learning path buttons
        const pathBtns = document.querySelectorAll('.path-card .btn');
        pathBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pathCard = e.target.closest('.path-card');
                const pathTitle = pathCard.querySelector('.path-title').textContent;
                this.startLearningPath(pathTitle);
            });
        });

        // Notes functionality
        document.getElementById('newNoteBtn').addEventListener('click', () => this.createNewNote());
        document.getElementById('saveNoteBtn').addEventListener('click', () => this.saveNote());
        document.getElementById('deleteNoteBtn').addEventListener('click', () => this.deleteNote());

        // Note selection
        document.getElementById('notesList').addEventListener('click', (e) => {
            if (e.target.closest('.note-item')) {
                const noteItem = e.target.closest('.note-item');
                this.selectNote(noteItem.dataset.id);
            }
        });
    }

    // Filter books by search term
    filterBooks(searchTerm) {
        const filteredBooks = this.books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        this.renderBooks(filteredBooks);
    }

    // Filter books by category
    filterByCategory(category) {
        if (category === 'all') {
            this.renderBooks(this.books);
        } else {
            const filteredBooks = this.books.filter(book => book.category === category);
            this.renderBooks(filteredBooks);
        }
    }

    // Get book progress
    getBookProgress(bookId) {
        const progress = localStorage.getItem(`book_${bookId}_progress`);
        return progress ? parseInt(progress) : 0;
    }

    // Update book progress
    updateBookProgress(bookId, pages) {
        localStorage.setItem(`book_${bookId}_progress`, pages.toString());
        this.updateProgressDisplay();
        this.renderBooks(this.books); // Re-render to update progress bars
    }

    // Open book for reading
    openBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        // Create reading modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${book.title}</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="reading-progress">
                        <label>Reading Progress: </label>
                        <input type="range" min="0" max="${book.pages}" value="${this.getBookProgress(bookId)}"
                               oninput="aiHub.updateProgressDisplay()"
                               onchange="aiHub.updateBookProgress(${bookId}, this.value)">
                        <span class="progress-text">${this.getBookProgress(bookId)} / ${book.pages} pages</span>
                    </div>
                    <div class="reading-content">
                        <p>This is a preview of "${book.title}". In a full implementation, this would show the actual book content or link to the PDF file.</p>
                        <div class="book-info">
                            <h3>Book Information</h3>
                            <p><strong>Author:</strong> ${book.author}</p>
                            <p><strong>Category:</strong> ${this.getCategoryName(book.category)}</p>
                            <p><strong>Pages:</strong> ${book.pages}</p>
                            <p><strong>Difficulty:</strong> ${book.difficulty}</p>
                            <p><strong>Tags:</strong> ${book.tags.join(', ')}</p>
                        </div>
                        <div class="reading-actions">
                            <button class="btn btn-primary" onclick="aiHub.takeNotes(${bookId})">
                                <i class="fas fa-sticky-note"></i> Take Notes
                            </button>
                            <button class="btn btn-outline" onclick="aiHub.markAsComplete(${bookId})">
                                <i class="fas fa-check"></i> Mark Complete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white; border-radius: 12px; max-width: 800px; width: 100%;
            max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;

        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            padding: 24px; border-bottom: 1px solid #dee2e6; display: flex;
            justify-content: space-between; align-items: center;
        `;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            padding: 24px;
        `;

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.style.cssText = `
            background: none; border: none; font-size: 24px; cursor: pointer;
            color: #6c757d; padding: 0; width: 30px; height: 30px; display: flex;
            align-items: center; justify-content: center;
        `;

        document.body.appendChild(modal);
    }

    // Update progress display
    updateProgressDisplay() {
        const totalBooks = this.books.length;
        const completedBooks = this.books.filter(book => this.getBookProgress(book.id) >= book.pages).length;
        const totalPages = this.books.reduce((sum, book) => sum + book.pages, 0);
        const readPages = this.books.reduce((sum, book) => sum + this.getBookProgress(book.id), 0);

        this.userProgress.booksRead = completedBooks;
        this.userProgress.completionRate = totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0;
        this.userProgress.hoursSpent = Math.round(readPages / 50); // Assuming 50 pages per hour

        document.getElementById('booksRead').textContent = completedBooks;
        document.getElementById('completionRate').textContent = this.userProgress.completionRate + '%';
        document.getElementById('hoursSpent').textContent = this.userProgress.hoursSpent;
        document.getElementById('achievements').textContent = Math.floor(completedBooks / 2); // Achievement every 2 books
    }

    // Mark book as complete
    markAsComplete(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.updateBookProgress(bookId, book.pages);
            this.showNotification(`🎉 "${book.title}" marked as complete!`, 'success');
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px; padding: 16px 24px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001; transform: translateX(100%); transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Notes functionality
    createNewNote() {
        this.currentNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            bookId: null,
            bookTitle: 'No book selected',
            date: new Date().toLocaleDateString()
        };
        this.renderNoteEditor();
    }

    takeNotes(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.currentNote = {
                id: Date.now(),
                title: `Notes: ${book.title}`,
                content: '',
                bookId: bookId,
                bookTitle: book.title,
                date: new Date().toLocaleDateString()
            };
            this.renderNoteEditor();
            this.openNotesModal();
        }
    }

    renderNoteEditor() {
        if (!this.currentNote) return;

        document.getElementById('noteTitle').value = this.currentNote.title;
        document.getElementById('noteContent').value = this.currentNote.content;
        document.getElementById('noteBook').textContent = this.currentNote.bookTitle;
        document.getElementById('noteDate').textContent = this.currentNote.date;
    }

    saveNote() {
        if (!this.currentNote) return;

        this.currentNote.title = document.getElementById('noteTitle').value;
        this.currentNote.content = document.getElementById('noteContent').value;
        this.currentNote.date = new Date().toLocaleDateString();

        const existingIndex = this.notes.findIndex(note => note.id === this.currentNote.id);
        if (existingIndex >= 0) {
            this.notes[existingIndex] = { ...this.currentNote };
        } else {
            this.notes.push({ ...this.currentNote });
        }

        this.saveNotesToStorage();
        this.renderNotesList();
        this.showNotification('Note saved successfully!', 'success');
    }

    deleteNote() {
        if (!this.currentNote) return;

        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== this.currentNote.id);
            this.saveNotesToStorage();
            this.renderNotesList();
            this.createNewNote();
            this.showNotification('Note deleted successfully!', 'success');
        }
    }

    selectNote(noteId) {
        const note = this.notes.find(n => n.id == noteId);
        if (note) {
            this.currentNote = note;
            this.renderNoteEditor();

            // Update active state in list
            document.querySelectorAll('.note-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.id == noteId) {
                    item.classList.add('active');
                }
            });
        }
    }

    renderNotesList() {
        const notesList = document.getElementById('notesList');
        if (this.notes.length === 0) {
            notesList.innerHTML = '<p class="no-notes">No notes yet. Start reading to add notes!</p>';
            return;
        }

        notesList.innerHTML = this.notes.map(note => `
            <div class="note-item" data-id="${note.id}">
                <div class="note-item-title">${note.title}</div>
                <div class="note-item-meta">${note.bookTitle} • ${note.date}</div>
            </div>
        `).join('');
    }

    openNotesModal() {
        // This could open a modal for better note-taking experience
        this.scrollToSection('notes');
    }

    // Learning paths functionality
    startLearningPath(pathName) {
        this.showNotification(`Starting learning path: ${pathName}`, 'info');
        this.scrollToSection('library');

        // Filter books by learning path
        const pathBooks = this.books.filter(book => book.path === pathName);
        this.renderBooks(pathBooks);
    }

    // Scroll to section
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    // Load user data from localStorage
    loadUserData() {
        const savedNotes = localStorage.getItem('aiLearningHub_notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
            this.renderNotesList();
        }

        // Load any other user data here
        this.updateProgressDisplay();
    }

    // Save notes to localStorage
    saveNotesToStorage() {
        localStorage.setItem('aiLearningHub_notes', JSON.stringify(this.notes));
    }

    // Animate elements on load
    animateOnLoad() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Initialize the application
const aiHub = new AILearningHub();

// Make functions globally available for HTML onclick handlers
window.aiHub = aiHub;
