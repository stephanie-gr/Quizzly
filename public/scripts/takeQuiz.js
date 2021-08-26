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
});

const nextQuestion = (question) => {
  let options = randomizeOrder(question);
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
          ${options}
        </div>
      </div>
    </div>
  </div>
`;
  return $question;
};

const randomizeOrder = (question) => {
  const optionsArray = ["option_a", "option_b", "option_c", "option_d"];

  const $option = [];

  shuffleArray(optionsArray);

  for (const option of optionsArray) {
    let string = `
    <input type="radio" name="answers${index}" id="o${question[option]}q${question.id}" value=${question[option]}>
    <label for="o${question[option]}q${question.id}">
      <div class="list-group-item" id="1642">
        <p></p>
        <p>${question[option]}</p>
        <p></p>
      </div>
    </label>
    `;

    $option.push(string);
  }
  console.log($option);
  return $option.join("");
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
