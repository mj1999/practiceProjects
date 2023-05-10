var keys = document.getElementsByClassName("keys");
var res = document.getElementById('res-container');
var operand1 = "";
var operand2 = "";
var operator;
var flag=0;

for(var key of keys)
{
    // console.log(key.className);
    key.addEventListener('click',function(){
        // console.log(this.className);
        if(this.className=="keys clear")
        {
            res.innerHTML="";
            operand1="";
            operand2="";
            flag=0;
        }
        else if(flag==0 && this.className=="keys")
        {
            operand1 += this.innerHTML;
            res.innerHTML=operand1;
        }
        else if(this.getAttribute("data-value")=="negate"){
            console.log("negate");
            if(flag==0)
            {
                operand1 = "-"+operand1;
                res.innerHTML=operand1;
            }
            else
            {
                operand2 ="-"+operand2;
                res.innerHTML=operand2;
            }
        }
        else if(flag==0 && this.className=="keys operator" || this.className=="keys operator lastLine")
        {
            flag=1;
            operator=this.innerHTML;
            res.innerHTML="";

        }
        else if(flag==1 && this.className=="keys")
        {
            operand2 += this.innerHTML;
            res.innerHTML=operand2;
        }
        else if(flag==1 && this.getAttribute("data-value")=="=")
        {

            var result = eval(operand1 + operator + operand2);
            operand1=result;
            operand2="";
            res.innerHTML= result;
        }
    });
}
function resDisplay(element){
    res.innerHTML = element;
}