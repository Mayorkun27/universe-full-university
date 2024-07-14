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

     // Logout
 function getToken() {
     return localStorage.getItem('token');
     return localStorage.getItem('userId');
     return localStorage.getItem('msg');
 }

 function saveToken(token) {
     localStorage.setItem('token', token);
 }

 function logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('userId');
     localStorage.removeItem('msg');
     window.location.href = '/login.html';
 }

 function showAlertAndLogout(message) {
     alerting.innerHTML = `
         <div class="alert alert-danger d-flex align-items-center" role="alert">
             <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
                 <use xlink:href="#exclamation-triangle-fill"/>
             </svg>
             <div>
                 ${message}
             </div>
         </div>
     `;
     setTimeout(() => {
         logout();
     }, 10000); // Wait for 10 seconds before logging out
 }

 function checkToken() {
     const token = getToken();
     if (!token) {
         showAlertAndLogout('An error occurred submitting your request. Check your network connection');
         return;
     }

     const payload = JSON.parse(atob(token.split('.')[1]));
     const expiry = payload.exp * 1000;
     const now = Date.now();

     if (now > expiry) {
         showAlertAndLogout('Session expired. You will be logged out.');
     }
 }

  // Call fetchBlogs on page load
window.onload = () => {
     checkToken();
     setInterval(checkToken, 60 * 1000); // Check every minute
};