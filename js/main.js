const liMain = document.querySelectorAll('.dropdown-link');
const dropDownMenu = document.querySelectorAll('.dropdown-menu');

liMain.forEach(element => {
    element.addEventListener('click', () =>{
        dropDownMenu.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        });
    })
});

liMain.forEach(element => {
    element.addEventListener('click', (event) =>{
       if(event.currentTarget.nextElementSibling.classList.contains('active')){
           event.currentTarget.nextElementSibling.classList.remove('active')
       }
       else{
           event.currentTarget.nextElementSibling.classList.add('active')
           
       }
    
})
})

window.onclick = (event) => {
    if(!event.target.matches('.dropdown-link')){
       for (let i = 0; i < dropDownMenu.length; i++) {
           const element = dropDownMenu[i];
           if (element.classList.contains('active')) {
               element.classList.remove('active')
           }
           
       }
    }
}