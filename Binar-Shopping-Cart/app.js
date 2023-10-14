const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

// Global Variabel
const productOnePrice = 10;
const productTwoPrice = 15;

var subTotal = 0;
var discountValue = 0;
var promoValue = 0;

const cartList = document.getElementById('cartList');
const subTotalElement = document.getElementById('cart-subtotal');
const promoCodeSection = document.getElementById('promoSection');
const validPromo = document.getElementById('validPromo');
const discount = document.getElementById('discount');

// RenderAll Function
const renderAll = () => {
  displayCart();
  displaySubTotal();
  DisplayPromoCode();
  DisplayDiscount();
  displayTotal();
}

// Initial render
renderAll();

// Event Listener
productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const item = event.target.attributes[1].value;
  cartItems.push(item);
  subTotal = calculateSubTotal();
  renderAll();
}

inputPromoCode.addEventListener('input', validatePromo);

function validatePromo(event) {
  const promoCode = event.target.value;
  let promoFound = false;
  promo.forEach((promoitem) => {
    if (promoCode === promoitem.label) {
      discountValue = promoitem.value;
      promoFound = true;
    }
  });
  if (!promoFound) {
    discountValue = 0;
  }
  renderAll();
}

// Display Chart
function displayCart() {
  cartList.innerHTML = '';
  if (cartItems.length > 0) {
    const productOne = calculateProductOne();
    const productTwo = calculateProductTwo();
    if (productOne > 0 && productTwo > 0) {
      cartList.innerHTML = `Product 1 (x${productOne}) , Product 2 (x${productTwo})`;
    }
    else if (productOne > 0) {
      cartList.innerHTML = `Product 1 (x${productOne})`;
    }
    else if (productTwo > 0) {
      cartList.innerHTML = `Product 2 (x${productTwo})`;
    }
  } else {
    cartList.innerText = 'Cart is empty';
  }
}

// Display Subtotal
function displaySubTotal() {
  subTotal = calculateSubTotal();
  subTotalElement.innerText = `Rp. ${subTotal}`;
}

// Display PromoCode
function DisplayPromoCode() {
  const promoValue = discountValue;
  const promoCode = inputPromoCode.value;
  validPromo.innerHTML = '';
  if (promoValue > 0) {
    validPromo.innerHTML = `valid`;
    validPromo.className = 'valid';
  }
  else if (promoValue == 0 && promoCode != '') {
    validPromo.innerHTML = `invalid`;
    validPromo.className = 'invalid';
  }
}

// Display Discount
function DisplayDiscount() {
  discount.innerHTML = '';
  const subTotal = calculateSubTotal();
  if (discountValue > 0) {
    discount.innerHTML = `Rp. ${subTotal * discountValue}`;

  }
  else if (discountValue == 0) {
    discount.innerHTML = `Rp. 0`;
  }
}

// Display Total
function displayTotal() {
  const total = calculateTotal();
  cartTotal.innerHTML = `Rp. ${total}`;
}

// Additional Function
function calculateProductOne() {
  let productOne = 0;
  cartItems.forEach(item => {
    if (item === 'Product 1') {
      productOne += 1;
    }
  });
  return productOne;
}

function calculateProductTwo() {
  let productTwo = 0;
  cartItems.forEach(item => {
    if (item === 'Product 2') {
      productTwo += 1;
    }
  });
  return productTwo;
}

function calculateSubTotal() {
  let subTotal = 0;
  const productOne = calculateProductOne();
  const productTwo = calculateProductTwo();
  subTotal = (productOne * productOnePrice) + (productTwo * productTwoPrice);
  return subTotal;
}

function calculateTotal() {
  const total = subTotal - (subTotal * discountValue);
  return total;
}