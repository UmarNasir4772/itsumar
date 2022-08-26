// For show login card on screen

function showloginform() {
  var _Overlay = document.getElementById("overlay");
  var _Login = document.getElementsByClassName("login-drop-down")[0];
  _Overlay.setAttribute("style", "display: block;");
  _Login.setAttribute("style", "display: block;");
}

// For hide login card on screen

function hideloginform() {
  var _Overlay = document.getElementById("overlay");
  var _Login = document.getElementsByClassName("login-drop-down")[0];
  _Overlay.removeAttribute("style", "display: block;");
  _Login.removeAttribute("style", "display: block;");
}

// For show Menu card on screen

function showMenu() {
  var _Overlay = document.getElementById("overlay");
  var _Menu = document.getElementsByClassName("menu-card")[0];
  _Overlay.setAttribute("style", "display: block;");
  _Menu.setAttribute("style", "display: block;");
}

// For hide login card on screen

function hideMenu() {
  var _Overlay = document.getElementById("overlay");
  var _Menu = document.getElementsByClassName("menu-card")[0];
  _Overlay.removeAttribute("style", "display: block;");
  _Menu.removeAttribute("style", "display: block;");
}

// For show Cart Menu  on screen

function showCartMenu() {
  var _Overlay = document.getElementById("overlay");
  var _Menu = document.getElementsByClassName("cart-menu-section")[0];
  _Overlay.setAttribute("style", "display: block;");
  _Menu.setAttribute("style", "display: block;");
}

// For hide Cart card on screen

function hideCartMenu() {
  var _Overlay = document.getElementById("overlay");
  var _Menu = document.getElementsByClassName("cart-menu-section")[0];
  _Overlay.removeAttribute("style", "display: block;");
  _Menu.removeAttribute("style", "display: block;");
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // For Enable PRoceed Button

  var CheckAgreement = document.getElementById("exampleCheck1");
  CheckAgreement.addEventListener("click", function () {
    var ProceedToPayment = document.getElementById("Proceed-to-payment-btn");
    ProceedToPayment.removeAttribute("disabled");
  });

  // For Product form cart

  var removeCartItemButtons = document.getElementsByClassName("remove-product");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // For change total amount from quantity button

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // For add product into cart

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = parseFloat(
    shopItem
      .getElementsByClassName("shop-item-price")[0]
      .innerText.replace("$", "")
  );
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
  <div class="row cart-row py-2">
  <div class="col-lg-3 col-md-3 col-sm-12 my-auto text-center">
    <img src="${imageSrc}" alt="Prodcut" />
    </div>

    <div class="col-lg-3 col-md-3 col-sm-12 my-auto text-center">
    <h5 class="cart-item-title">${title}</h5>
    </div>

    <div class="col-lg-2 col-md-2 col-sm-12 my-auto text-center">
    <p>$<span class="cart-price">${price}</span></p>
    </div>

    <div class="col-lg-2 col-md-3 col-sm-12 my-auto text-center">
    <input
        class="cart-quantity-input"
        type="number"
        value="1"
    />
    </div>

    <div class="col-lg-2 col-md-1 col-sm-12 my-auto text-center">
    <i
        class="fa fa-times remove-product"
        aria-hidden="true"
    ></i>
    </div>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("remove-product")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText);
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText = total;
}
