const { pool } = require("../config/db");

class User {
  static async createUser(
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    userRole
  ) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (email, password, first_name, last_name, phone_number, user_role) VALUES (?, ?, ?, ?, ?, ?)",
        [email, password, firstName, lastName, phoneNumber, userRole]
      );
      return result.insertId;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("User with this email already exists");
      } else {
        throw error;
      }
    }
  }

  static async getUserByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
}

module.exports = User;
