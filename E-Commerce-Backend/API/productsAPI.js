//! Imported Libraries --------------------------
const express = require("express");
const productsRouter = express.Router();
//! ---------------------------------------------

//! Imported Components/Variables----------------
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  verifyProduct,
  updateProduct,
} = require("../db/products");
//! ---------------------------------------------

//* -----------------GET ALL API-----------------
productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();
    res.send({ allProducts });
  } catch ({title, message}) {
    console.log(
      `An Error ocurred within the poductsRouter.get('/') API Route, ${{title, message}}`
    );
    next({title, message});
  }
});
//* -----------------GET ALL API-----------------

//* ---------------GET SINGLE API----------------
productsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const singleProduct = await getSingleProduct(id);
        res.send({ singleProduct });
    } catch (err) {
        console.log(`An Error ocurred in productsRouter.get('/:id') API Route, ${err}`);
        next(err);
    }
});
//* ---------------GET SINGLE API----------------

//* -------------CREATE PRODUCT API--------------
productsRouter.post('/', (req, res, next) => {
    const { title, price, description, category, image } = req.body;
    try {

        const newProduct = await verifyProduct(title, description, category);
        
        if (newProduct) {
            next({
              name: {title},
              message: `${newItem.title} already exists. Please update the existing product. Find item by ID: ${newItem.id}`
            })
        }

        const addedProduct = await createProduct({
            title, 
            price, 
            description, 
            category, 
            image
        })

        res.send({
            message: `${title} has been added to the catalog, to edit/update this item. Go to your account details and access your added items there.`
        })
    } catch (err) {
        console.log(`An Error ocurred in the productsRouter.post('/'), ${err}`);
        next(err);
    }
});
//* -------------CREATE PRODUCT API-------------- 

//* -------------UPDATE PRODUCT API-------------- 
productsRouter.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;

    const updateFields = {};

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
        //! ----------------------------------------------------
        //! ----------------------------------------------------WORKING HERE!
        //! ----------------------------------------------------WORKING HERE!
        //! ----------------------------------------------------

    } catch (err) {
        console.log(`An Error ocurred in productsRouter.patch('/') (API), ${err}`);
        next({
            error: err,
            message: `${title} failed to update. Please reattempt or contact support via the Contact Us page.`
        });
  }
})
//* -------------UPDATE PRODUCT API-------------- 