const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[ data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBTN=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~!@#$%^&*()_-+={[}]|:;"<,>.?/';

console.log(allCheckBox);
console.log(generateBTN);

console.log(indicator)
let password="";
let passwordlength=10;
let checkcount=0;
handleSlider();

//ste strength circle color is grey
setIndicator("#ccc");

//console.log("1");

//set passwordLength
function handleSlider(){
  inputSlider.value=passwordlength;
  lengthDisplay.innerText=passwordlength;

  const min=inputSlider.min;
  const max=inputSlider.max;
  inputSlider.style.backgroundsize=((passwordlength-min)*100/(max-min))+"%100"
}


function setIndicator(color){
    indicator.style.background=color;

    //shadow

}


function getRndInteger(min,max){
  return Math.floor( Math.random()*(max-min))+min;  

}





function  generateRandomNumber(){
    return getRndInteger(0,9);
}



function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}


function generateuppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}




function generatesymbols(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);

}

console.log(generatesymbols());

function calcstrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hassym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked)  hasLower=true;
    if(numbersCheck.checked)  hasNum=true;
    if(symbolsCheck.checked)  hassym=true;

    if (hasUpper &&hasLower  &&(hasNum||hassym) && passwordlength>=8){
        setIndicator("#f0");
    }
    else if(
        (hasLower || hasupper)&&
        (hasNum || hassym) &&
        passwordlength>=6
    ) {set.Indicator("#ff0");
    }

    else {
        set.Indicator("#f00");
    }

   
}


 async function copyContent(){ 

    try{
        await  navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="copied";

    }

    catch(e){
        copyMsg.innerText="fail";

    }
    
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout (()=> {
        copyMsg.classList.remove("active");
    },2000);

   
}




function shufflepassword(array){
    //fisher yates method

    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
    
}



function handlecheckBoxchange(){
    checkcount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    });

    //specialcse
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleSlider();

    }
}


allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handlecheckBoxchange);
    
})


inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('onclick',()=>{
    if(passwordDisplay.value)
       copyContent();
})


generateBTN.addEventListener('click',()=>{

    //nine of the checkbox are selected

    if(checkcount<=0) return;

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleSlider();
    }

    //let's the jouney to find new password
    //remove previous password;

    password="";

    //let 's put the stuff mentioned by checkbox's

 /*   if(uppercaseCheck.checked)
    {
        password+=generateuppercase();
    }
    
    if(lowercaseCheck.checked)
    {
        password+=generateLowercase();
    }

    if(numbersCheck.checked)
    {
        password+=generateRandomNumber();
    }

    if(symbolsCheck.checked)
    {
        password+=generatesymbols();
    }*/


    let funcArr=[];

    if(uppercaseCheck.checked)
    {
        funcArr.push(generateuppercase);
    }
    
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowercase);
    }

    if(numbersCheck.checked)
    {
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked)
    {
        funcArr.push(generatesymbols);
    }


    //compulsory addition
     console.log(funcArr.length)

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    //remaining  addition

    for(let i=0;i<passwordlength-funcArr.length;i++){
        let randindex=getRndInteger(0,funcArr.length);
        console.log('randindex'+ randindex);
        password+=funcArr[randindex]();

    }

    //shuffle the pasword
    password=shufflepassword(Array.from(password));
    passwordDisplay.value=password;
    // calculate strength
    calcstrength();


})