// ==========================================================================
// HOMES PAGE LOGIC (homes.js)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRODUCT TAB FILTER
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  const allPanels = document.querySelectorAll('.detail-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active block & set current to active
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');

      // Hide all open panels to reset state cleanly
      allPanels.forEach(panel => {
        panel.classList.remove('open');
        panel.style.display = 'none';
      });
      document.querySelectorAll('.btn-view-details').forEach(b => b.textContent = 'View Details');

      // Filter logic with smooth transitions
      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (target === 'all' || cat === target) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // 2. DETAIL PANEL TOGGLE
  const detailBtns = document.querySelectorAll('.btn-view-details');
  
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.product-card');
      const panelId = card.getAttribute('data-panel');
      const panel = document.getElementById(panelId);
      
      const isOpen = panel.classList.contains('open');
      
      // Close all panels first
      allPanels.forEach(p => {
        if (p.classList.contains('open')) {
           p.classList.remove('open');
           setTimeout(() => p.style.display = 'none', 600);
        }
      });
      detailBtns.forEach(b => b.textContent = 'View Details');
      
      // If it wasn't open, strictly open only the clicked one
      if (!isOpen) {
        panel.style.display = 'block';
        setTimeout(() => {
          panel.classList.add('open');
          btn.textContent = 'Hide Details';
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 10);
      }
    });
  });

  // CLOSE BUTTON IN PANELS
  document.querySelectorAll('.panel-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const panel = closeBtn.closest('.detail-panel');
      panel.classList.remove('open');
      setTimeout(() => panel.style.display = 'none', 600);
      
      // reset the corresponding trigger button
      const panelId = panel.id;
      const relatedCard = document.querySelector(`.product-card[data-panel="${panelId}"]`);
      if (relatedCard) {
        relatedCard.querySelector('.btn-view-details').textContent = 'View Details';
      }
    });
  });

  // 3. IMAGE LIGHTBOX
  // Create Lightbox DOM injection dynamically
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <img src="" alt="Enlarged presentation" class="lightbox-img">
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  
  document.querySelectorAll('.gallery-img, .gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });

  // 4. QUOTE BUTTON PRE-FILL
  const quoteBtns = document.querySelectorAll('.btn-quote-prefill');
  const formSelect = document.getElementById('homesProductSelect');

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product');
      if (formSelect && productName) {
         // Force set product category inside the multi dropdown
         for(let i = 0; i < formSelect.options.length; i++) {
           if(formSelect.options[i].text === productName || formSelect.options[i].value === productName) {
              formSelect.selectedIndex = i;
              break;
           }
         }
      }
      // NOTE: native href="#contact" handles standard scrolling down automatically!
    });
  });

  // HOMES FORM SUBMIT OVERRIDE (Static Success Response)
  const homesForm = document.getElementById('homesForm');
  if (homesForm) {
    homesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      homesForm.style.display = 'none';
      const successMsg = document.getElementById('homesFormSuccess');
      if (successMsg) successMsg.style.display = 'block';
    });
  }

  // 5. HOMES FAQ ACCORDION (Specific to Homes Page Implementation Scope)
  const faqItems = document.querySelectorAll('.homes-faq .faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    question.addEventListener('click', () => {
      // Hide all other active elements
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle the triggered node
      item.classList.toggle('active');
      const isExpanded = item.classList.contains('active');
      question.setAttribute('aria-expanded', isExpanded);
    });
  });

  // 6. SCROLL ANIMATIONS EXTENSION (fade-up visibility observers)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing immediately upon activation 
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
