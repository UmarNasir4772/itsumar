// For Enable Mobile Product Button

function ShowMobileProductCard() {
  var ShowMobileProduct =
    document.getElementsByClassName("btn-mobile-product")[0];
  var AllMobileProduct = document.getElementsByClassName("Top-Rated-Mobile")[0];
  var AllMobileAccessoriesProduct = document.getElementsByClassName(
    "Top-Rated-Mobile-Accessories"
  )[0];

  AllMobileProduct.classList.remove("d-none");
  AllMobileAccessoriesProduct.classList.add("d-none");
  ShowMobileProduct.classList.add("enabled-btn");
  var ShowMobileAccessoriesProduct = document.getElementsByClassName(
    "btn-mobile-accessories-product"
  )[0];
  ShowMobileAccessoriesProduct.classList.remove("enabled-btn");
}

function ShowMobileAccessoriesProductCard() {
  var ShowMobileAccessoriesProduct = document.getElementsByClassName(
    "btn-mobile-accessories-product"
  )[0];
  var AllMobileProduct = document.getElementsByClassName("Top-Rated-Mobile")[0];
  var AllMobileAccessoriesProduct = document.getElementsByClassName(
    "Top-Rated-Mobile-Accessories"
  )[0];

  AllMobileProduct.classList.add("d-none");
  AllMobileAccessoriesProduct.classList.remove("d-none");

  ShowMobileAccessoriesProduct.classList.add("enabled-btn");
  var ShowMobileProduct =
    document.getElementsByClassName("btn-mobile-product")[0];
  ShowMobileProduct.classList.remove("enabled-btn");
}
