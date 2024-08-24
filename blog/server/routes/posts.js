import express from 'express';
import fs from 'fs';
import { uploadMiddleware } from '../middleware/upload.js';
import { verifyToken } from '../middleware/auth.js';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/post', verifyToken, uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author: req.user.id,
  });
  res.json(postDoc);
});

router.put('/post', verifyToken, uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { id, title, summary, content } = req.body;

  const updateFields = {
    title,
    summary,
    content,
    cover: newPath || undefined
  };

  const postDoc = await Post.findById(id);
  if (!postDoc) {
    return res.status(404).json('Post not found');
  }

  const isAuthor = postDoc.author.equals(req.user.id);
  if (!isAuthor) {
    return res.status(403).json('You are not the author');
  }

  const updatedPost = await Post.findByIdAndUpdate(id, updateFields, { new: true });

  res.json(updatedPost);
});

router.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

router.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

export default router;
