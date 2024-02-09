const db = require('../config/db');
const { getPost} = require('../querys');

//obtener datos de la nueva publicacion
         
const createNewPostMiddleware = async (req, res, next) => {
    const { titulo, img, descripcion } = req.body;

    try {
        if (!titulo) {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'El titulo es requerido'
            });
        }

        if (!img) {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'La imagen es requerida'
            });
        }

        if (!descripcion) {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'La descripción es requerida'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};
          
const updatePostMiddleware = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			const values = [id];
			const query_result = await db.query( getPost, values)   //(verifyPostExist, values);
			const post = query_result.rows[0];

			if (!post) {
				return res.status(400).json({
					status: 'Bad Request',
					msg: 'El ID no existe',
				});
			} else {
				req.data = {
					postExist: true,
					post,
				};
				next();
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				msg: 'El ID es requerido',
			});
		}
	} catch (error) {
		next(error);
	}
};

const deletePostMiddleware = async (req, res, next) => {
	const { id } = req.params;

	try {
		if (id) {
			const values = [id];
			const queryResult = await db.query(getPost, values);
			const post = queryResult.rows[0];

			if (!post) {
				return res.status(404).json({
					status: 'Not Found',
					msg: 'El ID no existe',
				});
			} else {
				req.data = {
					postExist: true,
					post,
				};
				next();
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				msg: 'El ID es requerido',
			});
		}
	} catch (error) {
		next(error);
	}
};


module.exports = {
    createNewPostMiddleware, updatePostMiddleware, deletePostMiddleware
};
