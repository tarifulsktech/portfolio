// REVEAL ANIMATION
const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", ()=>{
  cards.forEach(card=>{
    const top = card.getBoundingClientRect().top;
    if(top < window.innerHeight - 80){
      card.classList.add("show");
    }
  });
});

// DETAILS & CASE STUDY TEXT
function openDetails(project){
  alert(project.toUpperCase() + " PROJECT DETAILS\n\nThis project demonstrates real-world problem solving with clean architecture and secure implementation.");
}

function openCase(project){
  alert(project.toUpperCase() + " CASE STUDY\n\nProblem → Solution → Technology → Outcome\n(Explain in viva easily)");
}
