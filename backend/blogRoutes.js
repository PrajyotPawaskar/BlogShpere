const express = require("express");
const router = express.Router();
const Blog = require("./Blog");
router.post('/write', async (req, res) => {
    const { title, content, imageUrl, category, username } = req.body;
    try {
        const blog = new Blog({ title, content, imageUrl, category, username });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({
            msg: "Server Error"
        });
    }
});

router.get('/read', async (req, res) => {
    try {
        const blogs = await Blog.find().populate();
        res.json(blogs);
        
    } catch (error) {
        res.status(500).json({
            msg: "Server Error"
        });
    }
});

router.get('/read/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const singleBlogData = await Blog.findById(id);
        if (!singleBlogData) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.json(singleBlogData);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;