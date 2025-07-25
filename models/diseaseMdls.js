const db = require("../utils/blogMySql");
const { v4: uuidv4 } = require("uuid");

module.exports = class Disease {
  constructor(title, description, image) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.image = image;
    this.type = "disease";
  }

  save() {
    return db.execute(
      "INSERT INTO disease (id, title, description, image, type) VALUES (?, ?, ?, ?, ?)",
      [this.id, this.title || "", this.description || "", this.image || null, this.type]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM disease ORDER BY id DESC");
  }

  static findById(id) {
    return db.execute("SELECT * FROM disease WHERE id = ?", [id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM disease WHERE id = ?", [id]);
  }

  static update(id, title, description, image, type) {
    return db.execute(
      "UPDATE disease SET title = ?, description = ?, image = ? WHERE id = ? AND type = ?",
      [title, description, image, id, type]
    );
  }

  // For Disease
  static fetchLimited(limit) {
    return db.execute(
      `SELECT * FROM disease ORDER BY id ASC LIMIT ${Number(limit)}`
    );
  }
};
