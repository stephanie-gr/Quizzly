$(() => {
  const $currentQuiz = $("#current-quiz");
  $currentQuiz.on("submit", onQuizAttemptSubmit);
});

const onQuizAttemptSubmit = function(event) {
  event.preventDefault();

  const quizId = $("#current-quiz").data("quizid");
  //grab text from title
  // console.log($(this));
  // const formData = $(this).serialize();
  // console.log(formData);
  // const answerOne = $(".a-1").val();
  // const answerTwo = $(".a-2").val();
  // const answerThree = $(".a-3").val();
  // const answerFour = $(".a-4").val();
  const answers = [];
  const indices = [];

  $(".submission-answer").each(function(index, ele) {
    // console.log(ele);
    // console.log(index);
    // console.log(
    //
    // );
    answers.push(
      $(`input[name=answers${index}]:checked`, "#submit-quiz-attempt").val()
    );
    // console.log(answers);
  });

  // console.log("ans1:", answerOne, answerTwo, answerThree, answerFour);

  $.ajax({
    type: "POST",
    url: `/api/quizzes/${quizId}/results`,
    data: { answers },
    success: function(result) {
      location.href = `/quizzes/${result.quizID}/results?matched=${result.matched}&numAnswers=${result.numAnswers}`;
    },
  });
};
