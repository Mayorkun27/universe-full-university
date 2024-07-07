const expand_btn = document.querySelector(".expand-btn");

let activeIndex;

expand_btn.addEventListener("click", ()=> {
     document.body.classList.toggle("collapsed");
     if(document.body.classList.contains("collapsed")){
          document.querySelector(".avatar_wrapper").style.display="none";
          document.querySelector(".sidebar_profill").style.display="flex";
     } else {
          document.querySelector(".avatar_wrapper").style.display="block";
          document.querySelector(".sidebar_profill").style.display="none";
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

document.addEventListener("DOMContentLoaded", async function() {
     document.querySelector(".sidebar_profill").style.display="none";
 
     try {
         const apiUrl = '/api/v1/auth/user';
         const token = localStorage.getItem("token");
         console.log("Retrieved Token: ", token);
 
         if (!token || token.split('.').length !== 3) {
             console.error("Invalid Token Format");
             // Handle invalid token (e.g., redirect to login page)
         } else {
             fetch(apiUrl, {
                 method: 'GET',
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 }
             })
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(data => {
                 console.log(data);
                 // Handle the fetched user data
                 const userName = data.user.name;
                 document.querySelector(".profileName").innerHTML = `${userName}`;
 
                 const email = data.user.email;
                 document.querySelector(".profileEmail").innerHTML = `${email}`;
 
                 const userRole = data.user.role;
                 console.log(userRole);
                 const isAdminDashboard = userRole === 1 && window.location.pathname === './admin';
                 if (isAdminDashboard) return;
                 const nextPage = userRole === 1 ? './admin' : './studentdash.html';
                 window.location.href = nextPage;
             })
             .catch(error => {
                 console.error('Fetch error:', error);
             });
         }
     } catch (error) {
         console.log(error.message);
     }       
 }); 
// <!-- Lazy Loader -->
 function delay(milliseconds) {
     return new Promise((resolve) => setTimeout(resolve, milliseconds));
 }
 document.addEventListener('DOMContentLoaded', function(){
     async function showContent() {
         content.classList.remove('hidden');
         await delay(1000);
     }

     async function initializeWebsite() {
         document.getElementById('loader').style.display = 'flex';
         await delay(1000);
         document.getElementById('loader').style.display = 'none';
         await showContent();
     }

     window.addEventListener("load", initializeWebsite);
 })