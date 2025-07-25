const fs = require("fs");
const path = require("path");
const rootDr = require("../utils/rootDr");

const Blog = require("../models/blogs");
const Disease = require("../models/diseaseMdls");
const Technology = require("../models/technologyMdls");
const Contact = require("../models/contactMdls");

exports.getAddBlog = (req, res, next) => {
  res.render("host/addBlog", { title: "Add blog", path: "/blog" });
};

exports.postAddBlog = (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file ? "/blogs/" + req.file.filename : null; // ✅ never undefined

  if (!title || !description) {
    return res.status(400).send("Title and description are required.");
  }

  const blog = new Blog(title, description, image);

  blog
    .save()
    .then(() => res.redirect("/blog"))
    .catch((err) => {
      console.error("❌ Blog Save Error:", err);
      res.status(500).send("Error saving blog.");
    });
};

// Delete blog
exports.deleteBlog = (req, res, next) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(([rows]) => {
      const blog = rows[0];
      const imagePath = path.join(__dirname, "..", "public", blog.image);

      Blog.delete(id)
        .then(() => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("⚠️ Could not delete image:", err.message);
            } else {
              console.log("✅ Image deleted");
            }
          });

          res.redirect("/blog");
        })
        .catch((err) => {
          console.error("❌ Blog Delete Error:", err);
          res.status(500).send("Error deleting blog.");
        });
    })
    .catch((err) => {
      console.error("❌ Find Blog Error:", err);
      res.status(500).send("Internal server error.");
    });
};

// get edit page
exports.getEditBlogs = (req, res, next) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(([blog]) => {
      res.render("host/update", {
        title: "Edit Blog",
        path: "/blog",
        blog: blog[0],
      });
    })
    .catch((err) => {
      console.error("Error fetching blog for edit:", err);
      res.status(500).render("500", {
        title: "Server Error",
        path: "/500",
      });
    });
};

// update Blogs
exports.updateBlog = (req, res, next) => {
  const id = req.params.id;
  const { title, description, type } = req.body;
  const oldImage = req.body.currentImg;
  let image;

  if (req.file) {
    image = `/blogs/${req.file.filename}`;

    const oldImagePath = path.join(__dirname, "..", "public", oldImage);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("❌ Error deleting old image:", err);
      } else {
        console.log("👍 Old image deleted");
      }
    });
  } else {
    image = oldImage;
  }

  Blog.update(id, title, description, image, type)
    .then(() => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.error("Error updating blog:", err);
      res.status(500).render("500", { title: "Server Error", path: "/500" });
    });
};

// ===== getAddDisease ===== //

exports.getAddDisease = (req, res, next) => {
  res.render("host/addDisease", { title: "Add Disease", path: "/disease" });
};

exports.postAddDisease = (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file ? "/disease/" + req.file.filename : null;
  const disease = new Disease(title, description, image);
  disease
    .save()
    .then(() => res.redirect("/disease"))
    .catch((err) => {
      console.error("❌ Blog Save Error:", err);
      res.status(500).send("Error saving blog.");
    });
};

// delate disease
exports.deleteDisease = (req, res, next) => {
  const id = req.params.id;

  Disease.findById(id).then(([rows]) => {
    const disease = rows[0];
    const imagePath = path.join(__dirname, "../public", disease.image);

    Disease.delete(id)
      .then(() => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted");
          }
        });
        res.redirect("/disease");
      })
      .catch((err) => {
        console.error("❌ Blog Delete Error:", err);
      });
  });
};

//get update
exports.getEditDisease = (req, res, next) => {
  const id = req.params.id;
  Disease.findById(id).then(([disease]) =>
    res.render("host/getDiseasesUpdate", {
      title: "Update Disease",
      path: "/disease",
      disease: disease[0],
    })
  );
};

// post update disease
exports.updateDisease = (req, res, next) => {
  const id = req.params.id;
  const { title, description, type} = req.body;
  const oldImage = req.body.currentImg;
  let image;

  if (req.file) {
    image = `/disease/${req.file.filename}`;

    const oldImagePath = path.join(__dirname, "../public", oldImage);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("update success old image deleted");
      }
    });
  } else {
    image = oldImage;
  }

  Disease.update(id, title, description, image, type)
    .then(() => res.redirect("/disease"))
    .catch((err) => {
      console.error("❌ disease Update Error:", err);
      res.status(500).send("Update failed.");
    });
};

// ======== Technology ======== //

exports.getAddTechnology = (req, res, next) => {
  res.render("host/addTechnology", {
    title: "Add Technology",
    path: "/technology",
  });
};

// post add technology
exports.postAddTechnology = (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file ? "/technology/" + req.file.filename : null;
  const technology = new Technology(title, description, image);
  technology
    .save()
    .then(() => res.redirect("/technology"))
    .catch((err) => {
      console.error("❌ Technology Add Error:", err);
    });
};

// delete technology
exports.deleteTechnology = (req, res, next) => {
  const id = req.params.id;
  Technology.findById(id)
    .then(([rows]) => {
      const technology = rows[0];
      const imagePath = path.join(__dirname, "..", "public", technology.image);

      Technology.delete(id)
        .then(() => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("❌ Technology Delete Error:", err);
            } else {
              console.log("Technology deleted");
            }
          });
          res.redirect("/technology");
        })
        .catch((err) => {
          console.error("❌ Technology Delete Error:", err);
        });
    })
    .catch((err) => {
      console.error("❌ Technology Delete Error:", err);
    });
};

// get page update technology
exports.getEditTechnology = (req, res, next) => {
  const id = req.params.id;
  Technology.findById(id).then(([technology]) =>
    res.render("host/getTechnologyUpdate", {
      title: "Edit Technology",
      path: "/technology",
      blog: technology[0],
    })
  );
};
// post update technology
exports.updateTechnology = (req, res, next) => {
  const id = req.params.id;
  const { title, description, type } = req.body;
  const oldImage = req.body.currentImg;
  let image;

  if (req.file) {
    image = `/technology/${req.file.filename}`;

    const oldImagePath = path.join(__dirname, "..", "public", oldImage);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("❌ Update Technology Error:", err);
      } else {
        console.log("Old Technology image delete success");
      }
    });
  } else {
    image = oldImage;
  }

  Technology.update(id, title, description, image, type)
    .then(() => res.redirect("/technology"))
    .catch((err) => console.error("❌ Technology Update Error:", err));
};

// contact
exports.getAllContacts = (req, res, next) => {
  Contact.fetchAll()
    .then(([contacts]) => {
      res.render("host/contactList", {
        title: "All Contacts",
        path: "/contacts",
        contacts,
      });
    })
    .catch((err) => {
      console.error("❌ Error fetching contacts:", err);
      res.status(500).send("Server Error");
    });
};

exports.deleteContact = (req, res, next) => {
  const id = req.params.id;
  Contact.delete(id)
    .then(() => res.redirect("/contacts"))
    .catch((err) => {
      console.error("❌ Error deleting contact:", err);
      res.status(500).send("Delete Failed");
    });
};
