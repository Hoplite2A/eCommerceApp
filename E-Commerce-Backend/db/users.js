const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({
  username,
  password,
  fName,
  lName,
  pName,
  streetAddress,
  apt,
  city,
  state,
  zip,
  phone,
  email,
}) {
  // use bcrypt to "hash" a function by SALT_COUNT to create unique hashedPassword that is more secure
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, first_name, last_name, pname, address, apartment, city, state, zip, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *
    `,
      [
        username,
        hashedPassword,
        fName,
        lName,
        pName,
        streetAddress,
        apt,
        city,
        state,
        zip,
        phone,
        email,
      ]
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
    SELECT username, password, id
    FROM users
    WHERE username = $1;
    `,
      [userName]
    );
    // If it doesnt exist return null
    if (!rows || !rows.length) return null;
    // if it exists, delete password from return object
    // delete user.password
    const [user] = rows;
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
    console.log(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    console.log(user);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1;
      `,
      [userId]
    );
    if (!user)
      throw {
        name: "UserNotFoundError",
        message: "A username with that id does not exist",
      };
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
  getUserById,
  updateUser,
};
