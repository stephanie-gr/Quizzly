$(() => {
  //grab the form and save it to jquery obj
  const $titleForm = $(".quiz-title");

  //add event handler for $titleForm, pass it callback
  $titleForm.on("submit", onTitleSubmit);

  //grab question form as jquery obj
  const $questionForm = $("#new-question-form");

  //questionForm has to listen for three event possibilities: the user uses the button to add a question, save the quiz as public, and save the quiz as private, respectively
  $questionForm.on(
    "click",
    "#add-another-question",
    onAddAnotherQuestionSubmit
  );

  $questionForm.on("click", "#save-public", onSavePublic);

  $questionForm.on("click", "#save-private", onSavePrivate);
});

const onTitleSubmit = function(event) {
  event.preventDefault();

  //validation checks for no title input from user
  const $noTitleErrorMsg = $("#no-title-error");
  $noTitleErrorMsg.slideUp();

  const stringBeforeSerialized = $("#quiz-title-text").val();
  if (!stringBeforeSerialized) {
    return $noTitleErrorMsg.slideDown();
  }

  //hide title portion of form once entered
  const $titleForm = $(".quiz-title-form");
  $titleForm.slideUp();

  //grab text from title
  const formData = $(this).serialize();
  console.log(formData);

  $.ajax({
    type: "POST",
    url: "/api/quizzes/title",
    data: formData,
    success: function(result) {
      console.log(result);
      $("#question-id").val(result.quiz_id);
    },
    // success: success,
  });

  const $questionForm = $(".question-and-answers");

  return $questionForm.slideDown();
};

const onAddAnotherQuestionSubmit = function(event) {
  event.preventDefault();

  //validation checks for no question input from user
  const $noQuestionErrorMsg = $("#no-question-error");
  $noQuestionErrorMsg.slideUp();

  const questionBeforeSerialized = $("#question-text").val();
  if (!questionBeforeSerialized) {
    return $noQuestionErrorMsg.slideDown();
  }

  const $noAnswerErrorMsg = $("#no-answer-error");
  $noAnswerErrorMsg.slideUp();

  //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
  const optionBeforeSerialized = $("#option-a-text").val();
  if (!optionBeforeSerialized) {
    return $noAnswerErrorMsg.slideDown();
  }

  const data = $("#new-question-form").serialize();

  $.ajax({
    type: "POST",
    url: "/api/quizzes/questions",
    data: data,
    success: function(result) {
      console.log(result);
    },
  });

  $("#new-question-form").trigger("reset");
};

const onSavePublic = function(event) {
  event.preventDefault();

  //validation checks for no question input from user
  const $noQuestionErrorMsg = $("#no-question-error");
  $noQuestionErrorMsg.slideUp();

  const questionBeforeSerialized = $("#question-text").val();
  if (!questionBeforeSerialized) {
    return $noQuestionErrorMsg.slideDown();
  }

  const $noAnswerErrorMsg = $("#no-answer-error");
  $noAnswerErrorMsg.slideUp();

  //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
  const optionBeforeSerialized = $("#option-a-text").val();
  if (!optionBeforeSerialized) {
    return $noAnswerErrorMsg.slideDown();
  }

  const data = $("#new-question-form").serialize();

  $.ajax({
    type: "POST",
    url: "/api/quizzes/questions",
    data: data,
    success: function(result) {
      console.log(result);
    },
  }).then(
    $.ajax({
      type: "POST",
      url: "/api/quizzes/public",
      data: data,
      success: function(result) {
        console.log(result);
      },
    })
  );

  $(".question-and-answers").slideUp();

  return $(".url-for-user-quiz").slideDown();
};

const onSavePrivate = function(event) {
  event.preventDefault();

  //validation checks for no question input from user
  const $noQuestionErrorMsg = $("#no-question-error");
  $noQuestionErrorMsg.slideUp();

  const questionBeforeSerialized = $("#question-text").val();
  if (!questionBeforeSerialized) {
    return $noQuestionErrorMsg.slideDown();
  }

  const $noAnswerErrorMsg = $("#no-answer-error");
  $noAnswerErrorMsg.slideUp();

  //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
  const optionBeforeSerialized = $("#option-a-text").val();
  if (!optionBeforeSerialized) {
    return $noAnswerErrorMsg.slideDown();
  }

  const data = $("#new-question-form").serialize();

  $.ajax({
    type: "POST",
    url: "/api/quizzes/questions",
    data: data,
    success: function(result) {
      console.log(result);
    },
  }).then(
    $.ajax({
      type: "POST",
      url: "/api/quizzes/private",
      data: data,
      success: function(result) {
        console.log(result);
      },
    })
  );

  $(".question-and-answers").slideUp();

  return $(".url-for-user-quiz").slideDown();
};
