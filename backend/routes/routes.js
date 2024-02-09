const { getPostController } = require('../controller');

const { createNewPostController } = require('../controller');
const { createNewPostMiddleware } = require('../middleware');
const { updatePostController } = require('../controller');
const { updatePostMiddleware } = require('../middleware');
const { deletePostController } = require('../controller');
const { deletePostMiddleware } = require('../middleware');

const router = require('express').Router();

router.get('/posts', getPostController);
router.post('/posts', createNewPostMiddleware, createNewPostController);
router.put('/posts/:id', updatePostMiddleware, updatePostController);
router.delete('/posts/:id', deletePostMiddleware, deletePostController);

module.exports = router;
