const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
// function toggleTheme() {
//   document.body.classList.toggle('dark-theme');
// }
// const totalTasks = 10;
// const completedTasks = 5;
// const progressPercent = (completedTasks / totalTasks) * 100;
// document.querySelector('.progress-bar').style.width = progressPercent + '%';

// const audio = new Audio('click.mp3');

// document.querySelectorAll('li').forEach(li => {
// liElement.addEventListener('click', () => {
//   // toggle class
//   liElement.classList.toggle('checked');
//   // play sound
//   audio.play();
// });
// });