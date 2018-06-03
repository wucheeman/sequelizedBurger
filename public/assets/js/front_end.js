$(function() {
  
  $(".devour").on("click", function(event) {
    event.preventDefault();
    var burgerID = $(this).data("id");
    $.ajax("/api/burgers/" + burgerID, {
      type: "PUT",
      data: burgerID
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      burger_name: $("#nb").val().trim(),
    };
    if (newBurger.burger_name.length > 25) {
      alert('Burger names must not be longer than 25 characters');
      return;
    } else if (newBurger.burger_name.length === 0) {
      alert('Burger names must have at least one character');
      return;
    }
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});