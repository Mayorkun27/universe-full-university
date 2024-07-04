let apiUrl = "/api/v1/auth/users";
let datalist = document.querySelector('.datalist');
document.addEventListener('DOMContentLoaded', function() {
     // Fetch data and populate the table
     axios.get(apiUrl)
     .then((response) => {
          let data = response.data;
          console.log(data)
          data.forEach(student => {
               let row = document.createElement('tr');
               row.innerHTML = `
                    <td><img src="${student.photo}" width="50px" height="50px"></td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.email}</td>
                    <td>${student.matricNumber}</td>
                    <td>${student.studyType}</td>
                    <td>${student.programType}</td>
                    <td>${new Date(student.birthDate).toLocaleDateString()}</td>
                    <td>${student.admissionYear}</td>
               `;
               row.addEventListener('click', () => showStudentDetails(student));
               datalist.appendChild(row);
          });
     })
     .catch((error) => {
          console.log(error);
     });
});

// Function to expel (delete) a student
function expelStudent(student) {
     let deleteUrl = `${apiUrl}/${student._id}`; // Ensure _id is correct
 
     console.log("Delete URL:", deleteUrl); // Log the URL
 
     if (confirm(`Are you sure you want to Expel ${student.firstName} ${student.lastName}`)) {
          axios.delete(deleteUrl)
          .then((response) => {
               alert('Student expelled successfully!');
               location.reload();
          })
          .catch((error) => {
                    console.error("Error expelling student:", error);
               }) 
          }
     }
 
 // Adjust the showStudentDetails function to remove the old event listener
 function showStudentDetails(student) {
     // Populate modal with student details
     document.getElementById('studentFullname').textContent = `${student.firstName} ${student.lastName}`;
     document.getElementById('studentPhoneNumber').textContent = student.phoneNum;
     document.getElementById('studentEmailAddress').textContent = student.email;
     document.getElementById('studentGender').textContent = student.genderType;
     document.getElementById('studentMaritalStatus').textContent = student.maritalStatus;
     document.getElementById('studentReligion').textContent = student.religionType;
     document.getElementById('studentContactAddress').textContent = student.address;
     document.getElementById('studentLocalGovt').textContent = student.lgovOrigin;
     document.getElementById('studentStateOfOrigin').textContent = student.stateOrigin;
     document.getElementById('studentNationality').textContent = student.nationality;
     document.getElementById('kinName').textContent = student.kinName;
     document.getElementById('kinRelationship').textContent = student.kinRela;
     document.getElementById('kinOccupation').textContent = student.kinOccup;
     document.getElementById('kinAddress').textContent = student.kinAddress;
     document.getElementById('kinPhone').textContent = student.kinTel;
     document.getElementById('kinEmail').textContent = student.kinEmail;
     document.getElementById('matricNumber').textContent = student.matricNumber;
     document.getElementById('faculty').textContent = student.studyType;
     document.getElementById('admissionYear').textContent = student.admissionYear;
     document.getElementById('programType').textContent = student.programType;
     document.getElementById('studentbirthDate').textContent = new Date(student.birthDate).toLocaleDateString();
     document.getElementById('studentPhoto').src = student.photo;
 
     // Remove any existing event listener for the expel button
     let expelButton = document.getElementById('expel');
     let newExpelButton = expelButton.cloneNode(true);
     expelButton.parentNode.replaceChild(newExpelButton, expelButton);
     
     // Add new event listener for the expel button
     newExpelButton.addEventListener('click', () => expelStudent(student));
 
     // Show the modal
     let modal = new bootstrap.Modal(document.getElementById('studentDetailsModal'));
     modal.show();
 }
  

// Search functionality
let searchInput = document.querySelector('#inputs');
let tableBody = document.querySelector('.datalist');
let tableRows = tableBody.getElementsByTagName('tr');

searchInput.addEventListener('input', displayResults);

function displayResults() {
     let searchTerm = searchInput.value.toLowerCase();
     for (let row of tableRows) {
          let cells = row.getElementsByTagName('td');
          let match = false;
          for (let cell of cells) {
               if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    match = true;
                    break;
               }
          }
          row.style.display = match ? '' : 'none';
     }
}

// Filter functionality
let filterModal = document.querySelector("#filterModal");
// Faculty filter option fetch
const studyType = document.querySelector("#facultyFilter");
axios.get("/api/v1/faculty/allfaculty")
.then((response) => {
     let data = response.data.data;
     data.forEach(item => {
          let option = document.createElement("option");
          option.innerHTML = item.name;
          studyType.appendChild(option);
     });
})
.catch((error) => {
     console.error("Error fetching data:", error);
});
// close Button
document.querySelector(".btn-close").addEventListener("click", () => {
     let extended = filterModal.style.display === "none";
     filterModal.style.display = extended ? "none" : "block";
});
document.querySelector(".btnClose").addEventListener("click", () => {
     let extended = filterModal.style.display === "none";
     filterModal.style.display = extended ? "none" : "block";
});

// Filter functionality
document.querySelector('#applyFilters').addEventListener('click', () => {
     let facultyFilter = document.querySelector('#facultyFilter').value.toLowerCase();
     let admissionTypeFilter = document.querySelector('#admissionTypeFilter').value.toLowerCase();
     let yearFilter = document.querySelector('#yearFilter').value;

     let tableBody = document.querySelector('.datalist');
     let tableRows = tableBody.getElementsByTagName('tr');

     for (let row of tableRows) {
          let cells = row.getElementsByTagName('td');
          let faculty = cells[4].textContent.toLowerCase();
          let admissionType = cells[5].textContent.toLowerCase();
          let year = cells[7].textContent;

          let matchFaculty = facultyFilter === "" || faculty === facultyFilter;
          let matchAdmissionType = admissionTypeFilter === "" || admissionType === admissionTypeFilter;
          let matchYear = yearFilter === "" || year === yearFilter;

          row.style.display = matchFaculty && matchAdmissionType && matchYear ? '' : 'none';
     }
     // Close the modal after applying filters
     let filterModal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
     filterModal.hide();
});

// Refresh button functionality
document.querySelector('.refresh').addEventListener('click', () => {
     window.location.reload();
});