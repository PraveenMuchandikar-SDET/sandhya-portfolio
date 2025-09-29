// Init AOS (scroll animations)
AOS.init({ duration: 700, once: true, offset: 80 });

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

// Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.ceil(target / 80);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString();
      }, 20);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
counters.forEach(c => counterObserver.observe(c));

// Particles background (tsParticles)
tsParticles.load("tsparticles", {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: ["#ffffff", "#a7c7ff"] },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: { default: "out" } },
    links: { enable: true, color: "#ffffff", distance: 120, opacity: 0.3, width: 1 }
  },
  interactivity: {
    detectsOn: "window",
    events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 120 }, push: { quantity: 3 } }
  }
});

// KPI mini chart (Chart.js)
const ctx = document.getElementById('kpiChart');
if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Baseline', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
      datasets: [{
        label: 'Error rate (lower is better)',
        data: [1.0, 0.8, 0.7, 0.6, 0.5],
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74,144,226,0.15)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: true } },
      scales: {
        y: { ticks: { callback: v => v + '%' } }
      }
    }
  });
}
