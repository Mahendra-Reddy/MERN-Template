const Product = require("../models/product");

const get = (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log(error));
};

const getById = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const set = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 *  discountPercentage
 *  10% and more
 *  20% and more
 *  30% and more
 *  40% and more
 */
const filter = async (req, res) => {
  try {
    console.log(req);
    const title = req.query.title || "";
    const brand = req.query.brand || "";
    const sortBy = req.query.sortBy === "asc" ? 1 : -1;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const description = req.query.description || "";
    const category = req.query.category || "";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 1000000;
    const discountPercentage = parseInt(req.query.discountPercentage) || 0;
    const products = await Product.aggregate([
      {
        $match: {
          $and: [
            { title: { $regex: title, $options: "i" } },
            { brand: { $regex: brand, $options: "i" } },
            { description: { $regex: description, $options: "i" } },
            { price: { $gte: minPrice, $lte: maxPrice } },
            { category: { $regex: category }},
            { discountPercentage: {$gte:discountPercentage} },
          ],
        },
      },
      {
        $facet: {
          data: [
            { $skip: page },
            { $sort: { title: sortBy } },
            { $limit: limit },
          ],
          pagination: [{ $count: "total" }],
        },
      },
    ]);

    res.send(products);
  } catch {
    res.status(500).send("internal server error");
  }
};
module.exports = {
  get,
  getById,
  set,
  filter,
};
