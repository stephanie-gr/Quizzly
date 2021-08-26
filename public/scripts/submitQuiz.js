$(() => {
  const $currentQuiz = $("#current-quiz");
  $currentQuiz.on("submit", onQuizAttemptSubmit);
});

const onQuizAttemptSubmit = function(event) {
  event.preventDefault();

  const quizId = $("#current-quiz").data("quizid");

  const answers = [];

  $(".submission-answer").each(function(index, ele) {
    answers.push(
      $(`input[name=answers${index}]:checked`, "#submit-quiz-attempt").val()
    );
  });

  $.ajax({
    type: "POST",
    url: `/api/quizzes/${quizId}/results`,
    data: { answers },
    success: function(result) {
      location.href = `/quizzes/${result.quizID}/results?matched=${result.matched}&numAnswers=${result.numAnswers}`;
    },
  });
};
