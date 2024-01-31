//! Imported Libraries --------------------------
const express = require("express");
const productsRouter = express.Router();
// const requireUser = require("./utils");
//! ---------------------------------------------

//! Imported Components/Variables----------------
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  verifyProduct,
  updateProduct,
  updateProductAvailability,
  deleteProduct,
  getProductByTitle,
} = require("../db/productsDB");
const { requireUser, requireAdmin } = require("./utils");
//! ---------------------------------------------

//* -----------------GET ALL API-----------------
// Get All Products
// http://localhost:3000/api/products/
productsRouter.get("/", async (req, res, next) => {
  console.log("IN GET PRODUCTS API");
  try {
    const allProducts = await getAllProducts();
    res.send({ allProducts });
  } catch ({ title, message }) {
    console.log(
      `An Error ocurred within the poductsRouter.get('/') API Route, ${{
        title,
        message,
      }}`
    );
    next({
      error: err,
      message: `Failed to fetch all items. Please reattempt or contact support via the Contact Us page.`,
    });
  }
});
//* -----------------GET ALL API-----------------

//* ---------------GET SINGLE API----------------
// Get Product by ID
// http://localhost:3000/api/products/:productId
productsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleProduct = await getSingleProduct(id);
    res.send({ singleProduct });
  } catch (err) {
    console.log(
      `An Error ocurred in productsRouter.get('/:id') API Route, ${err}`
    );
    next({
      error: err,
      message: `Failed to fetch single item details. Please reattempt or contact support via the Contact Us page.`,
    });
  }
});
//* ---------------GET SINGLE API----------------

//* -------------CREATE PRODUCT API--------------
// Create new product
// http://localhost:3000/api/products
productsRouter.post("/", requireUser, requireAdmin, async (req, res, next) => {
  const { title, price, description, category, image } = req.body;
  const sellerId = req.user.id;
  console.log(title);
  if (!req.user.admin) {
    res.send({
      name: "Member Feature",
      message: "Must be a member to add new items to our catalog.",
    });
    return;
  }
  try {
    const newProduct = await getProductByTitle(title);
    console.log({ newProduct });

    if (newProduct && newProduct.available === true) {
      next({
        name: "DuplicateProductDetected",
        message: `${newProduct.title} already exists. Please update the existing product. Find item by ID: ${newProduct.id}`,
      });
    } else if (newProduct && newProduct.available === false) {
      await updateProductAvailability(newProduct.id, true);
      res.send({
        name: "UpdateProductAvailSuccess",
        message: `${title} already existed in the catalog and has been made available again! To edit/update this item, go to your admin page.`,
        product: newProduct,
      });
    } else {
      const addedProduct = await createProduct({
        title,
        price,
        description,
        category,
        image,
        sellerId,
      });

      res.send({
        name: "AddProductSuccess",
        message: `${title} has been added to the catalog. To edit/update this item, go to your admin page.`,
      });
    }
  } catch (err) {
    console.log(`An Error ocurred in the productsRouter.post('/'), ${err}`);
    next({
      error: err,
      message: `Failed to create new item. Please reattempt or contact support via the Contact Us page.`,
    });
  }
});
//* -------------CREATE PRODUCT API--------------

//* -------------UPDATE PRODUCT API--------------
// Edit product by id
// http://localhost:3000/api/products/:productId
productsRouter.patch("/:id", requireUser, async (req, res, next) => {
  //! -------- To update the product the req will have to include the following:
  const { id } = req.params;
  console.log("productId and req.params.id: ");
  console.log({ id });
  console.log(typeof id);
  const { userId, title, price, description, category, image, available } =
    req.body;

  console.log(req.body);
  console.log({ available });
  //TODO ---- userId will have to be included in the req.body
  //! --------------------------------------------------------------------------

  const updateFields = {};

  //Combining the different req.body values based on if there is a value > 0
  //and redefining it for consumption as a new array
  if (title && title.length > 0) {
    updateFields.title = title;
  }
  if (price && price.length > 0) {
    updateFields.price = price;
  }
  if (description && description.length > 0) {
    updateFields.description = description;
  }
  if (category && category.length > 0) {
    updateFields.category = category;
  }
  if (image && image.length > 0) {
    updateFields.image = image;
  }

  if (available !== null || available !== undefined) {
    console.log({ available });
    updateFields.available = available;
  }

  console.log("UPDATE FIELDS");
  console.log({ updateFields });

  try {
    const originalProductDetails = await getSingleProduct(id);

    if (originalProductDetails.sellerid === req.user.id || req.user.admin) {
      const updatedProduct = await updateProduct(id, updateFields);
      res.send({ product: updatedProduct });
    } else {
      console.log(`Unauthorized Attempt to edit item ${productId}`);
      next({
        name: "UnauthorizedItemEdit",
        message: `This attempt to edit this item (${productId}) is Unauthorized, please log in to edit this item.`,
      });
    }
  } catch (err) {
    console.log(`An Error ocurred in productsRouter.patch('/') (API), ${err}`);
    next({
      error: err,
      message: `${title} failed to update. Please reattempt or contact support via the Contact Us page.`,
    });
  }
});
//* -------------UPDATE PRODUCT API--------------

//* -------------DELETE PRODUCT API--------------
// Delete Product
// http://localhost:3000/api/products/:productId
productsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const productToDelete = await getSingleProduct(productId);
    if (!productToDelete) {
      next({
        name: "ProductNotFound",
        message:
          "We were not able to find the product you were trying to delete.",
      });
    } else {
      const { title, sellerid } = productToDelete;
      //Validation that the user deleting this item is the original seller
      if (req.user.id === sellerid || req.user.admin) {
        const deletedProduct = await deleteProduct(productId);
        res.send({ success: true, ...deletedProduct });
      } else {
        next({
          name: "NotAuthorizedSeller",
          message:
            "Must be the original seller or SysAdmin to delete this item.",
        });
      }
    }
  } catch (err) {
    console.log(
      `An Error ocurred in productsRouter.delete('/:id') (API), ${err}`
    );
    next({
      error: err,
      message: `${title} failed to delete. Please reattempt or contact support via the Contact Us page.`,
    });
  }
});

//* -------------DELETE PRODUCT API--------------

module.exports = productsRouter;
