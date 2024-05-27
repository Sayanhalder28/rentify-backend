const { pool } = require("../config/db");

class Property {
  static async createProperty(
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
    sellerId
  ) {
    try {
      const sql = `INSERT INTO properties (title, description, area, pin, bedrooms, bathrooms, hospitalsNearby, collegesNearby, sellerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [result] = await pool.execute(sql, [
        title,
        description,
        area,
        pin,
        bedrooms,
        bathrooms,
        JSON.stringify(hospitalsNearby),
        JSON.stringify(collegesNearby),
        sellerId,
      ]);

      return result.insertId;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getAllProperties() {
    const [rows] = await pool.execute("SELECT * FROM properties");
    return rows;
  }

  static async getMyProperties(sellerId) {
    const [rows] = await pool.execute(
      "SELECT * FROM properties WHERE sellerId = ?",
      [sellerId]
    );

    return rows;
  }

  static async updateProperty(
    propertyId,
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
    userId
  ) {
    //check if property is owned by user and update
    const [property] = await pool.execute(
      "SELECT * FROM properties WHERE id = ? AND sellerId = ?",
      [propertyId, userId]
    );

    if (property.length === 0) {
      throw new Error("Property not found or unauthorized");
    }

    const sql = `UPDATE properties SET title = ?, description = ?, area = ?, pin = ?, bedrooms = ?, bathrooms = ?, hospitalsNearby = ?, collegesNearby = ? WHERE id = ?`;

    await pool.execute(sql, [
      title,
      description,
      area,
      pin,
      bedrooms,
      bathrooms,
      JSON.stringify(hospitalsNearby),
      JSON.stringify(collegesNearby),
      propertyId,
    ]);

    return true;
  }

  static async deleteProperty(propertyId, userId) {
    const [property] = await pool.execute(
      "SELECT * FROM properties WHERE id = ? AND sellerId = ?",
      [propertyId, userId]
    );

    if (property.length === 0) {
      throw new Error("Property not found or unauthorized");
    }

    await pool.execute("DELETE FROM properties WHERE id = ?", [propertyId]);

    return true;
  }

}

module.exports = Property;
