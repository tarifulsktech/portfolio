const slides=document.querySelectorAll('.slide');
const dotsBox=document.getElementById('dots');
let index=0,timer;

/* DOTS */
slides.forEach((_,i)=>{
  const d=document.createElement('span');
  if(i===0)d.classList.add('active');
  dotsBox.appendChild(d);
});
const dots=dotsBox.querySelectorAll('span');

function animateProgress(slide){
  const bar=slide.querySelector('.progress span');
  bar.style.width='0';
  setTimeout(()=>bar.style.width=bar.dataset.progress,200);
}

function show(i){
  slides.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  animateProgress(slides[i]);
}

function next(){index=(index+1)%slides.length;show(index)}
function prev(){index=(index-1+slides.length)%slides.length;show(index)}

document.getElementById('next').onclick=next;
document.getElementById('prev').onclick=prev;

/* CLICK ACTIVATE */
slides.forEach((slide,i)=>{
  slide.addEventListener('click',()=>{
    index=i;
    show(index);
  });
});

/* AUTO */
function play(){timer=setInterval(next,5000)}
function stop(){clearInterval(timer)}
document.getElementById('slider').onmouseenter=stop;
document.getElementById('slider').onmouseleave=play;
play();

/* KEYBOARD */
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')next();
  if(e.key==='ArrowLeft')prev();
});

/* THEME */
document.getElementById('themeToggle').onclick=()=>{
  document.body.classList.toggle('light');
};
