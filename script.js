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


//creating popup window


let ximagehover = document.createElement('img');
ximagehover.src = 'assets/icon-x-outline.svg';
let oimagehover = document.createElement('img');
oimagehover.src = 'assets/icon-o-outline.svg';
let popupouter = document.createElement('div');
popupouter.classList.add('popup_outer');
let popupmain = document.createElement('div');
popupmain.classList.add('popup_main');
let resultoutput = document.createElement('p');
resultoutput.classList.add('result_output');
let winner = document.createElement('div');
winner.setAttribute('class','winner');
let winnerimage = document.createElement('img');
winnerimage.src='assets/icon-o.svg';
let winnerparagraph = document.createElement('p');
winnerparagraph.setAttribute('class','winner_paragraph')
winnerparagraph.innerHTML= 'TAKES THE ROUND';

let nextgame = document.createElement('div');
nextgame.setAttribute('class', 'next_game');
let quitgame = document.createElement('button');
quitgame.setAttribute('class','quit_game');
quitgame.setAttribute('id','quit-game');
quitgame.innerHTML="QUIT";
let nextround = document.createElement('button');
nextround.setAttribute('class','next_round');
nextround.setAttribute('id','next-round');
nextround.innerHTML="NEXT ROUND";
popupouter.appendChild(popupmain);
popupmain.appendChild(resultoutput);
popupmain.appendChild(winner);
winner.appendChild(winnerimage);
winner.appendChild(winnerparagraph);
popupmain.appendChild(nextgame);
nextgame.appendChild(quitgame);
nextgame.appendChild(nextround);
let body = document.getElementsByTagName('body');
body[0].appendChild(popupouter);

//creating popup window for restart button 

let popupouterRes = document.createElement('div');
popupouterRes.classList.add('popup_outer_res');
let popupmainRes = document.createElement('div');
popupmainRes.classList.add('popup_main_res');
let restartQuestion = document.createElement('p');
restartQuestion.classList.add('restart_question');
restartQuestion.innerHTML = 'RESTART GAME?';

let restartGame = document.createElement('div');
restartGame.setAttribute('class', 'restart_game');
let cancelRes = document.createElement('button');
cancelRes.setAttribute('class','cancel_res');
cancelRes.setAttribute('id','cancel-res');
cancelRes.innerHTML="NO, CANCEL";
let acceptRes = document.createElement('button');
acceptRes.setAttribute('class','accept_res');
acceptRes.setAttribute('id','accept-res');
acceptRes.innerHTML="YES, RESTART";

popupouterRes.appendChild(popupmainRes);
popupmainRes.appendChild(restartQuestion);
popupmainRes.appendChild(restartGame);
restartGame.append(cancelRes);
restartGame.appendChild(acceptRes);

body[0].appendChild(popupouterRes);

// setting event listener to new game vs player


