$(() =>  {
  //grab the form and save it to jquery obj
  const $form = $(".quiz-title");

  //add event handler for $form, pass it callback
  $form.on('submit', onSubmit)

  showURL();

});

const onSubmit = function(event) {
  event.preventDefault();

  //validation checks for no title input from user
  const $noTitleErrorMsg = $('#no-title-error');
  $noTitleErrorMsg.slideUp();

  const stringBeforeSerialized = $("#quiz-title-text").val();
  if (!stringBeforeSerialized) {
    return $noTitleErrorMsg.slideDown();
  }

  //hide title portion of form once entered
  const $form = $(".quiz-title-form");
  $form.slideUp();

  //grab text from title
  const formData = $(this).serialize();
  console.log(formData);

  $.post('/quizzes/new', formData)
    .then(() => {
      showURL();
    })
}

const showURL = function() {
  $.ajax({
    url: 'http://localhost:8080/quizzes/new',
    method: 'GET',
    dataType: 'json',
    success: (tweetData) => {
      renderTweets(tweetData);
    },
    error: (err) => {
      console.error(err);
    }
  })
}

const createTweetElement = function(tweetData) {

  //variable to store the format of the new tweet, populated with values from tweetData
  const $tweet = $(`
  <article class="tweet" id="tweets-container">
  <header>
  <div>
  <img src=${escape(tweetData.user.avatars)}>
  <h3>${escape(tweetData.user.name)}</h3>
  </div>
  <h3>${escape(tweetData.user.handle)}</h3>
  </header>
  <p>${escape(tweetData.content.text)}</p>
  <footer>
  <p>${timeago.format(tweetData.user.created_at)}</p>
  <span class="tweet-icons">
  <span><i class="fas fa-flag"></i></span>
  <span><i class="fas fa-retweet"></i></span>
  <span><i class="fas fa-heart"></i></span>
  </span>
  </footer>
  </article>`);

  return $tweet; //return article
}

const renderTweets = function(tweets) {

  const $tweetsContainer = $( '#tweets-container' );
  $tweetsContainer.empty();

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
