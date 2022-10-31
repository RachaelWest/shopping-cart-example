//DATA FROM products.js ACCESSED BY ADDING IT AS A SCRIPT LINK IN THE HTML TO MAKE IT GLOBALLY ACCESSIBLE. 
//THEN USE productsData VARIABLE IN THIS FILE TO ACCESS THE ARRAY OR PRODUCTS.

const productsContainer = document.getElementById("productsContainer")
const cartItemsContainer = document.getElementById("cartItems")
const totalPriceContainer = document.getElementById("totalPrice")

//CART ARRAY
let cartItems = []

// FUNCTION TO RENDER PRODUCTS TO THE PAGE
function renderProducts() {
    let productsHtml = ""

    productsData.forEach((product, index) => {
        productsHtml += `
            <div class="productCard">
                <img src=${product.imgSrc} />
                <div class="productInfo">
                    <h2 class="productTitle">${product.name} <span>£${product.price}</span></h2>
                    <p>${product.description}</p>
                </div>

                <div class="buttonsContainer">
                    <button class="addButton" id="${index}" >Add to cart</button>
                </div>
            </div>
        `
    })
    productsContainer.innerHTML = productsHtml

    const addButtons = document.getElementsByClassName('addButton')
    for(let button of addButtons) {
        button.addEventListener('click', addItemToCart)
    }

}
renderProducts()


//FUNCTION TO ADD TO CART
function addItemToCart(){
    cartItems.push(productsData[this.id])
    renderCart()
}


//FUNCTION TO RENDER CART ITEMS TO THE PAGE
function renderCart() {
    let itemsHtml = ""

    cartItems.forEach((product, index) => {
        itemsHtml += `
            <div class="cartCard">
                <img src=${product.imgSrc} />
                <div class="cartItemInfo">
                    <h2 class="cartItemTitle">${product.name} <span>£${product.price}</span></h2>
                </div>
                <div class="buttonsContainer">
                    <button class="removeButton" id="${product.id}">Remove from cart</button>
                </div>
            </div>
        `
    })
    cartItemsContainer.innerHTML = itemsHtml
    calculateTotalPrice()

    const removeButtons = document.getElementsByClassName('removeButton')
    for(let removeBtn of removeButtons) {
        removeBtn.addEventListener('click', removeItemFromCart)
    }
}

//FUNCTION TO REMOVE ITEMS FROM THE CART AND RECALCULATE TOTAL PRICE
function removeItemFromCart() {
    cartItems = cartItems.filter(item => item !== productsData[this.id])
    renderCart()
    calculateTotalPrice()

}


//FUNCTION TO CALCULATE AND DISPLAY TOTAL PRICE 
function calculateTotalPrice() {
    let totalPrice = 0

    if(cartItems.length === 0) {
        totalPriceContainer.innerHTML = ""
    }
    else {
        cartItems.forEach(function(product) {
            totalPrice += product.price       
        })

        totalPriceContainer.innerHTML = `
        <div id="total" class="total">
            <h2>Total: £${totalPrice.toFixed(2)}</h2>
        </div>
        <button id="checkout" class="checkout">Proceed to checkout</button>
        `
        const checkoutBtn = document.getElementById('checkout')
        checkoutBtn.addEventListener('click', checkout)
    }
}


//FUNCTION TO CHECKOUT - NO DATABASE HOOKED UP SO ONLY CLEARS ALL OUTPUTS FOR DEMO PURPOSES
function checkout() {
    cartItems = []
    cartItemsContainer.innerHTML = "Thank you, your order has been submitted."
    totalPriceContainer.innerHTML = ""
}