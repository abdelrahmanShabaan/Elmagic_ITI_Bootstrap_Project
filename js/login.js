// * Variables بمسك كل حاجة عايزها 
var entername = document.getElementById("Name");
var enteremail = document.getElementById("email");
var enterpassword = document.getElementById("pass");
var welcomeTitle = document.getElementById("welcome");
var users = JSON.parse(localStorage.getItem("users")) ;
var loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
var accountExistMsg= document.getElementById('accountExistMsg')
// بعمل arr يشيل داتا ف localStorage
console.log(users)
if(localStorage.getItem("users") == null)
{
    users = [];
}
else
{
    users = JSON.parse(localStorage.getItem("users"));
}
// start create
function create() {
  // 1) بمسك القيم اللي داخله في input 
  // بخزنهم جوا arr بضيف جواه القيم كلها 
  var value = {
    pname: entername.value,
    pemail: enteremail.value,
    ppass: enterpassword.value,
   };
// بعمل شرط لو ال Validition تمام , exict مرجع false
if(userInputsValidation()==true  && isExist() == false){
    // هعمل ل data جوا متغير اللي عملته فوق 

  users.push(value);  
// وبخزنها جوا localStorage
  localStorage.setItem("users", JSON.stringify(users));
  clear()
  location.replace('signin.html')

  return true;
}


}
//end create


// start userInputsValidation
// func بتتاكد ان كل validation تمام 
function userInputsValidation()
{
    usernameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (usernameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
}
// end userInputsValidation



// start clear
// دورها بتفضي كل input من value اللي مكتوبه
function clear() {
  entername.value = "";
  enteremail.value = "";
  enterpassword.value = "";

  return true;
}
//end clear


// start usernameValidation
function usernameValidation()
{
  // مسكت p  اللي عامله ف html
    var usernameAlert = document.getElementById("usernameAlert");
// هنا لازم يبدا ب3 حروف ع الاقل 
    let regex = /^[A-Z a-z]{3,10}$/   
    if( regex.test(entername.value) == true && entername.value != "")
    {
      // هنا شرط لو كل حاجة تمام خلي input تبقي valid ومتظهرش p اللي بتعرض خطأ
        entername.classList.add("is-valid");
        entername.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        // لو مش تمام خليها invalid و خلي p تبقي d-block يعني اظهرها 
        entername.classList.add("is-invalid");
        entername.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");

        return false
    }
}
// end usernameValidation


//  start userPasswordValidation
function userPasswordValidation()
{
  // نفس اللي عملته ف name 
    let regex = /^.{5,15}$/;
    const userPasswordAlert = document.getElementById("userPasswordAlert");

    if( regex.test(enterpassword.value) == true && enterpassword.value != "")
    {
        enterpassword.classList.add("is-valid");
       enterpassword.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
       enterpassword.classList.add("is-invalid");
        enterpassword.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false
    }
}
//  end userPasswordValidation

// start  userEmailValidation
function userEmailValidation()
{
    // نفس اللي عملته ف name 

    const userEmailAlert = document.getElementById("userEmailAlert");

    let regex = /@[A-Z a-z]{5,10}(\.com)$/;
    if( regex.test(enteremail.value) == true && enteremail.value != "")
    {
        enteremail.classList.add("is-valid");
       enteremail.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
      enteremail.classList.add("is-invalid");
        enteremail.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false
    }
}
// end  userEmailValidation


// start isExist
function isExist()
{
  // بمسك p اللي عاملها ف html ل exist
    let accountExistMsg = document.getElementById("accountExistMsg");
    
    for(let i = 0; i < users.length; i++)
    {
    // فكرتها بعمل loop علي users لو الاسم اللي داخلك او email  موجودين متقبلهمش 

        if(users[i].pname.toLowerCase() == entername.value.toLowerCase() || users[i].pemail.toLowerCase() == enteremail.value.toLowerCase() )
        {
// اعرض p  اللي ف html  اللي بتقول انهم موجودين وخلي input is invalid
            accountExistMsg.classList.replace("d-none", "d-block");
            enteremail.classList.remove("is-valid");
            enterpassword.classList.remove("is-valid");
            enteremail.classList.add("is-invalid");
            enterpassword.classList.add("is-invalid");
            entername.classList.add("is-invalid");
            entername.classList.add("is-invalid");
            return true
        }
      }
      // لو مش موجودين رجع false
    return false
}

// end isExist

// start login

function login() {
  for (let i =0; i < users.length; i++) {
  
 
  // فكرتها بعمل loop علي users لو الايميل و الباسورد موجودين افتح صفحة home واقبلهم 

      if(enteremail.value==users[i].pemail && enterpassword.value==users[i].ppass  ){
        localStorage.setItem("loggedInUser", JSON.stringify(users[i]));
        if (enteremail.value === "admin@gmail.com" && enterpassword.value === "admin")
        window.open("crud.html",target="_self");
    else  {
        window.open("index.html",target="_self");
    }
      }else{
let loginAlert = document.getElementById('loginAlert')
loginAlert.classList.replace("d-none", "d-block");

               
               
      }
      // لو مش موجودين اعرض ده

      
      
    }
}

// end login


//start home

// فكرتها لو login تمام اعرض welcome + الاسم اللي موجود عندك للمستخدم ده
document.addEventListener("DOMContentLoaded", function (e) {


if (login) {
   welcomeTitle.innerHTML = "Welcome " + loggedIn.pname;
 }
});
// end home

// start log
// بتاعة button logout
function log(){
  location.replace('./signin.html')
}
//  end log


 


