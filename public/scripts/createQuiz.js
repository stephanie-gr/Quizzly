$(() =>  {

  //grab the form and save it to jquery obj
  const $titleForm = $(".quiz-title");

  //add event handler for $titleForm, pass it callback
  $titleForm.on('submit', onTitleSubmit);

  //grab question form as jquery obj
  const $questionForm =$('#new-question-form');

  //questionForm has to listen for three event possibilities: the user uses the button to add a question, save the quiz as public, and save the quiz as private, respectively
  $questionForm.on('click', '#add-another-question', onAddAnotherQuestionSubmit);

  $questionForm.on('click', '#save-public', onSavePublic);

  $questionForm.on('click', '#save-private', onSavePrivate);

});


const onTitleSubmit = function(event) {
  event.preventDefault();

  //validation checks for no title input from user
  const $noTitleErrorMsg = $('#no-title-error');
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
    }
    // success: success,
  });

  const $questionForm = $(".question-and-answers");

  return $questionForm.slideDown();
}

const onAddAnotherQuestionSubmit = function(event) {
  event.preventDefault();

   //validation checks for no question input from user
   const $noQuestionErrorMsg = $('#no-question-error');
   $noQuestionErrorMsg.slideUp();

   const questionBeforeSerialized = $("#question-text").val();
   if (!questionBeforeSerialized) {
     return $noQuestionErrorMsg.slideDown();
   }

   const $noAnswerErrorMsg = $('#no-answer-error');
   $noAnswerErrorMsg.slideUp();

   //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
   const optionBeforeSerialized = $("#option-a-text").val();
   if (!optionBeforeSerialized) {
     return $noAnswerErrorMsg.slideDown();
   }

   const data = $("#new-question-form").serialize();

  //  const $questionFormData = [questionText, optionA, optionB, optionC, optionD]



   $.ajax({
    type: "POST",
    url: "/api/quizzes/questions",
    data: data,
    success: function(result) {
      console.log(result);
    }
  });

  $("#new-question-form").trigger('reset')


}

const onSavePublic = function(event) {
  event.preventDefault();

  //validation checks for no question input from user
  const $noQuestionErrorMsg = $('#no-question-error');
  $noQuestionErrorMsg.slideUp();

  const questionBeforeSerialized = $("#question-text").val();
  if (!questionBeforeSerialized) {
    return $noQuestionErrorMsg.slideDown();
  }

  const $noAnswerErrorMsg = $('#no-answer-error');
  $noAnswerErrorMsg.slideUp();

  //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
  const optionBeforeSerialized = $("#option-a-text").val();
  if (!optionBeforeSerialized) {
    return $noAnswerErrorMsg.slideDown();
  }

  const questionText = $("question-text");
  console.log(questionText.serialize());

  const optionA = $("#option-a-text");
  console.log(optionA.serialize());

  const optionB = $("#option-b-text");
  console.log(optionB.serialize());

  const optionC = $("#option-c-text");
  console.log(optionC.serialize());

  const optionD = $("#option-d-text");
  console.log(optionD.serialize());

  //call something to SAVE this data as PUBLIC quiz and return  URLlink.slideDOwn()
}

const onSavePrivate = function(event) {
  event.preventDefault();

  //validation checks for no question input from user
  const $noQuestionErrorMsg = $('#no-question-error');
  $noQuestionErrorMsg.slideUp();

  const questionBeforeSerialized = $("#question-text").val();
  if (!questionBeforeSerialized) {
    return $noQuestionErrorMsg.slideDown();
  }

  const $noAnswerErrorMsg = $('#no-answer-error');
  $noAnswerErrorMsg.slideUp();

  //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
  const optionBeforeSerialized = $("#option-a-text").val();
  if (!optionBeforeSerialized) {
    return $noAnswerErrorMsg.slideDown();
  }

  //grab question and options text
  const questionText = $("question-text");
  console.log(questionText.serialize());

  const optionA = $("#option-a-text");
  console.log(optionA.serialize());

  const optionB = $("#option-b-text");
  console.log(optionB.serialize());

  const optionC = $("#option-c-text");
  console.log(optionC.serialize());

  const optionD = $("#option-d-text");
  console.log(optionD.serialize());

  //call something to SAVE this data as PRIVATE quiz and return  URLlink.slideDOwn()
}

const nextQuestion = () => {
  const $newQuestion = `
  <section class="cognito question-and-answers">
  <div class="cognito create-error" id="no-question-error">⛔️ Fill in the question text before submitting. ⛔️</div>
  <div class="cognito create-error" id="no-answer-error">⛔️ Fill in the answer options before submitting. ⛔️</div>
  <form class="new-question-form" method="POST" ACTION="">
      <br>
      <textarea name="text" id="question-text" placeholder="Type your question here."></textarea>
      <br>
      <textarea name="option-a-text" id="option-a-text" placeholder="Type the CORRECT answer option here."></textarea>
      <br>
      <textarea name="option-b-text" id="option-b-text" placeholder="Type an INCORRECT answer option here."></textarea>
      <br>
      <textarea name="option-c-text" id="option-c-text" placeholder="Type an INCORRECT answer option here."></textarea>
      <br>
      <textarea name="option-d-text" id="option-d-text" placeholder="Type an INCORRECT answer option here."></textarea>
      <footer>
        <button class="btn btn-collapse-lg" type="submit" for="new-question-form" id="add-another-question">Add another question</button>
        <p>Save as<button class="btn btn-collapse-lg" type="submit" for="save-public" id="save-public">PUBLIC</button> or <button class="btn btn-collapse-lg" type="submit" for="save-private" id="save-private">PRIVATE</button></p>
      </footer>
    </form>
  </section>
    `;
  return $newQuestion;
};


const submitNewQuiz = function() {
  $.ajax({
    url: 'http://localhost:8080/quizzes/new',
    method: 'GET',
    dataType: 'json',
    success: (quizData) => {

    },
    error: (err) => {
      console.error(err);
    }
  })
}


