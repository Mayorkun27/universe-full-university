const backgrounds = [
    { 
        content: "Text1",
        image: "images/img12.png",
        name: "Alice"  
    },
    { 
        content: "Text2",
        image: "images/img13.png",
        name: "Summer"  
    },
    { 
        content: "Text3",
        image: "images/img14.png",
        name: "Kate"  
    },
    { 
        content: "Text4",
        image: "images/img15.png",
        name: "Brown"  
    },
    { 
        content: "Text5",
        image: "images/img16.png",
        name: "Violet"  
    },
    { 
        content: "Text6",
        image: "images/img17.png",
        name: "Nathasha"  
    },
    { 
        content: "Text7",
        image: "images/img18.png",
        name: "Nelly"  
    },
    { 
        content: "Text8",
        image: "images/img19.png",
        name: "Allison"  
    }
];

let currentIndex = 0;

let testiText = document.querySelector(".testi-text");
let testiName = document.querySelector(".testi-name");
let testiImg = document.querySelectorAll(".testi-img");

function setNextBackground() {
    const currentBackground = backgrounds[currentIndex];
    testiText.innerHTML = currentBackground.content;
    testiName.innerHTML = currentBackground.name;
    // currentIndex = backgrounds.findIndex(item => item.category === currentBackground.next);
    currentIndex++;
    if (currentIndex === -1 || currentIndex >= backgrounds.length) {
        currentIndex = 0;
    }
}

testiImg.forEach(img => {
    img.addEventListener("click", setNextBackground, () => {
        img.classlist.add("testiimgsimgclicked");
    })
})

// document.addEventListener("DOMContentLoaded", () => {
// })
// setNextBackground();
// setInterval(setNextBackground, 1000);

// testiImg.forEach(imgs => {
//     imgs.addEventListener("click", (e) => {
//         e.preventDefault();
//         let inUse = imgs.src
//         console.log(inUse);
//         for (let i = 0; i < backgrounds.length; i++) {
//             const element = backgrounds[i].image;
//             console.log(element);
//         }
//         imgs.getElementsByTagName("img").classList.add("testiimgsimgclicked")
//         // console.log(backgrounds.name);
//     })
// })