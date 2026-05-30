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
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Hero answer typing demo
const typingEl = document.getElementById('typing');
const sourcesRow = document.getElementById('sourcesRow');

if (typingEl) {
  const answer = `This week, the Senior Dinner is on Saturday, June 6 from 4:30–10 PM[P1]. The Leadership Fair runs Friday, June 5 — students can sign up for leadership roles for next year[P2]. Graduation rehearsal follows Tuesday, June 9, with Graduation and Moving Up Day on Wednesday, June 10[P3].`;

  let i = 0;
  const startDelay = 1400;

  function type() {
    if (i < answer.length) {
      const char = answer[i];

      // Render [P1], [P2], etc. as inline pills
      if (char === '[') {
        const closing = answer.indexOf(']', i);
        if (closing > -1 && /^\[P\d+\]$/.test(answer.substring(i, closing + 1))) {
          const cite = answer.substring(i + 1, closing);
          typingEl.innerHTML += `<span class="cite-pill">${cite}</span>`;
          i = closing + 1;
          setTimeout(type, 40);
          return;
        }
      }

      typingEl.innerHTML += char;
      i++;
      const speed = char === ' ' ? 18 : char === '.' ? 90 : char === ',' ? 60 : 16;
      setTimeout(type, speed + Math.random() * 14);
    } else {
      // Done typing — hide cursor and reveal sources
      typingEl.classList.add('done');
      setTimeout(() => {
        if (sourcesRow) sourcesRow.classList.add('visible');
      }, 200);
    }
  }

  setTimeout(type, startDelay);
}
