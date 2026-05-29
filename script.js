// Scroll-triggered reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Typing animation for the homepage demo
const typingEl = document.getElementById('typing');
if (typingEl) {
  const answer = `This week at school, the Senior Dinner is on Saturday, June 6 from 4:30–10 PM[P1]. The Leadership Fair runs Friday, June 5, where students can sign up for leadership roles for next year[P2]. Graduation rehearsal is Tuesday, June 9, with Graduation and Moving Up Day on Wednesday, June 10[P3].`;

  let i = 0;
  const startDelay = 1500;

  function type() {
    if (i < answer.length) {
      let char = answer[i];

      // Render [P1], [P2], etc. as pill spans
      if (char === '[') {
        const closing = answer.indexOf(']', i);
        if (closing > -1 && /^\[P\d+\]$/.test(answer.substring(i, closing + 1))) {
          const cite = answer.substring(i + 1, closing);
          typingEl.innerHTML += `<span class="demo-cite">${cite}</span>`;
          i = closing + 1;
          setTimeout(type, 30);
          return;
        }
      }

      typingEl.innerHTML += char;
      i++;
      const speed = char === ' ' ? 20 : char === '.' ? 80 : 18;
      setTimeout(type, speed + Math.random() * 12);
    }
  }

  setTimeout(type, startDelay);
}
