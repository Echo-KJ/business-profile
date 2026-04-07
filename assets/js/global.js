document.addEventListener('DOMContentLoaded', () => {



  // Mobile menu
  function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    if(nav) {
      nav.classList.toggle('open');
    }
  }

  // Close mobile menu on link click
  document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mobileNav');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  });



  // Desktop Dropdown Toggle for Touch Devices
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const parent = link.closest('.has-dropdown');
      
      if (!parent.classList.contains('active')) {
        // Prevent default navigation strictly to open the menu on the first tap
        e.preventDefault();
        
        // Close all other open dropdowns globally
        document.querySelectorAll('.has-dropdown').forEach(other => {
          other.classList.remove('active');
        });
        
        parent.classList.add('active');
      }
    });
  });

  // Explicitly close any open dropdowns when clicking anywhere outside it
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));



  // Setup inline onclick for Mobile Burger Menu
  const burgerBtn = document.getElementById('burger-btn');
  if (burgerBtn) burgerBtn.addEventListener('click', toggleMobileMenu);



  // Handle onerror for Logo image
  // FIXED: Used nextElementSibling instead of nextSibling to safely ignore whitespace nodes
  const logoImg = document.getElementById('logo-img');
  if (logoImg) {
    if (logoImg.complete && logoImg.naturalHeight === 0) {
      // Image already failed before JS loaded
      logoImg.style.display = 'none';
      if(logoImg.nextElementSibling) {
        logoImg.nextElementSibling.style.display = 'block';
      }
    } else {
      logoImg.addEventListener('error', function() {
        this.style.display = 'none';
        if(this.nextElementSibling) {
          this.nextElementSibling.style.display = 'block';
        }
      });
    }
  }

  // Handle onerror for Footer Logo image
  const footerLogo = document.getElementById('footer-logo');
  if (footerLogo) {
    if (footerLogo.complete && footerLogo.naturalHeight === 0) {
      footerLogo.style.display = 'none';
    } else {
      footerLogo.addEventListener('error', function() {
        this.style.display = 'none';
      });
    }
  }

});
