const client = require("./client");
const { createProduct } = require("./products");
const { createReview } = require("./reviews");
const { createUser } = require("./users");

async function dropTables() {
  console.log("Dropping all tables");
  // Drop all tables in the correct order
  try {
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // Create all tables in the correct order
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      category VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL
    );
    `);

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    )`);

    await client.query(`
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      title VARCHAR(255) NOT NULL,
      comment TEXT NOT NULL
    )`);

    console.log("Finished building tables");
  } catch (error) {
    console.log("Error building tables!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const productsToCreate = [
      {
        name: "Cat",
        category: "Feline",
        description: "It's a cat.",
        price: 100,
      },
      {
        name: "Dog",
        category: "Canine",
        description: "It's a Dog.",
        price: 50,
      },
      {
        name: "KOTOR",
        category: "Video Game",
        description: "Best Game Ever",
        price: 60,
      },
      {
        name: "Kirby",
        category: "Video Game",
        description: "A classic video game",
        price: 100,
      },
      {
        name: "PS5",
        category: "Electronics",
        description: "Sony's video game console",
        price: 500,
      },
      {
        name: "Xbox Series X",
        category: "Electronics",
        description: "Microsoft video game console",
        price: 500,
      },
      {
        name: "Nintendo Switch",
        category: "Electronics",
        description: "Nintendo video game console",
        price: 300,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("products created:");
    console.log(products);

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating activities!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "daniel", password: "daniel43", name: "Daniel Boone" },
      { username: "brock", password: "brock123", name: "Brock Purdy" },
      { username: "dave", password: "dave123", name: "Dave Crocket" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialReviews() {
  try {
    console.log("starting to create reviews");

    const reviewsToCreate = [
      {
        creatorId: 1,
        productId: 1,
        title: "I love cats",
        comment: "Cats are amazing and I highly recommend them! 5 stars!",
      },
      {
        creatorId: 2,
        productId: 4,
        title: "I love kirby",
        comment:
          "Getting to suck stuff up as Kirby is so fun! I just can't get enough sucking!!!",
      },
      {
        creatorId: 3,
        productId: 5,
        title: "I love PS5",
        comment: "This is so great and a huge upgrade from my sega saturn.",
      },
    ];
    const reviews = await Promise.all(
      reviewsToCreate.map((review) => createReview(review))
    );
    console.log("Comments Created", reviews);
    console.log("Finished creating reviews");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialReviews();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
