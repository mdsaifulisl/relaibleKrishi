document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 1;
  let interval;

  // first & last
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  slidesContainer.append(firstClone);
  slidesContainer.prepend(lastClone);
  
  const allSlides = document.querySelectorAll('.slide');
  const total = allSlides.length;

  slidesContainer.style.transform = `translateX(-${current * 100}%)`;

  const goToSlide = (i) => {
    current = i;
    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  };

  const next = () => {
    if (current >= total - 1) return;
    current++;
    goToSlide(current);
  };

  const updateDots = () => {
    let dotIndex = (current - 1 + slides.length) % slides.length;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === dotIndex));
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i + 1));
  });

  slidesContainer.addEventListener('transitionend', () => {
    if (allSlides[current].id === 'first-clone') {
      slidesContainer.style.transition = 'none';
      current = 1;
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    }
    if (allSlides[current].id === 'last-clone') {
      slidesContainer.style.transition = 'none';
      current = total - 2;
      slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') goToSlide(current - 1);
  });

  const auto = () => {
    interval = setInterval(() => {
      if (current < total - 1) next();
      else clearInterval(interval); // stop after final round
    }, 3000);
  };

  auto();
  updateDots();




  const paragraphs = document.querySelectorAll('.blog-text');
  const maxLength = 500;

  paragraphs.forEach(p => {
    const originalText = p.textContent.trim();

    if (originalText.length > maxLength) {
      const truncated = originalText.substring(0, maxLength);

      const id = p.getAttribute('data-id');
      const readMoreLink = document.createElement('a');
      readMoreLink.href = `/blog/${id}`; 
      readMoreLink.textContent = ' more ';
      readMoreLink.classList.add('read-more');

      // innerHTML ব্যবহার করলে <a> সঠিকভাবে বসবে
      p.innerHTML = truncated + '... ';
      p.appendChild(readMoreLink);
    }
  });




  const disease = document.querySelectorAll('.disease-text');
  const daxLength = 100;

  disease.forEach(p => {
    const originalText = p.textContent.trim();

    if (originalText.length > daxLength) {
      const truncated = originalText.substring(0, daxLength);

      // innerHTML ব্যবহার করলে 
      p.innerHTML = truncated + '... ';
    }
  });


  const technology = document.querySelectorAll('.technology-text');
  const tLength = 100;

  technology.forEach(p => {
    const originalText = p.textContent.trim();

    if (originalText.length > tLength) {
      const truncated = originalText.substring(0, tLength);

      // innerHTML ব্যবহার করলে 
      p.innerHTML = truncated + '... ';
    }
  });






});



