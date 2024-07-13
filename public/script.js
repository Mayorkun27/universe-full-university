const testimonials = {
    student1: {
        name: "Jasper Abdul-Malik",
        testimonial: "This school has provided me with the best education and opportunities.",
        rating: 5
    },
    student2: {
        name: "Faridat Abdul-Wahab",
        testimonial: "The teachers are very supportive and the environment is great for learning.",
        rating: 5
    },
    student3: {
        name: "Henry Hart",
        testimonial: "I have made lifelong friends and learned so much during my time here.",
        rating: 5
    },
    student4: {
        name: "Scott Mccall",
        testimonial: "The extracurricular activities are amazing and help develop all-round skills.",
        rating: 5
    },
    student5: {
        name: "Charloette Argent",
        testimonial: "The extracurricular activities are amazing and help develop all-round skills.",
        rating: 5
    },
    student6: {
        name: "Ray Stilinski",
        testimonial: "The extracurricular activities are amazing and help develop all-round skills.",
        rating: 5
    },
    student7: {
        name: "Bumpy Kennedy",
        testimonial: "The extracurricular activities are amazing and help develop all-round skills.",
        rating: 5
    },
    student8: {
        name: "Allison Bieber",
        testimonial: "The extracurricular activities are amazing and help develop all-round skills.",
        rating: 5
    }
};

function showTestimonial(student) {
    const studentData = testimonials[student];
    document.getElementById("studentName").innerHTML = studentData.name + " - Student";
    document.getElementById("studentTestimonial").innerHTML = studentData.testimonial;

    const ratingContainer = document.getElementById('studentRating');
    ratingContainer.innerHTML = ""; // Clear previous rating

    for (let i = 0; i < studentData.rating; i++) {
        const star = document.createElement('i');
        star.className = 'ti ti-star-filled';
        ratingContainer.appendChild(star);
    }

    const images = document.querySelectorAll('.testimgs img');
    images.forEach(img => {
        img.classList.remove('selected');
    });
    document.getElementById(student).classList.add('selected');
};

showTestimonial("student1");
