let cart = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Trains',
        tag:'Train Toy',
        price: 10,
        inCart:0

    },
    {
        name: 'Boats',
        tag:'Boat Toy',
        price: 5,
        inCart:0

    },
    {
        name: 'Xylophones',
        tag:'Xylophone Toy',
        price: 10,
        inCart:0

    },
    {
        name: 'Cars',
        tag:'Car Toy',
        price: 10,
        inCart:0

    },
    {
        name: 'Alphabet Blocks',
        tag:'Alphabet Blocks Pack',
        price: 20,
        inCart:0

    },
    {
        name: 'Animals',
        tag:'Animals Pack',
        price: 30,
        inCart:0

    },
    {
        name: 'Keytags',
        tag:'Keytag',
        price: 5,
        inCart:0

    },
    {
        name: 'Abacus',
        tag:'One Abacus',
        price: 30,
        inCart:0

    },
    
];

for(let i=0; i < cart.length ; i ++){
    cart[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalAmount(products[i]);

    })
    

}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.nav-item  span').textContent = productNumbers;
        
    }
}
function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ){

        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.nav-item span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.nav-item span').textContent = 1;
    }
    setItems(product);
    

}
function setItems(product){
   let cartItems = localStorage.getItem('productsInCart');
   cartItems =JSON.parse(cartItems);
   
   if(cartItems != null){
    if(cartItems[product.tag] == undefined){
        cartItems = {
            ...cartItems,
            [product.tag]:product
        }
    }
    
    cartItems[product.tag].inCart += 1;
 
   }else {
        product.inCart = 1; 
        cartItems = {
        [product.tag]: product
   }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));

}
function totalAmount(product){
    // console.log("Product Price",product.price);
    let cartCost = localStorage.getItem('totalCost');
   

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    }else{
        localStorage.setItem("totalCost", product.price);

    }
    
}


function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productGrid = document.querySelector
    (".products");

    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productGrid){
        productGrid.innerHTML = '';
        Object.values(cartItems).map(item=>{
            productGrid.innerHTML += `
            <div class ="products-grid">
            <div class = "card">
            <div class= "card-body">
            
            <div class = "card-title">

            <h2 >  Product : ${item.name}</h2>
            </div>
            
            <div class = "price">
            <h5>Price : $${item.price}.00</h5>
            
            </div>
            <div class = "quantity">
            <h5>Quantity :
            
            <span>${item.inCart}</span>
            
            </div>
            <div class ="total">
            <h2> Total Cost :
            $${item.inCart * item.price}.00
            </h2>
            </div>
            </div>
            </div>
            

            `
            
        });
        productGrid.innerHTML += `
        <div class ="products-grid">
            <div class = "card">
            <div class= "total-amount"><h2>Total Amount  :  $${cartCost}.00<h2>
            
            </div>
            </div>
            </div>`

    }
    


}
onLoadCartNumbers();
displayCart();