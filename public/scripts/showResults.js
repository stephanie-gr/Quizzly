$(() => {
  const url = $(location).attr("href");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  $("#results-container").append(
    `
    <h1>You got: ${params.matched} / ${params.numAnswers}</h1>
    <p> Share Your Results: <a href="${url}">${url}</a></p>
    `
  );
});
