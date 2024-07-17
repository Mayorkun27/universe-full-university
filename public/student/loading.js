// Add a delay function
function delay(milliseconds) {
     return new Promise(resolve => setTimeout(resolve, milliseconds));
}

document.addEventListener("DOMContentLoaded", function () {
     const images = document.querySelectorAll("img[data-src]");
     const content = document.getElementById("content");

     const observer = new IntersectionObserver(
          (entries, observer) => {
               entries.forEach(entry => {
                    if (entry.isIntersecting) {
                         const img = entry.target;
                         const src = img.getAttribute("data-src");

                         img.setAttribute("src", src);
                         img.removeAttribute("data-src");
                         observer.unobserve(img);
                    }
               });
          },
          { threshold: 0.5 }
     );

     images.forEach(img => {
          observer.observe(img);
     });

     async function showContent() {
          content.classList.remove("hidden");
          await delay(500);
     }

     async function initializeWebsite() {
          function getToken() {
               return localStorage.getItem('token');
          }
         function getRole() {
               return localStorage.getItem('role');
          }
         function checkToken() {
               const token = getToken();
               if (!token) {
                    window.location.href = '../login.html';
               }
          }
          function checkRole() {
               const role = getRole();
               if (role != 0) {
                    window.location.href = '../login.html';
                }
          }
          checkToken();
          checkRole();
          document.getElementById("loading").style.display = "flex";
          await delay(5000);
          document.getElementById("loading").style.display = "none";
          await showContent();
          
     }

     window.addEventListener("load", initializeWebsite);
});