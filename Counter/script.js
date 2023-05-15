let current = document.querySelector(".first");
let next = document.querySelector(".next");
let limit;
let count=1;
let countNext = 1;
function startCounter(){
    if(count!=limit)
    {
        interval = setInterval(animate,1000);
    }
    
    
    
}
function animate(){
    next.classList.add("animate");
    limit = document.getElementById("duration").value;
    if(count==limit)
    {
        clearInterval(interval);
    }
    setTimeout(function(){
        next.classList.remove("animate");
        current.innerHTML=count;
        count+=1;
        next.innerHTML=count;
        
    },500);
}


   
