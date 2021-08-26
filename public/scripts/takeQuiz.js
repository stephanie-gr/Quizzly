let index = 0;
$(() => {
  const quizId = $("#current-quiz").data("quizid");
  $.get(`/api/quizzes/${quizId}`).then((quiz) => {
    const quizChildren = [];
    for (const question of quiz.quiz) {
      quizChildren.push(nextQuestion(question));
      index++;
    }
    const stringQuizChildren = quizChildren.join("");

    const $form = `
    <form id="submit-quiz-attempt" accept-charset="UTF-8">
    <input name="utf8" type="hidden" value="✓">
    <input type="hidden" name="authenticity_token" VALUE="">
    <input type="hidden" value="14" >
    <p></p>
    <div id="quiz-container">${stringQuizChildren}
    </div>
    <div class="form-group text-center">
    <input type="submit" name="commit" value="Submit" class="btn btn-lg btn-primary" data-disable-with="Submit">
    </div>
    </form>
    `;

    $("#current-quiz").append($form);
  });

  const nextQuestion = (question) => {
    const $question = `
  <div class="submission-question card">
        <div class="card-header">
          <h3 class="text-primary">${question.question}</h3>
        </div>
        <div class="card-body">
          <p></p>
          <p></p>
          <p></p>
        <div class="submission-answer">
          <h4 class="text-muted">Possible Answers</h4>
          <div class="list-group">
            <input type="radio" name="answers${index}" class="a-1" id="o${question.option_a}q${question.id}" value=${question.option_a}>
            <label for="o${question.option_a}q${question.id}">
              <div class="list-group-item" id="1642">
                <p></p>
                <p>${question.option_a}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="answers${index}" class="a-2"id="o${question.option_b}q${question.id}" value=${question.option_b}>
            <label for="o${question.option_b}q${question.id}">
              <div class="list-group-item" id="">
                <p></p>
                <p>${question.option_b}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="answers${index}" class="a-3" id="o${question.option_c}q${question.id}" value="${question.option_c}">
            <label for="o${question.option_c}q${question.id}">
              <div class="list-group-item" id="">
                <p></p>
                <p>${question.option_c}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="answers${index}" class="a-4" id="o${question.option_d}q${question.id}" value="${question.option_d}">
            <label for="o${question.option_d}q${question.id}">
              <div class="list-group-item" id="">
                <p></p>
                <p>${question.option_d}</p>
                <p></p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;
    return $question;
  };
});
