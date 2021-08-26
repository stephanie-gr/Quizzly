$(() => {
  $.get("/api/quizzes").then((quizzes) => {
    const quizChildren = [];
    for (const quiz of quizzes.quizzes) {
      quizChildren.push(nextQuiz(quiz));
    }
    const stringQuizChildren = quizChildren.join("");

    $(".quiz-container").append(stringQuizChildren);
  });

  const nextQuiz = (quiz) => {
    const $quiz = `
    <div class="quiz-element">
      <a class="project-bio mb-4" href="${quiz.url}">
        <div class="info">
          <div class="icon icon-type" title="Project"></div>
          <div class="name">${quiz.title}&nbsp;</div>
          </div>
      </a>
      <p>Share with this URL: ${quiz.url}<p>

    </div>
    `;
    return $quiz;
  };
});
