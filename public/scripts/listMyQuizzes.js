$(() => {
  $.get("/api/quizzes").then((quizzes) => {
    const quizChildren = [];
    for (const quiz of quizzes.quizzes) {
      quizChildren.push(nextQuiz(quiz));
    }
    const stringQuizChildren = quizChildren.join("");

    $(".quiz-container").append(stringQuizChildren);

    const quizID = $(".quiz-element").data("quizid");

    const $publicForm = $("#public-form");
    const $privateForm = $("#private-form");

    $publicForm.on("submit", (event) => {
      event.preventDefault();
      $.post("/api/quizzes/public", { quizId: quizID }, () => {
        console.log("MADE PUBLIC!");
      });
    });

    $privateForm.on("submit", (event) => {
      event.preventDefault();
      $.post("/api/quizzes/private", { quizId: quizID }, () => {
        console.log("MADE PRIVATE!");
      });
    });
  });

  const nextQuiz = (quiz) => {
    console.log(quiz.is_public);
    let $quiz = `
    <div class="quiz-element" data-quizid="${quiz.creator_id}">
      <a class="project-bio mb-4" href="${quiz.url}">
        <div class="info">
          <div class="icon icon-type" title="Project"></div>
          <div class="name">${quiz.title}&nbsp;</div>
          </div>
      </a>
      <p>Share with this URL: localhost:8080/${quiz.url}<p>
    `;
    if (!quiz.is_public) {
      $quiz += `
      <form class="form-inline" id="public-form">
        <div class="form-group">
          <p>THIS QUIZ IS PRIVATE</p>
          <button type="submit" class="btn btn-outline-dark">Make It Public!</button>
        </div>
      </form>
    `;
    } else {
      $quiz += `
      <form class="form-inline" id="private-form">
        <div class="form-group">
          <p>THIS QUIZ IS PUBLIC</p>
          <button type="submit" class="btn btn-outline-dark">Make It Private!</button>
        </div>
      </form>
      `;
    }
    $quiz += `
    </div>
    `;
    return $quiz;
  };
});
