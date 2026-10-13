
/* Important Notes — independent toggle */
document.addEventListener("click", (event) => {
  const button = event.target.closest(".notes");
  if (!button) return;

  const contentId = button.getAttribute("aria-controls");
  const content = contentId ? document.getElementById(contentId) : null;
  if (!content) return;

  const willOpen = content.hidden;
  content.hidden = !willOpen;
  button.classList.toggle("open", willOpen);
  button.setAttribute("aria-expanded", String(willOpen));
});

const setupDetails=(button,content)=>{
  if(!button||!content)return;
  button.addEventListener("click",()=>{
    content.classList.toggle("open");
    button.classList.toggle("open");
  });
};

const detailButtons=document.querySelectorAll(".tx-details");
detailButtons.forEach(button=>{
  const content=button.nextElementSibling;
  setupDetails(button,content);
});


document.querySelectorAll("form").forEach(f=>{
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const x=[...f.querySelectorAll("input")].find(i=>!i.value.trim());
    if(x){x.focus();return;}
    alert("Login details are ready to continue.");
  });
});

document.querySelectorAll(".tx-meta button").forEach(button=>{
  button.addEventListener("click",async()=>{
    try{
      await navigator.clipboard.writeText("BP15Q53UC9WOEI3");
    }catch(e){}
  });
});
