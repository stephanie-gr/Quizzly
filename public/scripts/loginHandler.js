$(() => {
  const $loginForm = $("#login-form");

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const userID = $loginForm.find('input[name="userID"]').val();

    $.get(`/login/${userID}`).then(() => {
      console.log(`login user: ${userID} success!`);
    });
  };

  $loginForm.on("submit", onLoginSubmit);
});
