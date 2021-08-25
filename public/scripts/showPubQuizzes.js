$(() => {
  $.get("/api/").then((pubQuizzes) => {
    console.log(pubQuizzes);
    const quizChildren = [];
    for (const quiz of pubQuizzes) {
      quizChildren.push(nextQuiz(quiz));
    }
    const stringQuizChildren = quizChildren.join("");
    $(".spotlight-public-quizzes").append(stringQuizChildren);
  });

  const nextQuiz = (quiz) => {
    const $pubQuestion = `
      <div class="row">
      <div class="col-sm">
      <p>${quiz.title}</p>
      <a href=${quiz.url} class="btn btn-outline-info btn-lg">Take this quiz</a>
      </div>
      </div>
      `;
    return $pubQuestion;
  };
});
