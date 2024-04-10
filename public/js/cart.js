// cart.js
$(document).ready(function () {
  // Fetch cart data from the updated API endpoint
  var userData = sessionStorage.getItem("userData");

  if (userData) {
    var userId = JSON.parse(userData).userId;

    fetch("http://localhost:3000/api/v1/cart/cartItems?userId=" + userId)
      .then((response) => response.json())
      .then((data) => {
        // Check if the cart is empty
        if (
          data.message === "Cart not found" ||
          (data.data.products && data.data.products.length === 0)
        ) {
          displayEmptyCartMessage();
          return;
        }

        // Display the cart list in a Bootstrap-styled table
        var cartListHtml = "<table class='table'>";
        cartListHtml +=
          "<thead><tr><th>Item ID</th><th>Item Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr></thead><tbody>";

        data.data.products.forEach(function (item) {
          cartListHtml +=
            "<tr>" +
            "<td>" +
            item.item_id +
            "</td>" +
            "<td>" +
            item.item_name +
            "</td>" +
            "<td>₹" +
            item.item_price +
            "</td>" +
            "<td>" +
            item.quantity +
            "</td>" +
            "<td>" +
            "<button class='btn btn-danger deleteBtn' data-product-id='" +
            item.product_id +
            "'>Delete</button> " +
            "<button class='btn btn-primary placeOrderBtn' data-product-id='" +
            item.product_id +
            "'>Place Order</button>" +
            "</td>" +
            "</tr>";
        });

        cartListHtml += "</tbody></table>";

        // Display the cart total
        cartListHtml +=
          "<p class='pt-3'>Cart Total: ₹" + data.data.cart_total + "</p>";

        $("#cartListContainer").html(cartListHtml);

        // Add event listeners for delete and place order buttons
        $(".deleteBtn").click(function () {
          var productId = $(this).data("product-id");

          // Get userId from sessionStorage
          var userId = JSON.parse(sessionStorage.getItem("userData")).userId;

          // Make an AJAX request to remove the product from the cart
          $.post(
            "http://localhost:3000/api/v1/cart/removeCart",
            {
              userId: userId,
              product_id: productId,
            },
            function (response) {
              // Handle the response from the server
              if (response.status === 200) {
                // Cart removal successful, you can provide feedback to the user
                console.log("Product removed from cart successfully!");
                // Refresh the cart data after deletion
                location.reload();
              } else {
                // Handle other status codes if needed
                console.error(
                  "Error removing product from cart:",
                  response.message
                );
              }
            }
          );
        });

        $(".placeOrderBtn").click(function () {
          // Get userId from sessionStorage
          var userId = JSON.parse(sessionStorage.getItem("userData")).userId;

          // Make an AJAX request to place the order
          $.post(
            "http://localhost:3000/api/v1/order/placeOrder",
            {
              userId: userId,
            },
            function (response) {
              // Handle the response from the server
              if (response.status === 200) {
                // Order placement successful, you can provide feedback to the user
                console.log("Order placed successfully!");
                // Optionally, you may want to redirect to an order confirmation page
                // window.location.href = "/order-confirmation";
              } else {
                // Handle other status codes if needed
                console.error("Error placing order:", response.message);
              }
            }
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  } else {
    console.error("User data not found in sessionStorage.");
  }

  // Function to display the empty cart message
  function displayEmptyCartMessage() {
    var emptyCartMessage =
      "<div class='alert alert-info my-2' role='alert'>Cart is Empty</div>";
    $("#cartListContainer").html(emptyCartMessage);
  }
});
