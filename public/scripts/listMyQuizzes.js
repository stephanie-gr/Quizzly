$(() => {
  $.get("/api/quizzes").then((quizzes) => {
    const quizChildren = [];
    const sortedQuizzes = quizzes.quizzes.sort((a, b) => {
      return (
        new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
      );
    });
    for (const quiz of sortedQuizzes) {
      quizChildren.push(nextQuiz(quiz));
    }
    const stringQuizChildren = quizChildren.join("");

    $(".list-of-users-quizzes").append(stringQuizChildren);

    const $forms = $(".list-of-users-quizzes form.status");
    const $deleteForms = $(".list-of-users-quizzes form.delete");

    $forms.on("submit", (event) => {
      event.preventDefault();
      const quizId = event.currentTarget.dataset.quizid;
      const isPublic = event.currentTarget.dataset.public === "true";
      const route = `/api/quizzes/${isPublic ? "private" : "public"}`;
      $.post(route, { quizId }, () => {
        window.location.replace("/quizzes");
      });
    });

    $deleteForms.on("submit", (event) => {
      event.preventDefault();
      const quizId = event.currentTarget.dataset.quizid;
      $.post(`/api${quizId}/delete`, () => {
        window.location.replace("/quizzes");
      });
    });
  });

  const nextQuiz = (quiz) => {
    let $quiz = `
    <div class="quiz-element">
      <a class="project-bio mb-4" href="${quiz.url}">
        <div class="info">
          <div class="icon icon-type" title="Project"></div>
          <div class="name">${quiz.title}&nbsp;</div>
          </div>
      </a>
      <p>Share with this URL: localhost:8080${quiz.url}<p>
    `;
    if (!quiz.is_public) {
      $quiz += `
      <p>This quiz is Private</p>
      <form class="form-inline status" data-public=false data-quizid="${quiz.url}">
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Make It Public!</button>
        </div>
      </form>
    `;
    } else {
      $quiz += `
      <p>This quiz is Public</p>
      <form class="form-inline status" data-public=true data-quizid="${quiz.url}">
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Make It Private!</button>
        </div>
      </form>
      `;
    }
    $quiz += `
    <form class="form-inline delete" data-quizid="${quiz.url}">
        <div class="form-group">
          <button type="submit" class="btn btn-danger">Delete Quiz!</button>
        </div>
      </form>
    </div>
    `;
    return $quiz;
  };
});
