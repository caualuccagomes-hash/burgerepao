document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
const mobile=matchMedia('(max-width:760px)');
toggle.hidden=false;
function closeMenu(returnFocus=false){toggle.setAttribute('aria-expanded','false');toggle.querySelector('.menu-label').textContent='Menu';nav.hidden=mobile.matches;if(returnFocus)toggle.focus();}
function syncMenu(){closeMenu();}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.menu-label').textContent=open?'Fechar':'Menu';nav.hidden=!open;if(open)nav.querySelector('a').focus();});
nav.addEventListener('click',e=>{if(e.target.closest('a')&&mobile.matches){closeMenu();const target=document.querySelector(e.target.closest('a').hash);if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(mobile.matches&&!e.target.closest('.header'))closeMenu();});
document.querySelector('.header').addEventListener('focusout',()=>{requestAnimationFrame(()=>{if(mobile.matches&&!document.querySelector('.header').contains(document.activeElement))closeMenu();});});
mobile.addEventListener('change',syncMenu);syncMenu();
// Conteúdo continua visível sem JS, sem observer ou com movimento reduzido.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}

// Galeria nativa: Escape, foco modal e retorno ao botão providos por <dialog>.
const photoDialog=document.querySelector('.photo-dialog');
const photos=[
  {src:'assets/foto-burgers.webp',alt:'Hambúrgueres e bebida com a logo Burger e Pão, em imagem fornecida para o site.'},
  {src:'assets/foto-mesa.webp',alt:'Lanche à mesa enquanto uma bebida é servida em uma taça, em imagem fornecida para o site.'}
];
let currentPhoto=0;
let photoTrigger;
function renderPhoto(){const photo=photos[currentPhoto];const image=photoDialog.querySelector('.photo-expanded');image.src=photo.src;image.alt=photo.alt;photoDialog.querySelector('.photo-counter').textContent=`${currentPhoto+1} / ${photos.length}`;}
document.querySelectorAll('.photo-open').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();photoTrigger=button;currentPhoto=Number(button.dataset.photo);renderPhoto();photoDialog.showModal();}));
photoDialog.querySelector('.photo-close').addEventListener('click',()=>photoDialog.close());
photoDialog.querySelector('.photo-prev').addEventListener('click',()=>{currentPhoto=(currentPhoto+photos.length-1)%photos.length;renderPhoto();});
photoDialog.querySelector('.photo-next').addEventListener('click',()=>{currentPhoto=(currentPhoto+1)%photos.length;renderPhoto();});
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();currentPhoto=(currentPhoto+(event.key==='ArrowRight'?1:photos.length-1))%photos.length;renderPhoto();}});
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const bounds=photoDialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)photoDialog.close();}});
photoDialog.addEventListener('close',()=>photoTrigger?.focus({preventScroll:true}));

