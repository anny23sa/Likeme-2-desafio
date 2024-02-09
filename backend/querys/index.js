const selectAllPosts = `SELECT * FROM posts;`;

const createNewPost = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES
    ($1, $2, $3, $4) RETURNING *`;

const getPost = 'SELECT * FROM posts WHERE id = $1';
const updatePost =
	'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *';

const deletePost = 'DELETE FROM posts WHERE id = $1 RETURNING *'; // Agregado


module.exports = {
	selectAllPosts,
	createNewPost,//post
	getPost,//verifyPostExist,//get
	updatePost,//put
    deletePost,//delete
};