function startplayergame(){
       document.querySelector('.current_turn').src = 'assets/icon-x.svg';
    
    if(!document.querySelector('.active')){
        alert('pick sign');
        document.getElementById('player').addEventListener('click', startplayergame,{once : true});
    } else {
        document.getElementById('game-box').style.display = 'flex';
        document.getElementById('main-container').style.display = 'none';
        if(document.querySelector('.active').id=="xmark"){
            document.getElementById('xindicator').innerHTML='X (P1)';
            document.getElementById('tieindicator').innerHTML='TIES';
            document.getElementById('oindicator').innerHTML='O (P2)';
            document.getElementById('xindicator').setAttribute('playerindicator','PLAYER 1');
            document.getElementById('oindicator').setAttribute('playerindicator','PLAYER 2');
           
        } else {
            document.getElementById('xindicator').innerHTML='X (P2)';
            document.getElementById('tieindicator').innerHTML='TIES';
            document.getElementById('oindicator').innerHTML='O (P1)';
            document.getElementById('xindicator').setAttribute('playerindicator','PLAYER 2');
            document.getElementById('oindicator').setAttribute('playerindicator','PLAYER 1');
            
        }
    }

   
    //setting event listener to each tic box
    let ticboxes = document.querySelectorAll('.tic_box');
    for (let element of ticboxes){
        element.addEventListener('mouseover', hoverImage);
    element.addEventListener('mouseout', mouseOutImage);
    element.removeEventListener('click', cputicboxclick);
        element.addEventListener('click', (ev)=>{
            
            if(counter%2==1){
               if(!ev.target.classList.contains('markedx')&&!ev.target.classList.contains('markedo')){ 
                ev.target.removeEventListener('mouseover',hoverImage);
                let ximage = document.createElement('img');
                ximage.src = 'assets/icon-x.svg';
                ev.target.appendChild(ximage);
                ev.target.classList.add('markedx');
                ev.target.style.backgroundImage = 'none';
                document.querySelector('.current_turn').src='assets/icon-o.svg';
                counter++;
               }
            } else {
                if(!ev.target.classList.contains('markedx')&&!ev.target.classList.contains('markedo')){
                ev.target.removeEventListener('mouseover',hoverImage);
                let oimage = document.createElement('img');
                oimage.src = 'assets/icon-o.svg';
                ev.target.appendChild(oimage);
                ev.target.style.backgroundImage = 'none';
                ev.target.classList.add('markedo');
                document.querySelector('.current_turn').src='assets/icon-x.svg';
                counter++;
              }  
            }
        
            if(counter>5){
                let currentticboxes = document.querySelectorAll('.tic_box');
                for (let element of winningCombination){
                     if((currentticboxes[element[0]-1].classList.contains('markedx')&&currentticboxes[element[1]-1].classList.contains('markedx')&&currentticboxes[element[2]-1].classList.contains('markedx'))){
                        currentticboxes[element[0]-1].style.backgroundColor='#31C3BD';
                        currentticboxes[element[1]-1].style.backgroundColor='#31C3BD';
                        currentticboxes[element[2]-1].style.backgroundColor='#31C3BD';
                        currentticboxes[element[0]-1].querySelector('img').classList.add('darksvg');
                        currentticboxes[element[1]-1].querySelector('img').classList.add('darksvg');
                        currentticboxes[element[2]-1].querySelector('img').classList.add('darksvg');
                        document.getElementById('xresult').innerHTML=parseInt(document.getElementById('xresult').innerHTML)+1;
                        resultoutput.style.display='block';
                        resultoutput.innerHTML = document.getElementById('xindicator').getAttribute('playerindicator')+' WINS!';
                        popupouter.style.display = 'flex';
                        winnerparagraph.style.color = '#31C3BD';
                        winnerparagraph.innerHTML = 'TAKES THE ROUND';
                        winnerimage.style.display = 'block';
                        winnerimage.src = currentticboxes[element[0]-1].querySelector('img').src;
                        counter=1;
                    } else if ((currentticboxes[element[0]-1].classList.contains('markedo')&&currentticboxes[element[1]-1].classList.contains('markedo')&&currentticboxes[element[2]-1].classList.contains('markedo'))){
                        currentticboxes[element[0]-1].style.backgroundColor='#F2B137';
                        currentticboxes[element[1]-1].style.backgroundColor='#F2B137';
                        currentticboxes[element[2]-1].style.backgroundColor='#F2B137';
                        currentticboxes[element[0]-1].querySelector('img').classList.add('darksvg');
                        currentticboxes[element[1]-1].querySelector('img').classList.add('darksvg');
                        currentticboxes[element[2]-1].querySelector('img').classList.add('darksvg');
                        document.getElementById('oresult').innerHTML=parseInt(document.getElementById('oresult').innerHTML)+1;
                        resultoutput.style.display='block';
                        resultoutput.innerHTML = document.getElementById('oindicator').getAttribute('playerindicator')+' WINS!';
                        popupouter.style.display = 'flex';
                        winnerparagraph.style.color = '#F2B137';
                        winnerparagraph.innerHTML = 'TAKES THE ROUND';
                        winnerimage.style.display = 'block';
                        winnerimage.src = currentticboxes[element[0]-1].querySelector('img').src;
                        counter=1;
                    } else {
                        if (counter==10) {
                            document.getElementById('tieresult').innerHTML=parseInt(document.getElementById('tieresult').innerHTML)+1;
                            popupouter.style.display = 'flex';
                            resultoutput.style.display='none';
                            winnerimage.style.display = 'none';
                            winnerparagraph.innerHTML = 'ROUND TIED';
                            counter=1;
                        }
                    }
                }
            }
        })
    }

}

