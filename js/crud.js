// بمسك كل input ب id بتاعه 

var productName = document.getElementById('productName');
var productCategory = document.getElementById('productCategory')
var productPrice = document.getElementById('productPrice')
var productDesc = document.getElementById('productDesc')
var productphoto = document.getElementById('productImg')
var productquantity = document.getElementById('Stock Quantity')

var searchValue = document.getElementById('searchValue')
var addBtn = document.getElementById('addProduct');
// currentIndex عشان index يبقي global لكل اللي موجود 
var currentIndex= 0;
// start localStorage
// هعمل شرط لو allproduct فاضي اعرضلي arr بتاعي فاضي لو في داتا اعرضلي داتا اللي جواه 
if(localStorage.getItem('allproduct')== null){
 // productContainer arr بخزن جواه كل product الجديدة من خلال push عشان ميعملوش override علي بعض 
  var productContainer=[]
}else{
  // JSON.parse بستخدمها عشان ارجع string ل json 
  var productContainer = JSON.parse(localStorage.getItem('allproduct'))

  display()
}
// end localStorage
// start  button update
addBtn.onclick=function(){
  if(validateProduct() == true && productName.value !='' && productCategory.value != '' && productDesc.value != '' && productPrice.value !='' ){
   
    if(addBtn.innerHTML == 'AddProduct'){
      createProduct()
    }else{
      updateProdct()
    }
  
    localStorage.setItem('allproduct',JSON.stringify(productContainer))
    clearForm()
    display()
  }else{
    alert('not Valid')
  }

}
console.log(productContainer)
// end button update

// start create
function createProduct(){

var product ={
  pname:productName.value,
  price : productPrice.value,
  category:productCategory.value,
  desc:productDesc.value,
quintity:productquantity.value,
image:productphoto.files[0].name,
}
productContainer.push(product)
}
// end create
// start getProductInfo
// ببعتلها index وبساوي value اللي جواها ب value اللي موجودة ف index ده 
function getProductInfo(index){ 
  currentIndex =index;
  productName.value= productContainer[index].pname;
  productPrice.value=productContainer[index].price;
  productCategory.value=productContainer[index].category;
  productDesc.value=productContainer[index].desc;
  productquantity.value=productContainer[index].quintity;
  // productphoto.files[0].name=productContainer[index].files[0].name;
  addBtn.innerHTML ='updateProduct'
  }
  // end getProductInfo
// start update
  function updateProdct(){
    // اول حاجة هعرف القيم من جديد 
    var product ={
      pname:productName.value,
      price : productPrice.value,
      category:productCategory.value,
      desc:productDesc.value,
      quintity:productquantity.value,
      image:productphoto.files[0].name

   

    }
    // هنا عشان يعرض اللي موجود بعد  ما اتعمل عليه update
  productContainer[currentIndex] = product;
  addBtn.innerHTML ='AddProduct';
 
  }
  

// start clear
function clearForm(){
  productName.value='';
  productPrice.value='';
  productCategory.value='';
  productDesc.value='';
  productquantity.value='';
productphoto.value='';



}
// end clear 
//  start display
function display(){
  // 1) عملت متغير خزنت فيه الداتا اللي هتجيلي
 
  var trs='';
   // 2) هعمل loop  علي  productContainer اللي شايل داتا بتاعتي 
  for(var i =0 ; i<productContainer.length;i++){
    // 3) هضيف جواه اي داتا جديدة تجيلي في table اللي عامله 
    trs +=`<tr>
         
    <td>${i+1}</td>
    <td>${productContainer[i].pname}</td>
    <td>${productContainer[i].category}</td>
    <td> <img src="./images/${
      productContainer[i].image}" alt="..." width="30px" height="30px" /> </td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].quintity}</td>


    <td>${productContainer[i].desc}</td>


    <td>
      <button class="btn btn-info" onclick="getProductInfo(${i})" ><i class="fa fa-solid fa-edit"></i></button>
    </td>
    <td>
 
      <button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`
  // 1) بحط on click في button بتاعة delete 
  }
  // 4) هغير table في html هخليه يعرض مكانه متغير بتاعي اللي مخزن جواه داتا trs
  document.getElementById('tableBody').innerHTML=trs
}
//  end display

// start delete
// 
function  delet(index){
console.log(index)
// 2) بستخدم splice يمسح من productContainer علي حسب index ويحذف 1 بس 
productContainer.splice(index,1)
console.log(productContainer)
// JSON.stringify عشان يحول json الي string وبعمل الخطوة دي عشان لما اعمل delete يسمع معايا ف local storage
localStorage.setItem('allproduct',JSON.stringify(productContainer))
// 3) بعمل call تاني ل display عشان يعرض اخر تحديث معايا  
display()
}
// end delete
// start search
function searchProdct(){
  // 1) هاخد نفس خطوات اللي ف display وهحطها عندي 

var trs='';
for(var i =0 ; i<productContainer.length;i++){
  // 2) هعمل شرط في productContainer لو موجود value اللي في input search اعرض معايا trs  وبستخدم include عشان يبحث
  // toLowerCase عشان يحول اللي داتا كله ل smail سواء المستخدم دخله باي طريقة يظهر معايا 
  if(productContainer[i].pname.toLowerCase().includes(searchValue.value.toLowerCase()) 
  || productContainer[i].price.toLowerCase().includes(searchValue.value.toLowerCase()) 
|| productContainer[i].category.toLowerCase().includes(searchValue.value.toLowerCase()) 
|| productContainer[i].desc.toLowerCase().includes(searchValue.value.toLowerCase()))
  {
    trs +=`<tr>
    <td>${i+1}</td>
    <td>${productContainer[i].pname}</td>
    <td>${productContainer[i].category}</td>
    <td> <img src="./images/${productContainer[i].image}" alt="..." width="30px" height="30px" /> </td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].quintity}</td>


    <td>${productContainer[i].desc}</td>
   
    <td>
      <button class="btn btn-info" onclick="getProductInfo(${i})"><i class="fa fa-solid fa-edit"></i></button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`
  }

}
document.getElementById('tableBody').innerHTML=trs
}
// end search 


 

function validateProduct(){
 var pname =productName.value;
var price = productPrice.value;
 var category=productCategory.value;
  var pnameRegex = /^[A-Z a-z]{1,10}$/;
  var priceRegex= /[0-9]{1,5}$/;
  var categoryRegex =/^[A-Z a-z]{3,10}$/;

  

  if( categoryRegex.test(category) == true && pnameRegex.test(pname) == true && priceRegex.test(price) == true   ){
     return true;
  }else{
    return false;
  }
}

