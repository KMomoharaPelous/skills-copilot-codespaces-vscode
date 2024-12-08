// Create web server
const express = require('express');
const commentsRouter = express.Router();
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../db');

commentsRouter.get('/', async (req, res, next) => {
    try {
        const comments = await getComments();
        res.send(comments);
    } catch (error) {
        next(error);
    }
});

commentsRouter.get('/:commentId', async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const comment = await getCommentById(commentId);
        res.send(comment);
    } catch (error) {
        next(error);
    }
});

commentsRouter.post('/', async (req, res, next) => {
    const { authorId, postId, content } = req.body;
    const commentData = {};
    commentData.authorId = authorId;
    commentData.postId = postId;
    commentData.content = content;
    try {
        const newComment = await createComment(commentData);
        res.send(newComment);
    } catch (error) {
        next(error);
    }
});

commentsRouter.patch('/:commentId', async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const updateFields = {};
    updateFields.id = commentId;
    updateFields.content = content;
    try {
        const updatedComment = await updateComment(updateFields);
        res.send(updatedComment);
    } catch (error) {
        next(error);
    }
});

commentsRouter.delete('/:commentId', async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const deletedComment = await deleteComment(commentId);
        res.send(deletedComment);
    } catch (error) {
        next(error);
    }
});

module.exports = commentsRouter;