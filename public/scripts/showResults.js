$(() => {
  const url = $(location).attr("href");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  $("#results-container").append(
    `
    <h1>Quiz Complete!</h1>
    <h2>You scored: ${params.matched} / ${params.numAnswers}</h2>
    <p> Share your results by copying the link below!</p>
    <p></p>
    <a href="${url}">${url}</a>
    `
  );
});
