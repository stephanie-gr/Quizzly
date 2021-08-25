$(() => {
  const quizId = $("#current-quiz").data("quizid");
  $.get(`/api/quizzes/${quizId}`).then((quiz) => {
    const quizChildren = [];
    for (const question of quiz.quiz) {
      quizChildren.push(nextQuestion(question));
    }
    const stringQuizChildren = quizChildren.join("");

    const $form = `
      <form class="new_quiz_submission" id="new_quiz_submission" action="" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input type="hidden" name="authenticity_token" VALUE="">
          <input type="hidden" value="14" name="quiz_submission[quiz_id]" id="quiz_submission_quiz_id">
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
            <input type="radio" name="quiz_submission[answers_attributes][0][option_id]" id="quiz_submission_answers_attributes_0_option_id_1642" value="1642">
            <label for="quiz_submission_answers_attributes_0_option_id_1642">
              <div class="list-group-item" id="1642">
                <p></p>
                <p>${question.option_a}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="" id="" value="">
            <label for="">
              <div class="list-group-item" id="">
                <p></p>
                <p>${question.option_b}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="" id="" value="">
            <label for="">
              <div class="list-group-item" id="">
                <p></p>
                <p>${question.option_c}</p>
                <p></p>
              </div>
            </label>
            <input type="radio" name="" id="" value="">
            <label for="">
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
