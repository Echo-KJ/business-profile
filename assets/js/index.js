document.addEventListener('DOMContentLoaded', () => {

  // Hero Slider
  let current = 0;
  const total = document.querySelectorAll('.slide').length;
  const wrapper = document.getElementById('slidesWrapper');
  const dotsContainer = document.getElementById('heroDots');
  let autoTimer;

  // Build dots
  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'hero-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.onclick = () => goTo(i);
      dotsContainer.appendChild(d);
    }
  }

  function goTo(n) {
    current = (n + total) % total;
    if(wrapper) {
      wrapper.style.transform = `translateX(-${current * 100}%)`;
    }
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function moveSlide(dir) {
    goTo(current + dir);
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  if(total > 0) {
    goTo(0);
    window.addEventListener('load', () => {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    });
  }



  // FAQ
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

  // Form submit
  function submitForm(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if(form) form.style.display = 'none';
    if(success) success.style.display = 'block';
  }



  // Setup inline onclick for Hero Arrows
  const prevSlideBtn = document.getElementById('prev-slide-btn');
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => moveSlide(-1));

  const nextSlideBtn = document.getElementById('next-slide-btn');
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => moveSlide(1));



  // Setup inline onsubmit for Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', submitForm);

  // Setup inline onclick for FAQ items
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', function() {
      toggleFAQ(this);
    });
  });



});
