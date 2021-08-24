INSERT INTO quizzes (creator_id, title, url, is_public, date_created)
VALUES ($1, $2, url, $3, now(), []);

-- [user.id, form.title, is_public_select]
