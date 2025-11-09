// ========================================
// Theme Management
// ========================================
const themeManager = {
  init() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.prefersDark.matches ? 'dark' : 'light');
    }
    
    // Listen for theme toggle clicks
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    // Listen for system theme changes
    this.prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
};

// ========================================
// Navigation Management
// ========================================
const navigationManager = {
  init() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav__toggle');
    this.navMenu = document.querySelector('.nav__menu');
    this.navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          this.navMenu.classList.contains('active') &&
          !this.nav.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Handle scroll for active link highlighting
    this.setupScrollSpy();
  },
  
  toggleMenu() {
    const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
    this.navToggle.setAttribute('aria-expanded', !isExpanded);
    this.navMenu.classList.toggle('active');
    
    if (!isExpanded) {
      this.navToggle.setAttribute('aria-label', 'メニューを閉じる');
    } else {
      this.navToggle.setAttribute('aria-label', 'メニューを開く');
    }
  },
  
  closeMenu() {
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.setAttribute('aria-label', 'メニューを開く');
    this.navMenu.classList.remove('active');
  },
  
  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveLink(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  },
  
  setActiveLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
};

// ========================================
// Smooth Scroll with Motion Preference
// ========================================
const smoothScrollManager = {
  init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          if (prefersReducedMotion) {
            // Instant scroll for reduced motion preference
            targetElement.scrollIntoView({ behavior: 'auto' });
          } else {
            // Smooth scroll
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
};

// ========================================
// Accordion Management (Read More)
// ========================================
const accordionManager = {
  init() {
    const expandBtn = document.querySelector('.about__expand-btn');
    const expandableContent = document.querySelector('.about__expandable-content');
    
    if (expandBtn && expandableContent) {
      expandBtn.addEventListener('click', () => {
        const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
        
        expandBtn.setAttribute('aria-expanded', !isExpanded);
        expandableContent.classList.toggle('expanded');
        
        const expandText = expandBtn.querySelector('.about__expand-text');
        if (expandText) {
          expandText.textContent = isExpanded ? '続きを読む' : '閉じる';
        }
        
        // Scroll to content if expanding
        if (!isExpanded) {
          setTimeout(() => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
              expandableContent.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            } else {
              expandableContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 300);
        }
      });
    }
  }
};

// ========================================
// Scroll Animation (Fade In)
// ========================================
const scrollAnimationManager = {
  init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const animatedElements = document.querySelectorAll(
      '.profile-card, .work-card, .value-card, .vision__item, .timeline__item'
    );
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 50);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
};

// ========================================
// Print Functionality
// ========================================
const printManager = {
  init() {
    // Expand all collapsible content before printing
    window.addEventListener('beforeprint', () => {
      const expandableContent = document.querySelector('.about__expandable-content');
      if (expandableContent) {
        expandableContent.style.maxHeight = 'none';
        expandableContent.style.overflow = 'visible';
      }
    });
    
    // Restore after printing
    window.addEventListener('afterprint', () => {
      const expandableContent = document.querySelector('.about__expandable-content');
      const expandBtn = document.querySelector('.about__expand-btn');
      
      if (expandableContent && expandBtn) {
        const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
          expandableContent.style.maxHeight = '';
          expandableContent.style.overflow = '';
        }
      }
    });
  }
};

// ========================================
// Keyboard Navigation Enhancement
// ========================================
const keyboardManager = {
  init() {
    // Add focus visible styles
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'メニューを開く');
          navMenu.classList.remove('active');
        }
      }
    });
  }
};

// ========================================
// Error Handling Wrapper
// ========================================
function safeInit(fn, name) {
  try {
    fn();
  } catch (error) {
    console.warn(`Failed to initialize ${name}:`, error);
  }
}

// ========================================
// Initialize All Modules on DOM Ready
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  safeInit(() => themeManager.init(), 'Theme Manager');
  safeInit(() => navigationManager.init(), 'Navigation Manager');
  safeInit(() => smoothScrollManager.init(), 'Smooth Scroll Manager');
  safeInit(() => accordionManager.init(), 'Accordion Manager');
  safeInit(() => scrollAnimationManager.init(), 'Scroll Animation Manager');
  safeInit(() => printManager.init(), 'Print Manager');
  safeInit(() => keyboardManager.init(), 'Keyboard Manager');
}

// ========================================
// Performance: Debounce Utility
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========================================
// Resize Handler (if needed in future)
// ========================================
const handleResize = debounce(() => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navMenu && navMenu.classList.contains('active')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      navMenu.classList.remove('active');
    }
  }
}, 250);

window.addEventListener('resize', handleResize);

// ========================================
// Expose for debugging (optional)
// ========================================
if (typeof window !== 'undefined') {
  window.portfolioApp = {
    themeManager,
    navigationManager,
    smoothScrollManager,
    accordionManager,
    scrollAnimationManager,
    printManager,
    keyboardManager
  };
}