const insertReview = `INSERT INTO review(review_node,rating) VALUES (?, ?);`;

module.exports = { insertReview }