//working for 1 link 1 category
// window.addEventListener("load", function(e){
//     const checkboxes =document.querySelectorAll('input[type="checkbox"][data-category="security-1"]');
//     const navLink1 = document.getElementById('navlink1');
    
//     checkboxes.forEach((checkbox, index) => {
//       checkbox.addEventListener('click', () => {
//         if (checkbox.checked) {
//             navLink1.classList.add('answered');
//         } else {
//             navLink1.classList.remove('answered');
//         }
//       });
//     });
//     });


window.addEventListener("load", function(e){
    const navLinks = document.querySelectorAll('.nav-link-checkbox');
    navLinks.forEach((navLink) => {
      const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-category="${navLink.dataset.category}"]`);
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
          if (checkbox.checked) {
            navLink.classList.add('answered');
          } else {
            navLink.classList.remove('answered');
          }
        });
      });
    });
  });


// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// const navLinks = document.querySelectorAll('.nav-link');

// checkboxes.forEach((checkbox, index) => {
//   checkbox.addEventListener('click', () => {
//     if (checkbox.checked) {
//       navLinks[index].classList.add('answered');
//     } else {
//       navLinks[index].classList.remove('answered');
//     }
//   });
// });

//working for 1 checkbox
// window.addEventListener("load", function(e){
// const navLink1 = document.getElementById('navlink1');
// const checkbox1 = document.getElementById('checkbox1');
// console.log(checkbox1);

// checkbox1.addEventListener('click', () => {
//     if (checkbox1.checked) {
//       navLink1.classList.add('answered');
//     } else {
//       navLink1.classList.remove('answered');
//     }
//   });
// });

//working for all checkbox 1 nav
// window.addEventListener("load", function(e){
//     const navLinks = document.querySelectorAll('.nav-link-checkbox');

// navLinks.forEach((navLink) => {
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   console.log(checkboxes);
//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('click', () => {
//       if (checkbox.checked) {
//         navLink.classList.add('answered');
//       } else {
//         navLink.classList.remove('answered');
//       }
//     });
//   });
// });
// });





    




