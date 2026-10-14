const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}))}
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();document.querySelectorAll('.nav-links a').forEach(a=>{if((a.getAttribute('href')||'').toLowerCase()===current)a.classList.add('active')});
// Scroll reveal: automatically animate key content on every page, including elements
// that did not have a reveal class in the original markup.
const revealTargets = '.hero-content, .page-hero .container, .trust-item, .stat, .section-head, .property-card, .service-card, .value-card, .process-item, .contact-card, .form-card, .timeline-item, .image-frame, .split > :not(.image-frame), .cta-band, .footer-grid > div';
document.querySelectorAll(revealTargets).forEach((el,index)=>{
  el.classList.add('reveal');
  // A small stagger makes groups feel polished without slowing the page down.
  const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(child=>child.matches(revealTargets) || child.classList.contains('reveal')) : [];
  const position = Math.max(0, siblings.indexOf(el));
  el.style.setProperty('--reveal-delay', `${Math.min(position * 90, 360)}ms`);
});
const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}),{threshold:0.12,rootMargin:'0px 0px -35px 0px'}) : null;
document.querySelectorAll('.reveal').forEach(el=>observer ? observer.observe(el) : el.classList.add('visible'));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const contactForm=document.querySelector('#contact-form');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(contactForm);const name=data.get('name')||'';const phone=data.get('phone')||'';const email=data.get('email')||'Not provided';const interest=data.get('interest')||'General enquiry';const message=data.get('message')||'';const body=`Hello Rishi Sharma,\n\nI am ${name}.\nPhone: ${phone}\nEmail: ${email}\nInterested in: ${interest}\n\nMessage: ${message}`;const url='https://wa.me/918800259758?text='+encodeURIComponent(body);window.open(url,'_blank','noopener,noreferrer');const note=document.querySelector('#form-note');if(note){note.style.display='block';note.textContent='WhatsApp is opening with your enquiry. Please press Send in WhatsApp to submit it.'}})}
const filters=document.querySelectorAll('[data-filter]');const cards=document.querySelectorAll('[data-type]');filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const type=button.dataset.filter;cards.forEach(card=>card.hidden=!(type==='all'||card.dataset.type===type))}));

// Scroll progress indicator and a smooth back-to-top control on every page.
const progressTrack=document.createElement('div');
progressTrack.className='scroll-progress';
progressTrack.setAttribute('aria-hidden','true');
progressTrack.innerHTML='<span></span>';
document.body.prepend(progressTrack);
const progressFill=progressTrack.querySelector('span');
const backToTop=document.createElement('button');
backToTop.className='back-to-top';
backToTop.type='button';
backToTop.setAttribute('aria-label','Back to top');
backToTop.setAttribute('title','Back to top');
backToTop.innerHTML='↑';
document.body.append(backToTop);
let scrollTicking=false;
function updateScrollEffects(){
  const scrollable=document.documentElement.scrollHeight-window.innerHeight;
  const progress=scrollable>0?(window.scrollY/scrollable)*100:0;
  progressFill.style.width=`${Math.min(100,Math.max(0,progress))}%`;
  backToTop.classList.toggle('show',window.scrollY>420);
  scrollTicking=false;
}
window.addEventListener('scroll',()=>{
  if(!scrollTicking){window.requestAnimationFrame(updateScrollEffects);scrollTicking=true;}
},{passive:true});
window.addEventListener('resize',updateScrollEffects,{passive:true});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
updateScrollEffects();
