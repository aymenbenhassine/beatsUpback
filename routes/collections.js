const router = require("express").Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newCollection = new Collection(req.body);
  try {
    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCollection);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.status(201).json("The collection has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

// GET

router.get("/", verify, async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// PAGINATE

router.get("/paginate", async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 1;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Collection.countDocuments({});
    const collections = await Collection.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: collections,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// SEARCH

router.get("/search", async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const collections = await Collection.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: collections });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id/likeCollection/:userId", verify, async (req, res) => {
  const { id } = req.params;

  if (!req.params.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No collection with id: ${id}`);

  const collection = await Collection.findById(id);

  const index = collection.likes.findIndex(
    (id) => id === String(req.params.userId)
  );

  if (index === -1) {
    collection.likes.push(req.params.userId);
  } else {
    collection.likes = collection.likes.filter(
      (id) => id !== String(req.params.userId)
    );
  }
  const updatedCollection = await Collection.findByIdAndUpdate(id, collection, {
    new: true,
  });
  res.status(200).json(updatedCollection);
});

module.exports = router;
