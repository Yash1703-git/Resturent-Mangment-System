const Order = require('../models/Order');
const Food = require('../models/Food');

const TAX_RATE = 0.05;
const DELIVERY_FEE = 30;

const createOrder = async (req, res, next) => {
  try {
    const { items, address } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'Cart empty' });
    // validate and snapshot prices from DB
    let subtotal = 0;
    const snapshots = [];
    for (const it of items) {
      const food = await Food.findById(it.foodId);
      if (!food) return res.status(400).json({ message: 'Food not found' });
      const price = food.price;
      const qty = Number(it.qty) || 1;
      snapshots.push({ foodId: food._id, title: food.title, price, qty });
      subtotal += price * qty;
    }
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const total = +(subtotal + tax + DELIVERY_FEE).toFixed(2);
    const order = await Order.create({
      userId: req.user._id,
      items: snapshots,
      subtotal,
      tax,
      deliveryFee: DELIVERY_FEE,
      total,
      addressSnapshot: address
    });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

const listMine = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

const adminList = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const orders = await Order.find(filter).populate('userId', 'name email').sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

const patchStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { next(err); }
};

module.exports = { createOrder, listMine, adminList, patchStatus };
