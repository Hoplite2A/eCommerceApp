const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ username, password, name }) {
  // use bcrypt to "hash" a function by SALT_COUNT to create unique hashedPassword that is more secure
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, name) VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username
    `,
      [username, hashedPassword, name]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  // Get user
  try {
    // Try to get username directly first, if doesnt work go to the delete password method
    const { rows } = await client.query(
      `
    SELECT username
    FROM users
    WHERE username = $1;
    `,
      [userName]
    );
    // If it doesnt exist return null
    if (!rows || !rows.length) return null;
    // if it exists, delete password from return object
    // delete user.password
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
};
