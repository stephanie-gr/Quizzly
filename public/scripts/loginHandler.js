$(() => {
  const $loginForm = $("#login-form");
  const $logoutButton = $("#logout");

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const userID = $loginForm.find('input[name="userID"]').val();

    $.get(`/login/${userID}`).then(() => {
      console.log(`login user: ${userID} success!`);
      window.location.replace("/");
    });
  };

  const onLogoutSubmit = (event) => {
    event.preventDefault();

    $.post("/logout").then(() => {
      console.log("successfully logged out!");
      window.location.replace("/");
    });
  };

  $logoutButton.on("submit", onLogoutSubmit);
  $loginForm.on("submit", onLoginSubmit);
});
