document.querySelector('#date>input[type="date"]').removeAttribute('required');
const arr = document.querySelectorAll('.category-tag');
const del = document.getElementById("delete-anchor");


function categoryColor(category){
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
    let color = categoryColor(category);                                // category div's background color being added based on inner text (category name)
    category.style.background = color;
}

del.addEventListener('click',(e)=>{
    let elementsToDelete = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let str="";
    let i=1;
    for(let el of elementsToDelete)
    {
        str+='q'+i+'='+el.getAttribute('id')+'&';           //all checked elements id being concatinated as a single string which is later passed to the anchor tag's href attribute
        i++;
    }
    del.setAttribute('href','delete/?'+str);

})