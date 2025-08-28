import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Utility Function
function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce((acc, item) => {
    console.log(item.price, item.qty);
    return acc + Number(item.price) * Number(item.qty);
  }, 0);
  console.log(itemsPrice);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = itemsPrice * taxRate;
  const totalPrice = itemsPrice + shippingPrice + parseFloat(taxPrice);
  return {
    itemsPrice: Number(itemsPrice),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
}

export const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) =>
          itemFromDB._id.toString() === itemFromClient._id.toString()
      );
      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }
      return {
        ...matchingItemFromDB,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        qty: itemFromClient.qty,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const getUserOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const countTotalOrders = asyncHandler(async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    return res.json({ totalOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const calculateTotalSales = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return res.json({ totalSales });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const calculateTotalSalesByDate = asyncHandler(
  async (req, res, next) => {
    console.log("Hello");
    try {
      const salesByDate = await Order.aggregate([
        { $match: { isPaid: true } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
            },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);
      return res.json(salesByDate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export const findOrderById = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (order) {
      return res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found.");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      console.log(req.body);
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, error_: error });
  }
});

export const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.delivereddAt = Date.now();
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found.");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
