document.querySelector('#date>input[type="date"]').removeAttribute('required');
let arr = document.querySelectorAll('.category-tag');
let del = document.getElementById("delete-anchor");
function categoryColor(category){
    console.log(category.innerText.toLowerCase());
    switch (category.innerText.toLowerCase()){
        case 'personal':
            return 'blue';
        case 'work':
            return 'purple';
        case 'home':
            return 'brown';
        case 'others':
            return 'orange';
        default:
            return null;
    }
}
for(let category of arr)
{
    let color = categoryColor(category);
    category.style.background = color;
}

del.addEventListener('click',(e)=>{
    let elementsToDelete = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    
    let str="";
    let i=1;
    for(let el of elementsToDelete)
    {
        str+='q'+i+'='+el.getAttribute('id')+'&';
        i++;
    }
    console.log(str);
    // console.log(del.getAttribute('href'));
    del.setAttribute('href','delete/?'+str);

})