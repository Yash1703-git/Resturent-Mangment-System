const Food = require('../models/Food');

const listFoods = async (req, res, next) => {
  try {
    const { q, minPrice, maxPrice, category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    const skip = (page -1) * limit;
    const [total, items] = await Promise.all([
      Food.countDocuments(filter),
      Food.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 })
    ]);
    res.json({ total, items });
  } catch (err) { next(err); }
};

const getFood = async (req, res, next) => {
  try { const item = await Food.findById(req.params.id); if(!item) return res.status(404).json({message:'Not found'}); res.json(item); } catch(err){next(err);}
};

const createFood = async (req, res, next) => {
  try {
    const data = req.body;
    const food = await Food.create(data);
    res.status(201).json(food);
  } catch (err) { next(err); }
};
const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(food);
  } catch (err) { next(err); }
};
const deleteFood = async (req, res, next) => {
  try { await Food.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { next(err); }
};

module.exports = { listFoods, getFood, createFood, updateFood, deleteFood };
