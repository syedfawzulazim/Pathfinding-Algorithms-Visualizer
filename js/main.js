const liMain = document.querySelectorAll('.dropdown-link');
const dropDownMenu = document.querySelectorAll('.dropdown-menu');

/* 
Click Events on Nav Elements
*/

liMain.forEach(element => {
    element.addEventListener('click', (event) =>{
        dropDownMenu.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        });
    })
});

liMain.forEach(element => {
    element.addEventListener('click', (event) =>{
           event.currentTarget.nextElementSibling.classList.toggle('active')
           
})
})

/* 
Click Event on Window Object to hide Nav Element
*/

window.onclick = (event) => {
    if(!event.target.matches('.dropdown-link')){
       for (let i = 0; i < dropDownMenu.length; i++) {
           const element = dropDownMenu[i];
           if (element.classList.contains('active')) {
               element.classList.remove('active');
               
           }
           
       }
    }
}

/* 
Select Algorithms, Mazes and Speed
*/ 

let selectedAlgo = document.getElementById('span_algo');
let divAlgo =document.querySelector('.selecteditems .row .algo');

let selectedMaze = document.getElementById('span_maze');
let divMaze =document.querySelector('.selecteditems .row .maze');

let selectedSpeed = document.getElementById('span_speed');
let divSpeed =document.querySelector('.selecteditems .row .speed');

dropDownMenu.forEach(element => {
   if(element.classList.contains('algo')){
    element.onclick = (event) => {
                selectedAlgo.textContent = event.target.textContent;
                divAlgo.style.backgroundColor = 'rgba(46, 103, 153, 0.9)'
            }
   }
   else if(element.classList.contains('maze')){
    element.onclick = (event) => {
        selectedMaze.textContent = event.target.textContent;
        divMaze.style.backgroundColor = 'rgba(46, 103, 153, 0.9)'
    }
   }
   else if (element.classList.contains('speed')) {
    element.onclick = (event) => {
        selectedSpeed.textContent = event.target.textContent;
        divSpeed.style.backgroundColor = 'rgba(46, 103, 153, 0.9)'

    }
   }
});