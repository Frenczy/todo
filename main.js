let today=new Date()
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayName = days[today.getDay()];
let todayDate = today.toLocaleDateString('hu')

let showToday=document.querySelector('h3[class="body__day"]')
let showDate=document.querySelector('h3[class="body__date"]')
showToday.textContent=dayName
showDate.textContent=todayDate

let plusButton = document.querySelector('button[class="plus"]')
let showButton = document.querySelector('span[class="show__complete"]')
let clearButton= document.querySelector('span[class="clear__all"]')
let tasks=document.querySelectorAll('div[class="tasks"]')
let trashbin=document.querySelectorAll('button[class="trashbin"]')
let toDoCount=0
let completeCount=0
let showAllCount=false
let pendingNo=document.querySelector('span[class="pending__no"]')
let completedNo=document.querySelector('span[class="completed__no"]')

let completedHeader=document.querySelector('div[class="completed__header"]')
let completedList=document.querySelector('div[class="completed__list"]')

let pendingParent=document.querySelector('div[class="pending__list"]')
let pc=pendingParent.children
let completedParent=document.querySelector('div[class="completed__list"]')
let cc=completedParent.children

let input=document.querySelector('input[type="text"]')
plusButton.addEventListener('click', function(){if (input.value==""){return} else {
    localStorage.setItem(pc.length, input.value); readInput(input.value); input.value=""; toDoCount+=1; pendingNo.textContent='You have '+ toDoCount +' pending items'; writeComplete()}})
//    
let writeComplete = function(){
    if (completeCount==0){
    completedNo.textContent='0%'}
    if (toDoCount==0){
    pendingNo.textContent='Time to chill! You have no ToDos.'
    completedNo.textContent='100%'}
    else completedNo.textContent=Math.round(completeCount/(completeCount+toDoCount)*100)+ '%'
    }


let trashdisp = function(i) {
    pc[i].addEventListener('mouseover', function(){pc[i].lastChild.style.opacity='1'})
    pc[i].addEventListener('mouseout', function(){pc[i].lastChild.style.opacity='0'})
    pc[i].children[1].onclick = function(){pc[i].style.display="none";
    toDoCount-=1;
    pendingNo.textContent='You have '+ toDoCount +' pending items'; writeComplete(); localStorage.removeItem(i)}
    pc[i].children[0].children[0].addEventListener('change', function(){pc[i].style.display="none";
    toDoCount-=1;
    pendingNo.textContent='You have '+ toDoCount +' pending items';
    cc[i].style.display="flex";
    localStorage.removeItem(i)
    // ticking in checkbox
    cc[i].children[0].children[0].checked=true;
    //disabling checkbox
    cc[i].children[0].children[0].disabled=true;
    completeCount+=1;
    writeComplete()
    })
    }


let readInput = function(iv){
    let szülő=document.createElement('div')
    szülő.classList="tasks"
    let gyerek1=document.createElement('div')
    gyerek1.classList="inner__task"
    let gyerek2=document.createElement('input')
    gyerek2.setAttribute('type','checkbox')
    gyerek2.setAttribute('name','checkbox')
    let gyerek3=document.createElement('span')
    gyerek3.setAttribute('class', 'taskText')
    gyerek1.appendChild(gyerek2)
    gyerek1.appendChild(gyerek3)
    szülő.appendChild(gyerek1)
    let gomb=document.createElement('button')
    gomb.setAttribute('class', 'trashbin')
    let ikon=document.createElement('i')
    ikon.setAttribute('class', "fa fa-trash")
    szülő.appendChild(gomb)
    gomb.appendChild(ikon)
    pendingParent.appendChild(szülő)
    gyerek3.textContent=iv    
    trashdisp(pc.length-1)
    // add to storage

    let cszülő=document.createElement('div')
    cszülő.classList="ctasks"
    let cgyerek1=document.createElement('div')
    cgyerek1.classList="cinner__task"
    let cgyerek2=document.createElement('input')
    cgyerek2.setAttribute('type','checkbox')
    let cgyerek3=document.createElement('span')
    cgyerek3.setAttribute('class', 'ctaskText')
    cgyerek1.appendChild(cgyerek2)
    cgyerek1.appendChild(cgyerek3)
    cszülő.appendChild(cgyerek1)
    completedParent.appendChild(cszülő)
    cgyerek3.textContent=iv    
}

let startCollect = function (){
    let ta = []
    for (let i=0; i<Object.values(localStorage).length; i+=1){
    ta.push(Object.values(localStorage)[i])}
    localStorage.clear()
    for (let j=0; j<ta.length; j+=1){
    localStorage.setItem(j, ta[j])
    readInput(ta[j]); toDoCount+=1; if(toDoCount==0){pendingNo.textContent='Time to chill! You have no ToDos.'} else {pendingNo.textContent='You have '+ toDoCount +' pending items'}}}
startCollect()

let clearAll = function(){
    pendingParent.innerHTML=""
    completedParent.innerHTML=""
    toDoCount=0
    completeCount=0
    pendingNo.textContent='Time to chill! You have no ToDos.'
    completedNo.textContent='0%'
    localStorage.clear()
    // remove from storage
    }

let showAll=function(){
    if(showAllCount==false){
    completedHeader.setAttribute('class', 'completed__header--on')
    completedList.setAttribute('class', 'completed__list--on')
    showButton.textContent="Hide Complete"
    showAllCount=true}
    else {
    completedHeader.setAttribute('class', 'completed__header')
    completedList.setAttribute('class', 'completed__list')
    showButton.textContent="Show Complete"
    showAllCount=false}
}
showButton.addEventListener('click', showAll)
clearButton.addEventListener('click', clearAll)

let removeClick = function(){
    for (i=0; i<pc.length; i+=1){
        pc[i].children[1].onclick=null 
    }}
