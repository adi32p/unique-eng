const News = require("../models/News");

/* 🔹 Create News (Admin) */
exports.createNews = async (req, res) => {
  try {
    const { title, excerpt, content, category, featured } = req.body;

    const news = await News.create({
      title,
      excerpt,
      content,
      category,
      featured,
    });

    res.status(201).json({
      message: "News published successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Get All News (Public) */
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Get Single News */
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Update News (Admin) */
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "News updated",
      news,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔹 Delete News (Admin) */
exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
