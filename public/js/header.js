document.addEventListener("DOMContentLoaded", function () {
  function updateUI() {
    var dropdownLink = document.getElementById("userDropdown");
    var dropdownContainer = document.getElementById("userDropdownContainer");
    var signInButton = document.getElementById("signInButton");

    var userData = sessionStorage.getItem("userData");

    if (userData) {
      var userDataObj = JSON.parse(userData);

      // Update the dropdown link content with the user's first and last name
      dropdownLink.innerHTML =
        userDataObj.firstname + " " + userDataObj.lastname;

      dropdownContainer.style.display = "block";
      signInButton.style.display = "none";
    } else {
      dropdownLink.innerHTML = "Dropdown"; // Reset the dropdown link content
      dropdownContainer.style.display = "none";
      signInButton.style.display = "block";
    }
  }

  function handleLogout() {
    sessionStorage.clear();
    updateUI();
  }

  document.getElementById("logoutLink").addEventListener("click", handleLogout);

  updateUI();
});
