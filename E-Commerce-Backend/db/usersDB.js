const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// Create new user
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
  admin,
}) {
  // use bcrypt to "hash" a function by SALT_COUNT to create unique hashedPassword that is more secure
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    if (admin) {
      const {
        rows: [user],
      } = await client.query(
        `
      INSERT INTO users(username, password, first_name, last_name, pname, address, apartment, city, state, zip, phone, email, admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
          admin,
        ]
      );
      return user;
    } else {
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
    }
  } catch (error) {
    throw error;
  }
}

// Get user by username, made to see if user exists?
async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT username, password, id
    FROM users
    WHERE username = $1;
    `,
      [userName]
    );
    if (!user || !Object.keys(user).length) return null;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
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
    if (!user) return null;
    // delete user.password;
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

async function deleteUser(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `,
      [userId]
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
  deleteUser,
};