document.getElementById('player').addEventListener ('click', startplayergame,{once : true});


//adding CPU button event listener
function checkwin(){
    
        let currentticboxes = document.querySelectorAll('.tic_box');
        for (let element of winningCombination){
             if((currentticboxes[element[0]-1].classList.contains('markedx')&&currentticboxes[element[1]-1].classList.contains('markedx')&&currentticboxes[element[2]-1].classList.contains('markedx'))){
             
                return true;
            } else if ((currentticboxes[element[0]-1].classList.contains('markedo')&&currentticboxes[element[1]-1].classList.contains('markedo')&&currentticboxes[element[2]-1].classList.contains('markedo'))){
            
                return true;
            } else  {
                return false;
            }
        }     
}
function wincpu(){
    if(counter>5){
        let currentticboxes = document.querySelectorAll('.tic_box');
        for (let element of winningCombination){
             if((currentticboxes[element[0]-1].classList.contains('markedx')&&currentticboxes[element[1]-1].classList.contains('markedx')&&currentticboxes[element[2]-1].classList.contains('markedx'))){
                currentticboxes[element[0]-1].style.backgroundColor='#31C3BD';
                currentticboxes[element[1]-1].style.backgroundColor='#31C3BD';
                currentticboxes[element[2]-1].style.backgroundColor='#31C3BD';
                currentticboxes[element[0]-1].querySelector('img').classList.add('darksvg');
                currentticboxes[element[1]-1].querySelector('img').classList.add('darksvg');
                currentticboxes[element[2]-1].querySelector('img').classList.add('darksvg');
                document.getElementById('xresult').innerHTML=parseInt(document.getElementById('xresult').innerHTML)+1;
                resultoutput.style.display='block';

                if(document.getElementById('xindicator').getAttribute('playerindicator')=="PLAYER 1"){
                    resultoutput.innerHTML = 'YOU WIN!';
                } else {
                    resultoutput.innerHTML = 'OH NO, YOU LOST...'; 
                }   

                popupouter.style.display = 'flex';
                winnerparagraph.style.color = '#31C3BD';
                winnerparagraph.innerHTML = 'TAKES THE ROUND';
                winnerimage.style.display = 'block';
                winnerimage.src = currentticboxes[element[0]-1].querySelector('img').src;
                counter=1;
            } else if ((currentticboxes[element[0]-1].classList.contains('markedo')&&currentticboxes[element[1]-1].classList.contains('markedo')&&currentticboxes[element[2]-1].classList.contains('markedo'))){
                currentticboxes[element[0]-1].style.backgroundColor='#F2B137';
                currentticboxes[element[1]-1].style.backgroundColor='#F2B137';
                currentticboxes[element[2]-1].style.backgroundColor='#F2B137';
                currentticboxes[element[0]-1].querySelector('img').classList.add('darksvg');
                currentticboxes[element[1]-1].querySelector('img').classList.add('darksvg');
                currentticboxes[element[2]-1].querySelector('img').classList.add('darksvg');
                document.getElementById('oresult').innerHTML=parseInt(document.getElementById('oresult').innerHTML)+1;
                resultoutput.style.display='block';

                if(document.getElementById('oindicator').getAttribute('playerindicator')=="PLAYER 1"){
                    resultoutput.innerHTML ='YOU WIN!';
                } else {
                    resultoutput.innerHTML ='OH NO, YOU LOST...'
                }
                
                popupouter.style.display = 'flex';
                winnerparagraph.style.color = '#F2B137';
                winnerparagraph.innerHTML = 'TAKES THE ROUND';
                winnerimage.style.display = 'block';
                winnerimage.src = currentticboxes[element[0]-1].querySelector('img').src;
                counter=1;
            } else {
                if (counter==10) {
                    document.getElementById('tieresult').innerHTML=parseInt(document.getElementById('tieresult').innerHTML)+1;
                    popupouter.style.display = 'flex';
                    resultoutput.style.display='none';
                    winnerimage.style.display = 'none';
                    winnerparagraph.innerHTML = 'ROUND TIED';
                    counter=1;
                }
            }
        }
    }
}
function startcpugame(){
    if(!document.querySelector('.active')){
        alert('pick sign');
        document.getElementById('cpu').addEventListener('click', startcpugame,{once:true});
    } else {
        document.getElementById('game-box').style.display = 'flex';
        document.getElementById('main-container').style.display = 'none';
        if(document.querySelector('.active').id=="xmark"){
            document.getElementById('xindicator').innerHTML='X (P1)';
            document.getElementById('tieindicator').innerHTML='TIES';
            document.getElementById('oindicator').innerHTML='O (CPU)';
            document.getElementById('xindicator').setAttribute('playerindicator','PLAYER 1');
            document.getElementById('oindicator').setAttribute('playerindicator','PLAYER 2');
            document.querySelector('.current_turn').src='assets/icon-x.svg'
        } else {
            document.getElementById('xindicator').innerHTML='X (CPU)';
            document.getElementById('tieindicator').innerHTML='TIES';
            document.getElementById('oindicator').innerHTML='O (P1)';
            document.getElementById('xindicator').setAttribute('playerindicator','PLAYER 2');
            document.getElementById('oindicator').setAttribute('playerindicator','PLAYER 1');
            
        }
    }

 

    //setting event listener to each tic box for CPU
    let ticboxes = document.querySelectorAll('.tic_box');
    for (let element of ticboxes){
       
        element.addEventListener('mouseover', hoverImage);
        element.addEventListener('mouseout', mouseOutImage);
        if(document.getElementById('xindicator').getAttribute('playerindicator')=="PLAYER 1"){
            element.addEventListener('click',cputicboxclick,{once:true});
        } else {
            if(counter==1){
                let updatedticboxes = document.querySelectorAll('.tic_box');
                let untouchedticboxes=[];
                for  (let el of updatedticboxes){
                    if(!el.classList.contains('markedx')&&!el.classList.contains('markedo')){
                        untouchedticboxes.push(el.getAttribute('id'));
                       
                    }
                }
                if(counter<10){
                let randomIndex = parseInt((Math.random()*100)%untouchedticboxes.length);
                
                let randomID = untouchedticboxes[randomIndex];
                let randomticbox = document.getElementById(randomID);
                let newimage = document.createElement('img');
                newimage.src = 'assets/icon-x.svg';
                randomticbox.appendChild(newimage);
                randomticbox.classList.add('markedx');
                randomticbox.removeEventListener('mouseover',hoverImage);
                randomticbox.removeEventListener('click', cputicboxclick);
                randomticbox.removeEventListener('click', cpufromo);
                untouchedticboxes.splice(randomIndex,1);
                console.log(untouchedticboxes);
                
                counter++;
                document.querySelector('.current_turn').src = 'assets/icon-o.svg';
                }
                
            }
            if(!element.classList.contains('markedx')&&!element.classList.contains('markedo')){
            element.addEventListener('click', cpufromo,{once:true});
            }
            if(element.classList.contains('markedx')||element.classList.contains('markedo')){
                element.removeEventListener('mouseover',hoverImage);
                }
        }
    }
}

