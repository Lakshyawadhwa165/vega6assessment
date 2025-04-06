const db = require('../../Database/Database.js');

exports.addBlog = (req, res) => {
  const { title, description } = req.body;
  const blogImage = req.file?.filename;
  const userId = req.user.id;

  db.query(
    'INSERT INTO blogs (userId, title, description, blogImage) VALUES (?, ?, ?, ?)',
    [userId, title, description, blogImage],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ msg: 'Blog created' });
    }
  );
};

exports.getBlogs = (req, res) => {
  db.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getBlogById = (req, res) => {
  db.query('SELECT * FROM blogs WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

exports.updateBlog = (req, res) => {
  const { title, description } = req.body;
  const blogImage = req.file?.filename;
  const blogId = req.params.id;

  db.query(
    'UPDATE blogs SET title = ?, description = ?, blogImage = ? WHERE id = ?',
    [title, description, blogImage, blogId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: 'Blog updated' });
    }
  );
};

exports.deleteBlog = (req, res) => {
  db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Blog deleted' });
  });
};
