document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without jumping
        history.pushState(null, null, '#' + targetId);
      }
    });
  });

  // Enhanced form validation with inline error messages
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let isValid = true;

    // Validate name
    const nameInput = form.querySelector('#name');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate email
    const emailInput = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate message
    const messageInput = form.querySelector('#message');
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter your message.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      alert('Thank you for contacting Nexora! We\'ll get back to you shortly.');
      form.reset();
      clearAllErrors();
    }
  });

  function showError(input, message) {
    input.classList.add('is-invalid');
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      input.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = '';
    }
  }

  function clearAllErrors() {
    form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(div => (div.textContent = ''));
  }
});