document.getElementById('cpu').addEventListener('click', startcpugame,{once:true});

//adding eventlistener to quit game

function quitGame() {
    counter = 1;
    let ticbox = document.querySelectorAll('.tic_box');
    for (let element of ticbox){
        if(element.classList.contains('markedx')||element.classList.contains('markedo')){
            element.style.backgroundColor = '#1F3641';
            element.style.backgroundImage = 'none';
            element.querySelector('img').remove();
            element.classList.remove('markedx');
            element.classList.remove('markedo');
            element.removeEventListener('click', cputicboxclick);
            element.removeEventListener('click', cpufromo);
        }
    }
    document.getElementById('cpu').addEventListener('click', startcpugame,{once:true});
    document.getElementById('player').addEventListener ('click', startplayergame,{once : true});
    document.getElementById('xresult').innerHTML='0';
    document.getElementById('oresult').innerHTML='0';
    document.getElementById('tieresult').innerHTML='0';
    document.getElementById('main-container').style.display='flex';
    let activeMark = document.querySelector('.active');
    activeMark.style.backgroundColor = '#1A2A33';
    activeMark.classList.remove('active');
    document.querySelector('.popup_outer').style.display='none';
    document.getElementById('game-box').style.display='none';
}

document.getElementById('quit-game').addEventListener('click',quitGame);

