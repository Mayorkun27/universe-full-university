const expand_btn = document.querySelector(".expand-btn");

let activeIndex;

expand_btn.addEventListener("click", ()=> {
     document.body.classList.toggle("collapsed");
     if(document.body.classList.contains("collapsed")){
          document.querySelector(".avatar_wrapper").style.display="none";
     } else {
          document.querySelector(".avatar_wrapper").style.display="block";
     }
});