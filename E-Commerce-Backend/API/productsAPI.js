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
  deleteProduct,
  getProductByTitle,
} = require("../db/productsDB");
const { requireUser } = require("./utils");
//! ---------------------------------------------

//* -----------------GET ALL API-----------------
productsRouter.get("/", async (req, res, next) => {
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
// Need to add require user back here once I get it running
productsRouter.post("/", async (req, res, next) => {
  const { title, price, description, category, image, sellerId } = req.body;
  if (!req.user.admin) {
    res.send({
      name: "Member Feature",
      message: "Must be a member to add new items to our catalog.",
    });
    return;
  }
  try {
    const newProduct = await getProductByTitle(title);

    if (newProduct) {
      next({
        name: "DuplicateProductDetected",
        message: `${newProduct.title} already exists. Please update the existing product. Find item by ID: ${newProduct.id}`,
      });
    }

    const addedProduct = await createProduct({
      title,
      price,
      description,
      category,
      image,
      sellerId,
    });

    res.send({
      message: `${title} has been added to the catalog, to edit/update this item. Go to your account details and access your added items there.`,
    });
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
// Add back requireUser
// ONly need double veryify on log in

productsRouter.patch("/:id", async (req, res, next) => {
  //! -------- To update the product the req will have to include the following:
  const { productId } = req.params;
  const { userId, title, price, description, category, image } = req.body;
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

  try {
    const originalProductDetails = await getSingleProduct(id);

    if (originalProductDetails.owner.id === userId) {
      const updatedProduct = await updateProduct(productId, updateFields);
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
// Add back requireUser
productsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  //TODO ---- requireUser in async params???????????
  const { productId } = req.params;
  const productToDelete = await getSingleProduct(productId);
  const { title, sellerid } = productToDelete;

  try {
    //Validation that the user deleting this item is the original seller
    if (req.user.id === sellerid || req.user.admin) {
      const deletedProduct = await deleteProduct(productId);
      res.send({ success: true, ...deletedProduct });
    } else {
      next({
        name: "NotAuthorizedSeller",
        message: "Must be the original seller or SysAdmin to delete this item.",
      });
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