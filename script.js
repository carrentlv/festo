document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

/* Referencia képek: kattintásra nagy nézet */
const galleryLinks = Array.from(document.querySelectorAll('.gallery-link'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

let currentImage = 0;

function showImage(index){
  currentImage = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[currentImage];
  const img = link.querySelector('img');

  lightboxImage.src = link.href;
  lightboxImage.alt = img ? img.alt : `Referencia ${currentImage + 1}`;
  lightboxCounter.textContent = `${currentImage + 1} / ${galleryLinks.length}`;
}

function openLightbox(index){
  showImage(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox(){
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
}

galleryLinks.forEach((link,index)=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    openLightbox(index);
  });
});

closeButton.addEventListener('click',closeLightbox);

prevButton.addEventListener('click',e=>{
  e.stopPropagation();
  showImage(currentImage - 1);
});

nextButton.addEventListener('click',e=>{
  e.stopPropagation();
  showImage(currentImage + 1);
});

lightbox.addEventListener('click',e=>{
  if(e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('is-open')) return;

  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') showImage(currentImage - 1);
  if(e.key === 'ArrowRight') showImage(currentImage + 1);
});
