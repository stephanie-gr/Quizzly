$(() =>  {

  //grab the form and save it to jquery obj
  const $titleForm = $(".quiz-title");

  //add event handler for $titleForm, pass it callback
  $titleForm.on('submit', onTitleSubmit);

  //grab question form as jquery obj
  const $questionForm =$('.new-question-form');

  //questionForm has to listen for three event possibilities: the user uses the button to add a question, save the quiz as public, and save the quiz as private, respectively
  $questionForm.on('submit', '#add-another-question', onQuestionSubmit);

  // $questionForm.on('submit', '#save-public', onSavePublic);

  // $questionForm.on('submit', '#save-private', onSavePrivate);


  // showURL();

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

  const $questionForm = $(".question-and-answers");

  return $questionForm.slideDown();
}

const onQuestionSubmit = function(event) {
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

   //call something to SAVE this data to database and get another question form

}

// const onSavePublic = function(event) {
//   event.preventDefault();

//   //validation checks for no question input from user
//   const $noQuestionErrorMsg = $('#no-question-error');
//   $noQuestionErrorMsg.slideUp();

//   const questionBeforeSerialized = $("#question-text").val();
//   if (!questionBeforeSerialized) {
//     return $noQuestionErrorMsg.slideDown();
//   }

//   const $noAnswerErrorMsg = $('#no-answer-error');
//   $noAnswerErrorMsg.slideUp();

//   //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
//   const optionBeforeSerialized = $("#option-a-text").val();
//   if (!optionBeforeSerialized) {
//     return $noAnswerErrorMsg.slideDown();
//   }

//   const questionText = $("question-text");
//   console.log(questionText.serialize());

//   const optionA = $("#option-a-text");
//   console.log(optionA.serialize());

//   const optionB = $("#option-b-text");
//   console.log(optionB.serialize());

//   const optionC = $("#option-c-text");
//   console.log(optionC.serialize());

//   const optionD = $("#option-d-text");
//   console.log(optionD.serialize());

//   //call something to SAVE this data as PUBLIC quiz and return  URLlink.slideDOwn()
// }

// const onSavePrivate = function(event) {
//   event.preventDefault();

//   //validation checks for no question input from user
//   const $noQuestionErrorMsg = $('#no-question-error');
//   $noQuestionErrorMsg.slideUp();

//   const questionBeforeSerialized = $("#question-text").val();
//   if (!questionBeforeSerialized) {
//     return $noQuestionErrorMsg.slideDown();
//   }

//   const $noAnswerErrorMsg = $('#no-answer-error');
//   $noAnswerErrorMsg.slideUp();

//   //right now, this only makes the user enter ONE option. if 0 options are entered, error msg will appear.
//   const optionBeforeSerialized = $("#option-a-text").val();
//   if (!optionBeforeSerialized) {
//     return $noAnswerErrorMsg.slideDown();
//   }

//   const questionText = $("question-text");
//   console.log(questionText.serialize());

//   const optionA = $("#option-a-text");
//   console.log(optionA.serialize());

//   const optionB = $("#option-b-text");
//   console.log(optionB.serialize());

//   const optionC = $("#option-c-text");
//   console.log(optionC.serialize());

//   const optionD = $("#option-d-text");
//   console.log(optionD.serialize());

//   //call something to SAVE this data as PRIVATE quiz and return  URLlink.slideDOwn()
// }



// const showURL = function() {
//   $.ajax({
//     url: 'http://localhost:8080/quizzes/new',
//     method: 'GET',
//     dataType: 'json',
//     success: (quizData) => {
//       renderTweets(quizData);
//     },
//     error: (err) => {
//       console.error(err);
//     }
//   })
// }


