import Tutorial from "../models/Tutorial.js";

// Create tutorial
export const createTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });

    res.status(201).json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tutorials
export const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate("user", "name email");
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tutorial
export const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate("user", "name");

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update tutorial (owner only)
export const updateTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    if (tutorial.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    tutorial.title = req.body.title || tutorial.title;
    tutorial.content = req.body.content || tutorial.content;

    const updated = await tutorial.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete tutorial
export const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    if (tutorial.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await tutorial.deleteOne();

    res.json({ message: "Tutorial deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};