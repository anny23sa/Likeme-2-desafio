const db = require('../config/db');
const { createNewPost, updatePost, deletePost } = require('../querys');




   //Read (post)
const getPostController = async(req, res)=>{
    try {
        const {rows} = await db.query('SELECT * FROM posts');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener publicaciones', error.message);
        throw new Error('Error al obtener publicaciones');
    } 
};   
 
const createNewPostController = async (req, res, next) => {
    const { titulo, img, descripcion, likes } = req.body;

    try {
        const values = [titulo, img, descripcion, likes];
        const result = await db.query(createNewPost, values);
        const newPost = result.rows[0];

        return res.status(201).json({
            status: 'Created',
            msg: 'Post agregado con éxito',
            newPost,
        });
    } catch (error) {
        console.error('Error al agregar el nuevo post:', error.message);
        next(error);
    }
};



const updatePostController = async (req, res, next) => {
	const { data } = req;
	const { post, postExist } = data;

	try {
		const titulo = req.body.titulo || post.titulo;
		const img = req.body.img || post.img;
		const descripcion = req.body.descripcion || post.descripcion;

		let likes;

		if (req.body.likes !== undefined && req.body.likes === true) {
			likes = Number(post.likes + 1);
			console.log(likes, 'if');
		} else if (req.body.likes != undefined && req.body.likes === false) {
			if (post.likes == null) {
				likes = 0;
			} else if (post.likes > 0) {
				likes = Number(post.likes - 1);
			} else {
				likes = 0;
			}
		} else {
			likes = Number(post.likes);
		} 

		const values = [titulo, img, descripcion, likes, post.id];

		if (postExist) {
			const post_query = await db.query(updatePost, values);
			const postUpdated = post_query.rows[0];
			if (post) {
				res.status(200).json({
					status: 'Success',
					msg: 'Post updated',
					post: postUpdated,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};

const deletePostController = async (req, res, next) =>{
        try{
            const {postExist, post} =req.data;
        if (!postExist || !post){
            return res.status(404).json({
                status: 'Not Found',
                msg: 'Post no existe',
            });
        }
            const result = await db.query(deletePost,[post.id]);
            const deletePost2 =result.rows[0];
            return res.status(200).json({
                status:'Success',
                msg:'Post eliminado con exito',
                data:deletePost2,
            });
    } catch (error){
        next(error)
    }
};

module.exports = {
	createNewPostController, getPostController, updatePostController, deletePostController
}