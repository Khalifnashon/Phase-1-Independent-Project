function renderOneFood(food){
    //Build movie
    let card = document.createElement('li')
    card.className = 'box-container'    
    card.innerHTML = `
        <div class ="box">
            <img src="${food.image}">
            <h3>${food.description}</h3>
            <div class="price">${food.price}<span>${food.span}</span></div>
            <a target = "_parent" rel = "noreferrer" class="btn">add to cart</a>
            
            
        </div>
        

    
    `
    // Add movie to the DOM
    document.getElementById('menu-list').appendChild(card)  
}



//fetch requests
//Get fetch for all animal resources
function getAllFood(){
    fetch('http://localhost:3000/foods')
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(foods => {
        console.log(foods)
        foods.forEach(food => renderOneFood(food))
    })

}


// Initial  Render
// Get Data and Render our movies on the DOM
function initialize(){
    
    getAllFood()
        
}
initialize()

// Navigating the navigation bar
// The Search icon
// And the cart container
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

// Creating the likes counter on click event
let likebtn1 = document.querySelector('#likebtn1')
let input1 = document.querySelector('#input1');

likebtn1.addEventListener('click', () => {
    // Check if the value is a valid number
    if (isNaN(parseInt(input1.value))) {
      // If not, set the value to 0
      input1.value = 0;
    }
    // Increment the value by 1
    input1.value = parseInt(input1.value) + 1;
    // Change the color of the value
    input1.style.color = "#ff0000";
});


let likebtn2 = document.querySelector('#likebtn2')
let input2 = document.querySelector('#input2');

likebtn2.addEventListener('click', () => {
    // Check if the value is a valid number
    if (isNaN(parseInt(input1.value))) {
      // If not, set the value to 0
      input2.value = 0;
    }
    // Increment the value by 1
    input2.value = parseInt(input2.value) + 1;
    // Change the color of the value
    input2.style.color = "#ff0000";
});


let likebtn3 = document.querySelector('#likebtn3')
let input3 = document.querySelector('#input3');

likebtn3.addEventListener('click', () => {
    // Check if the value is a valid number
    if (isNaN(parseInt(input1.value))) {
      // If not, set the value to 0
      input3.value = 0;
    }
    // Increment the value by 1
    input3.value = parseInt(input3.value) + 1;
    // Change the color of the value
    input3.style.color = "#ff0000";
});

// Going for the cart ride, tighten your belts
// Creating add to cart icon functionallity
// We will be able to see the items on the cart container when the cart icon is clicked
// on the products part
// We will use loadStorage so that the cart items and cart counter
// remain the same even after refreshing

let products = [
    {
        image:  "images/bucket1.jpg",
        tag: "Festive Bucket",
        price: 1366,
        inCart: 0
    },
    {
        image:  "images/buckeet2.jpg",
        tag: "12 piece skinless Chicken",
        price: 1259,
        inCart: 0
    },
    {
        image:  "images/chicken-burger-chips.jpg",
        tag: "festive burger",
        price: 1500,
        inCart: 0
    }



]


let carts = document.querySelectorAll("#cartbtn");
for (let i = 0; i < carts.length; i ++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// Tracking number of cart items
// we use localstorage

function onLoadCartNumbers (){
    let productNumbers = localStorage.getItem('cartNumbers');
    const cartBtn = document.getElementById('cart-btn');
    const span = cartBtn.querySelector('span');

    if (productNumbers){
        span.textContent = productNumbers;
    }
}


function cartNumbers(product) {
    const cartBtn = document.getElementById('cart-btn');
    const span = cartBtn.querySelector('span');
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {// checking if there already exists a number in local storage
        localStorage.setItem('cartNumbers', productNumbers + 1 );
        // updating number next to cart icon
        span.textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1) 
        // updating number next to cart icon
        span.textContent = 1;

    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));

}

// Adding up totalCost of cart Items
function totalCost(product) {
    // console.log("The product price is", product.price)
    let cartCost = localStorage.getItem("totalCost");

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

// Displaying on the cart the cart items
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".cart-items-container");

    console.log(cartItems);
    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-item">
                <span class="fas fa-times"></span>
                <img src="${item.image}">
                
                <div class="content">
                    <h3>${item.tag}</h3>
                    <div class="price">$${item.price}</div>
                </div>
            </div>
            
            `
        });
    }
    


    
}

onLoadCartNumbers();
displayCart();
















