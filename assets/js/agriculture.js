document.addEventListener('DOMContentLoaded', () => {

  // Agriculture Tabs Filtering
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.product-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.target;
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      // Hide any open detail panels on filter
      document.querySelectorAll('.detail-panel').forEach(p => p.classList.remove('active'));
    });
  });

  // Product Details Expand/Collapse
  const buttons = document.querySelectorAll('.btn-view-details');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // prevent card click
      const card = btn.closest('.product-card');
      const targetId = card.dataset.panel;
      const targetPanel = document.getElementById(targetId);
      
      // Close all other panels
      document.querySelectorAll('.detail-panel').forEach(p => {
        if (p !== targetPanel) {
          p.classList.remove('active');
        }
      });

      if (targetPanel) {
        targetPanel.classList.toggle('active');
        if (targetPanel.classList.contains('active')) {
          targetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // Detail panel close buttons
  document.querySelectorAll('.panel-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.detail-panel').classList.remove('active');
    });
  });

  // Quote button pre-fill logic
  const quoteBtns = document.querySelectorAll('.btn-quote-prefill');
  const formSelect = document.getElementById('fproduct');
  
  quoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (formSelect) {
        // Find product name
        const card = btn.closest('.product-card') || btn.closest('.detail-panel');
        let productName = btn.dataset.productName;
        if (!productName && card) {
           const pNameEl = card.querySelector('.product-name') || document.querySelector(`.product-card[data-panel="${card.id}"] .product-name`);
           if (pNameEl) productName = pNameEl.textContent;
        }

        if (productName) {
           // check if option exists, update select
           let optionExists = false;
           for(let i = 0; i < formSelect.options.length; i++) {
             if(formSelect.options[i].value === productName || formSelect.options[i].text === productName) {
                formSelect.selectedIndex = i;
                optionExists = true;
                break;
             }
           }
        }
      }
    });
  });

  // Agriculture FAQ
  function toggleFAQ(el) {
    const ans = el.nextElementSibling;
    const isOpen = ans.classList.contains('show');
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('show'));
    document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
    if (!isOpen) {
      ans.classList.add('show');
      el.classList.add('open');
    }
  }

  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', function() {
      toggleFAQ(this);
    });
  });

  // Agriculture Form Submit
  const agForm = document.getElementById('agForm');
  if (agForm) {
    agForm.addEventListener('submit', (e) => {
      e.preventDefault();
      agForm.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if(success) success.style.display = 'block';
    });
  }
});