//adding next round event listener

function nextMatch(){
    counter = 1;
         document.querySelector('.current_turn').src = 'assets/icon-x.svg';
    
    let ticbox = document.querySelectorAll('.tic_box');
    
    for (let element of ticbox){
        
        if(element.classList.contains('markedx')||element.classList.contains('markedo')){
            if(document.getElementById('xindicator').innerHTML=='X (CPU)'||document.getElementById('oindicator').innerHTML=='O (CPU)'){
                if(document.getElementById('xindicator').getAttribute('playerindicator')=='PLAYER 1'){
                    element.addEventListener('click', cputicboxclick,{once:true});  
                } else {
                    element.addEventListener('click', cpufromo,{once:true});
                }  
            }
            element.addEventListener('mouseover',hoverImage);
            element.style.backgroundColor = '#1F3641';
            element.style.backgroundImage = 'none';
            element.querySelector('img').remove();
            element.classList.remove('markedx');
            element.classList.remove('markedo');
        }
    }
    if(document.getElementById('xindicator').innerHTML=='X (CPU)'||document.getElementById('oindicator').innerHTML=='O (CPU)'&&document.getElementById('oindicator').getAttribute('playerindicator')=='PLAYER 1'){
        
        let updatedticboxes = document.querySelectorAll('.tic_box');
                let untouchedticboxes=[];
                for  (let el of updatedticboxes){
                    if(!el.classList.contains('markedx')&&!el.classList.contains('markedo')){
                        untouchedticboxes.push(el.getAttribute('id'));
                       
                    }
                }
                if(counter<10){
                let randomIndex = parseInt((Math.random()*100)%untouchedticboxes.length);
                
                let randomID = untouchedticboxes[randomIndex];
                let randomticbox = document.getElementById(randomID);
                let newimage = document.createElement('img');
                newimage.src = 'assets/icon-x.svg';
                randomticbox.appendChild(newimage);
                randomticbox.classList.add('markedx');
                randomticbox.removeEventListener('mouseover',hoverImage);
                randomticbox.removeEventListener('click', cputicboxclick);
                randomticbox.removeEventListener('click', cpufromo);
                untouchedticboxes.splice(randomIndex,1);
                console.log(untouchedticboxes);
                
                counter++;
                document.querySelector('.current_turn').src = 'assets/icon-o.svg';
                }
                
    }
    document.querySelector('.popup_outer').style.display='none';
     
}

document.getElementById('next-round').addEventListener('click', nextMatch)

//adding mouseover on ticbox;

function hoverImage (event){
    
    
    if(!event.target.classList.contains('markedx')&&!event.target.classList.contains('markedo')){
        if(counter%2==1){
            
            event.target.style.backgroundImage = "url('assets/icon-x-outline.svg')";
        } else {
            event.target.style.backgroundImage = "url('assets/icon-o-outline.svg')";
        }
    }
}

