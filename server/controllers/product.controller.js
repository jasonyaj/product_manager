// import in product model
const Product = require("../models/product.model");

// READ ALL
module.exports.getAll = (req, res) => {
  Product.find()
    .then((allProducts) => {
      res.json({ Products: allProducts });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// READ ONE
module.exports.getOne = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((oneSingleProduct) => {
      res.json({ Product: oneSingleProduct });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// CREATE
module.exports.create = (req, res) => {
  Product.create(req.body)
    .then((newProduct) => {
      res.json({ Product: newProduct });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// UPDATE
module.exports.update = (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedProduct) => {
      res.json({ Product: updatedProduct });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// DELETE
module.exports.delete = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
