/* ===== HULkreate — Shared JavaScript ===== */

// ---- FAQ Accordion ----
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- Application Form Submit ----
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect form data
      const data = {
        fullName: document.getElementById('fullName')?.value || '',
        instagram: document.getElementById('instagram')?.value || '',
        followers: document.getElementById('followers')?.value || '',
        niche: document.getElementById('niche')?.value || '',
        topPost: document.getElementById('topPost')?.value || '',
        submittedAt: new Date().toISOString()
      };

      // Store in sessionStorage so "View Submission" can show it
      sessionStorage.setItem('hulkreate_application', JSON.stringify(data));

      // Navigate to received page
      window.location.href = 'received.html';
    });
  }

  // ---- View Submission (on received page) ----
  const viewBtn = document.getElementById('viewSubmissionBtn');
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const raw = sessionStorage.getItem('hulkreate_application');
      if (!raw) {
        alert('No submission data found. You may have navigated here directly.');
        return;
      }
      const data = JSON.parse(raw);
      const msg = [
        `👤  Name: ${data.fullName}`,
        `📸  Instagram: ${data.instagram}`,
        `👥  Followers: ${data.followers}`,
        `🎨  Niche: ${data.niche}`,
        `🔗  Top Post: ${data.topPost || '(not provided)'}`,
        `📅  Submitted: ${new Date(data.submittedAt).toLocaleString()}`
      ].join('\n');
      alert(msg);
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ---- Mobile Menu Toggle ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) {
    links.classList.toggle('mobile-open');
  }
}
