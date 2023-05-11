var keys = document.getElementsByClassName("keys");
var res = document.getElementById('res-container1');
var res2 = document.getElementById('res-container2');
var operand1 = "";
var operand2 = "";
var operator="";
var flag=0;

for(var key of keys)
{
    // console.log(key.className);
    key.addEventListener('click',function(){
        // console.log(this.className);
        if(this.className=="keys")
        {
            res.innerHTML+=this.innerHTML;
        }
        else{
            if(this.className=="keys operator lastLine" || this.className=="keys operator")
            {
                operand1 = res.innerHTML;
                operator=this.innerHTML;
                res.innerHTML="";
            }
            else if(this.getAttribute("data-value")=="clear")
            {
                operand1="";
                operand2="";
                operator="";
                res.innerHTML="";
                res2.innerHTML="";
            }
            else if(this.getAttribute("data-value")=="negate")
            {
                res.innerHTML= '-' + res.innerHTML;
            }
            else if(this.getAttribute("data-value")=="=")
            {
                operand2=res.innerHTML;
                res.innerHTML = operand1 + " "+ operator+" " + operand2;
                res2.innerHTML =  eval(operand1 + operator + operand2);
            }
        }
    });
}
function resDisplay(element){
    res.innerHTML = element;
}