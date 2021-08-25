$(() => {
  $.get(`/api/`).then((pubQuizzes) => {
    console.log(pubQuizzes);
  });

  const nextQuiz = (quiz) => {
    const $pubQuestion = `
    <div class="row">
    <div class="col-sm">
    <p>${quiz.title}</p>
    <button type="submit" href=${quiz.url} class="btn btn-outline-info btn-lg">Take this quiz</button>
    </div>
    </div>
    `;
  };
});
