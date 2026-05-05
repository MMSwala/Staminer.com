 function switchTab(id, btn) {
    document.querySelectorAll('.policy-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleCard(header) {
    const body = header.nextElementSibling;
    const toggle = header.querySelector('.card-toggle');
    const isOpen = body.style.display === 'none';
    body.style.display = isOpen ? 'block' : 'none';
    toggle.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(-90deg)';
  }