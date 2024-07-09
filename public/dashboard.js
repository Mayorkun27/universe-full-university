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

const current = window.location.href;

const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
     elem.addEventListener("click", function () {
          const hrefLinkClick = elem.href;

          allLinks.forEach((link) => {
               if (link.href == hrefLinkClick) {
                    link.classList.add("active");
               } else {
                    link.classList.remove("active");
               }
          });
     });
});