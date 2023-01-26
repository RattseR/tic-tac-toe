let winningCombination = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let counter = 1;

const pickIcon = document.getElementsByClassName('pick_mark_inner');
console.log(pickIcon);
for (let i=0; i<pickIcon.length; i++){
    pickIcon[i].addEventListener('mouseover', () => {
         if(!pickIcon[i].classList.contains('active')){
             pickIcon[i].style.backgroundColor = 'rgba(168, 191, 201, 0.05)';
             
         }
   })

   pickIcon[i].addEventListener('mouseout', () => {
        if(!pickIcon[i].classList.contains('active')){
            pickIcon[i].style.backgroundColor = '#1A2A33';
            
        }

   })

   pickIcon[i].addEventListener('click', (event)=>{
    pickIcon[i].style.backgroundColor = '#A8BFC9';
    pickIcon[i].classList.add('active');
    let tictacmarks = document.querySelectorAll('.pick_mark_inner');
    for(let j=0; j<tictacmarks.length; j++) {
         if(pickIcon[i].getAttribute('id')!=tictacmarks[j].getAttribute('id')){
            tictacmarks[j].classList.remove("active");
            tictacmarks[j].style.backgroundColor = '#1A2A33';
        }
    }
  })
}
