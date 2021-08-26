$(() => {
  const $currentQuiz = $("#current-quiz");
  $currentQuiz.on("submit", onQuizAttemptSubmit);
});

const onQuizAttemptSubmit = function(event) {
  event.preventDefault();

  const quizURL = $("#current-quiz").data("quizurl");
  console.log(quizURL);

  const answers = [];

  $(".submission-answer").each(function(index, ele) {
    answers.push(
      $(`input[name=answers${index}]:checked`, "#submit-quiz-attempt").val()
    );
  });

  $.ajax({
    type: "POST",
    url: `/api/quizzes/${quizURL}/results`,
    data: { answers },
    success: function(result) {
      window.location.href = `/quizzes/${result.quizURL}/results?matched=${result.matched}&numAnswers=${result.numAnswers}`;
    },
  });
};
