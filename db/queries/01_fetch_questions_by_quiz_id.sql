SELECT quizzes.title, questions.*
FROM quizzes
JOIN questions
ON quizzes.id = questions.quiz_id
WHERE quiz_id = '5';
