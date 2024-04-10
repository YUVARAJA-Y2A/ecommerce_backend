// addtocart.js

var data; // Declare data in a broader scope

function displayProducts(products) {
  if (products.length === 0) {
    console.log("No products to display.");
    return;
  }

  var productListHtml = "<table class='table'>";
  productListHtml +=
    "<thead><tr><th>Item ID</th><th>Item Name</th><th>Price</th><th>Available Stock</th><th>Action</th></tr></thead><tbody>";

  products.forEach(function (product) {
    productListHtml +=
      "<tr>" +
      "<td>" +
      product.item_id +
      "</td>" +
      "<td>" +
      product.item_name +
      "</td>" +
      "<td>₹" +
      product.item_price +
      "</td>" +
      "<td>" +
      product.quantity +
      "</td>" +
      "<td><button class='btn btn-primary addToCartBtn' data-product-id='" +
      product._id +
      "'>Add to Cart</button></td>" +
      "</tr>";
  });

  productListHtml += "</tbody></table>";

  $("#productListContainer").html(productListHtml);
}

$(document).ready(function () {
  // Fetch product data from the API endpoint

  const apiUrl = "http://localhost:3000/api/v1/product/searchSortProduct";

  function searchAndSortProducts() {
    // Get values from form inputs
    const searchKeyword = $("#searchInput").val();
    const sortOrder = $("#sortOrder").val();
    const minPrice = $("#minPrice").val();
    const largeQuantity = $("#largeQuantity").val();

    // Make an API request
    $.ajax({
      url: apiUrl,
      type: "POST", // Change to GET request
      data: {
        search: searchKeyword,
        sortOrder: sortOrder,
        minPrice: minPrice,
        largeQuantity: largeQuantity,
        // Add other parameters as needed
      },
      success: function (response) {
        // Handle the response and update the product list
        displayProducts(response.data.products);
      },
      error: function (error) {
        console.error("Error fetching products:", error);
      },
    });
  }

  $("#searchButton").on("click", searchAndSortProducts);

  // Fetch product data using GET request
  $.ajax({
    url: apiUrl,
    type: "POST",
    success: function (response) {
      data = response.data.products; // Assign the fetched data to the broader scope variable
      displayProducts(data);
    },
    error: function (error) {
      console.error("Error fetching product data:", error);
    },
  });

  $(document).on("click", ".addToCartBtn", function () {
    var productId = $(this).data("product-id");
    // Call a function or open a modal here for adding to cart
    console.log("Add to cart clicked for product with ID:", productId);

    // Fetch additional details (itemName and itemPrice) based on the productId
    var selectedProduct = data.find((product) => product._id === productId);

    // Check if selectedProduct is defined
    if (!selectedProduct) {
      console.error("Selected product not found.");
      return;
    }

    // Open the modal and populate with product details
    openCartModal(selectedProduct);
  });

  // Function to open the cart modal
  function openCartModal(product) {
    // Set modal content based on product details
    $("#modalProductName").text(product.item_name);
    $("#modalProductPrice").text("₹" + product.item_price);

    // Display the modal
    $("#staticBackdrop").modal("show");

    // Set the data-product-id attribute on the "Ok" button
    $("#addToCartButton").data("product-id", product._id);
  }

  // Attach the addToCart function to the "Ok" button click
  $("#addToCartButton").on("click", addToCart);

  // Function to handle adding to cart
  function addToCart() {
    // Get the selected product details
    var productId = $("#addToCartButton").data("product-id");
    var selectedProduct = data.find((product) => product._id === productId);

    // Check if selectedProduct is defined
    if (!selectedProduct) {
      console.error("Selected product not found.");
      return;
    }

    // Get the quantity from the input field
    var quantity = $("#quantityInput").val();

    // Validate the quantity (assuming maxQuantity is a property in your product data)
    if (quantity > selectedProduct.quantity) {
      alert("Quantity exceeds available stock.");
      return;
    }

    // Get the userId from sessionStorage
    var userData = sessionStorage.getItem("userData");
    var userId;

    if (userData) {
      userId = JSON.parse(userData).userId;
    } else {
      // Handle the case where userData is not available (e.g., user not logged in)
      alert("User not logged in.");
      return;
    }

    // Make an AJAX request to add the product to the cart
    $.post(
      "http://localhost:3000/api/v1/cart/addToCart",
      {
        userId: userId,
        id: selectedProduct._id,
        quantity: quantity,
      },
      function (response) {
        // Handle the response from the server
        if (response.status === 200) {
          // Cart addition successful, you can provide feedback to the user
          alert("Product added to cart successfully!");
        } else {
          // Handle other status codes if needed
          console.error("Error adding product to cart:", response.message);
        }

        // Close the modal after handling the response
        $("#staticBackdrop").modal("hide");
      }
    );
  }
});
