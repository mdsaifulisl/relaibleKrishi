const db = require("../utils/blogMySql");
const { v4: uuidv4 } = require("uuid");

module.exports = class Blog {
  constructor(title, description, image) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.image = image;
    this.type = "blog";
  }

  save() {
    return db.execute(
      "INSERT INTO blog (id, title, description, image, type) VALUES (?, ?, ?, ?, ?)",
      [
        this.id,
        this.title || "",
        this.description || "",
        this.image || null,
        this.type,
      ]
    );
  }

  // Fetch all blogs
  static fetchAll() {
    return db.execute("SELECT * FROM blog ORDER BY id DESC");
  }

  static findById(id) {
    return db.execute("SELECT * FROM blog WHERE id = ?", [id]);
  }

  static delete(id) {
    return db.execute("DELETE FROM blog WHERE id = ?", [id]);
  }

  static update(id, title, description, image, type) {
    return db.execute(
      "UPDATE blog SET title = ?, description = ?, image = ? WHERE id = ? AND type = ?",
      [title, description, image, id, type]
    );
  }

  // For Blog
  static fetchLimited(limit) {
    return db.execute(
      `SELECT * FROM blog ORDER BY id ASC LIMIT ${Number(limit)}`
    );
  }
};
