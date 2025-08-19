let boxex=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".res-btn");
let regame=document.querySelector(".msg-container");
let newbtn =document.querySelector(".new-game")
const msg=document.getElementById("message")
let turn0=true;
let count=0;
const winpattern=[

    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]


 const resetgame=()=>{                             // it is the cuntion to reset the game 
turn0=true;
count=0;
enaableboxex();
regame.classList.add("hide")
 }
boxex.forEach((box)=>{
box.addEventListener("click",()=>{

    if(turn0){
        box.innerText="0";
        turn0=false;
    }
    else{
        box.innerText="x";
        turn0=true;
    }
    box.disabled=true;
    count++;
    let iswinner=checkwinner();
    if(count===9 && !iswinner){
  gamedraw();
    }

})
})

 let gamedraw= (winner) => {                     // fucntion to check the draw of the person

   msg.innerText = `Game is Draw`;
   regame.classList.remove("hide")
      disableboxex();
}

let disableboxex =()=>{                          // this fucntion is used to disable the box if it clicked onece 
    for (let box of boxex){
        box.disabled=true;
    }
}
let enaableboxex =()=>{               //  this fucntion is to enable the box   if it is not used 
    for (let box of boxex){
        box.disabled=false;
        box.innerText="";
    }
}

  let showwinner= (winner) => {

   msg.innerText = `winner is ${winner}`;
   regame.classList.remove("hide")
      disableboxex();
}
const checkwinner= () =>{                         //fucntion is to check the winner  iterating throught the  all winn9ing patterns   
    for(let pattern of winpattern){
    let pos1val=boxex[pattern[0]].innerText;
     let pos2val=boxex[pattern[1]].innerText;
      let pos3val=boxex[pattern[2]].innerText;
    

      if(pos1val !="" &&pos2val !="" && pos3val!=""){
        if(pos1val===pos2val &&pos2val===pos3val){
            console.log("winner is ",pos1val)
               showwinner(pos1val);
               return true;
           
        }
       
        }
     
      }
      return false;
};

newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame)