function mouseOutImage (event) {
    if(!event.target.classList.contains('markedx')&&!event.target.classList.contains('markedo')){
        event.target.style.backgroundImage = "none";
    }
}

// function for cpu ticbox event

function cputicboxclick(ev){
            
   
        if(counter%2==1){
            if(!ev.target.classList.contains('markedx')&&!ev.target.classList.contains('markedo')){
            ev.target.removeEventListener('mouseover',hoverImage);
            let ximage = document.createElement('img');
            ximage.src = 'assets/icon-x.svg';
            ev.target.appendChild(ximage);
            ev.target.classList.add('markedx');
            document.querySelector('.current_turn').src='assets/icon-x.svg';

            counter++;
        }}
        wincpu();
        


        if(!checkwin()&&counter!=1){
        let updatedticboxes = document.querySelectorAll('.tic_box');
        let untouchedticboxes=[];
        for  (let el of updatedticboxes){
            if(!el.classList.contains('markedx')&&!el.classList.contains('markedo')){
                untouchedticboxes.push(el.getAttribute('id'));
               
            }
        }
        if(counter<10){
        let randomIndex = parseInt((Math.random()*100)%untouchedticboxes.length);
        
        let randomID = untouchedticboxes[randomIndex];
        let randomticbox = document.getElementById(randomID);
        let newimage = document.createElement('img');
        newimage.src = 'assets/icon-o.svg';
        randomticbox.appendChild(newimage);
        randomticbox.classList.add('markedo');
        randomticbox.removeEventListener('mouseover',hoverImage);
        randomticbox.removeEventListener('click', cpufromo);
        randomticbox.removeEventListener('click', cputicboxclick);
        untouchedticboxes.splice(randomIndex,1);
        console.log(untouchedticboxes);
        
        counter++;
        document.querySelector('.current_turn').src='assets/icon-x.svg';
        }
        wincpu();
    }
  } 

//eventlistener for cpufromo
function cpufromo(ev){
    if(counter%2==0){
        if(!ev.target.classList.contains('markedx')&&!ev.target.classList.contains('markedo')){
        ev.target.removeEventListener('mouseover',hoverImage);
        let ximage = document.createElement('img');
        ximage.src = 'assets/icon-o.svg';
        ev.target.appendChild(ximage);
        ev.target.style.backgroundImage='none';
        ev.target.classList.add('markedo');
        document.querySelector('.current_turn').src='assets/icon-o.svg';
        counter++;
    }}
    wincpu();
    if(counter%2==1){
        let updatedticboxes = document.querySelectorAll('.tic_box');
        let untouchedticboxes=[];
        for  (let el of updatedticboxes){
            if(!el.classList.contains('markedx')&&!el.classList.contains('markedo')){
                untouchedticboxes.push(el.getAttribute('id'));
               
            }
        }
        if(counter<10){
        let randomIndex = parseInt((Math.random()*100)%untouchedticboxes.length);
        
        let randomID = untouchedticboxes[randomIndex];
        let randomticbox = document.getElementById(randomID);
        let newimage = document.createElement('img');
        newimage.src = 'assets/icon-x.svg';
        randomticbox.appendChild(newimage);
        randomticbox.classList.add('markedx');
        randomticbox.removeEventListener('mouseover',hoverImage);
        randomticbox.removeEventListener('click', cpufromo);
        randomticbox.removeEventListener('click', cputicboxclick);
        untouchedticboxes.splice(randomIndex,1);
        console.log(untouchedticboxes);
        
        counter++;
        document.querySelector('.current_turn').src = 'assets/icon-o.svg';
        }
        
    }
    wincpu();
}


// adding restart game button eventlistener

function restartPopup(){
    document.querySelector('.popup_outer_res').style.display = 'flex';
}

document.getElementById('refresh_button').addEventListener('click',restartPopup);

//adding event listener to cancer restart button 

function cancelRestart(){
    document.querySelector('.popup_outer_res').style.display = 'none';
}

document.getElementById('cancel-res').addEventListener('click', cancelRestart);

//adding event listener to acceptrestart button