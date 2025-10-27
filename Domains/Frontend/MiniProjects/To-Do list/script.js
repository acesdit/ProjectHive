const inputbox=document.getElementById('input-box')
const list=document.getElementById('listitem')
const addbtn=document.querySelector('button');
addbtn.addEventListener('click',Addtask);
function Addtask()
{
    if(inputbox.value===''){
        alert("You must write something");
    }
    else{
        let li=document.createElement('li')
        li.textContent=inputbox.value;
        list.appendChild(li);
        let spann=document.createElement('span')
        spann.textContent="\u00d7";
    li.appendChild(spann);
        
        
    }
    inputbox.value="";
    savedata();
}
list.addEventListener('click',function(e){
    if(e.target.tagName==='LI'){
        e.target.classList.toggle("checked");
        savedata();
}
else if (e.target.tagName==='SPAN')
{
    e.target.parentElement.remove();
    savedata();
}


},false)
function savedata()
{
    localStorage.setItem("data",list.innerHTML);

}
//when there is a change it call the function savedata()
//now we want it show the data whenrver we open the website again
function show()
{
list.innerHTML=localStorage.getItem('data');


}
show();
