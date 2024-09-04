const Products = require("../models/Products");

exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 6;

  try {
    const productDocs = await Products.find({ product_status: "approve" })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalProducts = await Products.find({
      product_status: "approve",
    }).countDocuments();

    const totalpages = Math.ceil(totalProducts / perPage);

    if (!productDocs) {
      throw new Error("Products not found");
    }
    // console.log(productDocs);
    return res.status(200).json({
      isSuccess: true,
      message: "Products found",
      productDocs,
      totalProducts,
      totalpages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.filteredProducts = async (req, res) => {
  try {
    const { SearchKey, CategoryKey } = req.query;

    const query = {};

    if (SearchKey) {
      query.product_name = { $regex: SearchKey, $options: "i" };
    }
    if (CategoryKey) {
      query.product_category = CategoryKey;
    }

    const filtered_product = await Products.find(query);

    if (!filtered_product || filtered_product.length === 0) {
      throw new Error("Products not found");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Products found",
      filtered_product,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.productDetail = async (req, res) => {
  const { productID } = req.params;

  try {
    const detailDOC = await Products.findById(productID).populate(
      "product_seller",
      "email name"
    );
    if (!detailDOC) {
      throw new Error("Product detail can't be found");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Products found",
      detailDOC,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
