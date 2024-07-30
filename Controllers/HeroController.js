const Hero = require("../Models/HeroSchema");
const asyncHandler = require("express-async-handler");

// Create a new HeroBanner
const createHero = asyncHandler(async (req, res) => {
  console.log('khsfjdffl')
  try {
    // const { images } = req.body;
    console.log(req.file)
    const image = req.file.path
    const newHero = new Hero({ images: image });
    await newHero.save();
    res.status(201).json({
      success: true,
      message: "banner page created"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});




// Get all HeroBanners
const getHero = asyncHandler(async (req, res) => {
  try {
    const Heros = await Hero.find();
    res.status(200).json(Heros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// Delete a HeroBanner
const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: "HeroBanner not found" });
    res.status(200).json({ message: "HeroBanner deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = { createHero, getHero, deleteBanner };
