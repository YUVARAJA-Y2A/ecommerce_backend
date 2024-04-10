// order.js
$(document).ready(function () {
  // Fetch order data from the API endpoint
  var userData = sessionStorage.getItem("userData");

  if (userData) {
    var userId = JSON.parse(userData).userId;

    fetch("http://localhost:3000/api/v1/order/orderItems?userId=" + userId)
      .then((response) => response.json())
      .then((data) => {
        // Display the order list in the table
        var orderListHtml = "";
        data.data.orders.forEach(function (order) {
          orderListHtml +=
            "<tr>" +
            "<td>" +
            order._id +
            "</td>" +
            "<td>" +
            order.item_name +
            "</td>" +
            "<td>" +
            order.quantity +
            "</td>" +
            "<td>₹" +
            order.item_price +
            "</td>" +
            "<td>₹" +
            order.total_price +
            "</td>" +
            "<td>" +
            order.order_status.label +
            "</td>" +
            "<td>" +
            new Date(order.ordered_date).toLocaleString() +
            "</td>" +
            "</tr>";
        });

        $("#orderListContainer").html(orderListHtml);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  } else {
    console.error("User data not found in sessionStorage.");
  }
});
