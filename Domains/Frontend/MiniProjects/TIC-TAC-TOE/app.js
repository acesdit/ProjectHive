let box=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgame=document.querySelector("#btn");
let msgCon=document.querySelector(".msg-container");
let msg=document.querySelector("#winner");
let main=document.querySelector("main");

let turnO=true;

const win=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turnO=true
    enableBoxes();
    msgCon.classList.add("hide")
}

const enableBoxes=()=>{
    for (let i of box){
        i.disabled=false;
        i.innerHTML="";
        i.classList.remove("x", "o");
    }
}

box.forEach((box)=>{
    box.addEventListener("click",function(){
        if(turnO===true){
            box.classList.add("o");
            box.innerHTML="O";
            turnO=false;
        }else{
            box.classList.add("x");
            box.innerHTML="X";
            turnO=true;
        }
        box.disabled=true;

        checkWinner();
    })
})

const disableBoxes=()=>{
    box.forEach((box)=>{
        box.disabled=true;
    })
}

const showwinner=(winner)=>{
    msg.innerHTML=`Player ${winner} is winner !`;
    msgCon.classList.remove("hide")
    disableBoxes();
}


const checkWinner =()=>{
    let filledBoxes = 0;
    let winnerFound = false;
    for (let i of win)
    {
        let val1=box[i[0]].innerHTML;
        let val2=box[i[1]].innerHTML;
        let val3=box[i[2]].innerHTML;
        if (val1!="" && val2!="" && val3!="")
        {
            if(val1===val2 && val2===val3)
            {
                document.querySelector("h1").innerHTML=`Player ${val1} wins !`;
                showwinner(val1)
                winnerFound = true;
                break;
            }
        }
    }

    box.forEach((box) => {
        if (box.innerHTML !== "") {
            filledBoxes++;
        }
    });    

    if (filledBoxes === 9 && !winnerFound) {
        document.querySelector("h1").innerHTML = "It's a draw!";
        msg.innerHTML = "It's a draw!";
        msgCon.classList.remove("hide");
    }
};


newgame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame)