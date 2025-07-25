const Blog = require("../models/blogs");
const Disease = require("../models/diseaseMdls");
const Technology = require("../models/technologyMdls");
const Contact = require("../models/contactMdls");

exports.getHome = (req, res, next) => {
  Promise.all([
    Blog.fetchLimited(2),
    Disease.fetchLimited(3),
    Technology.fetchLimited(2),
  ])
    .then(([blogsResult, diseasesResult, technologiesResult]) => {
      const blogs = blogsResult[0];
      const diseases = diseasesResult[0];
      const technologies = technologiesResult[0];

      res.render("store/index", {
        title: "Home",
        path: "/",
        blogs,
        diseases,
        technologies,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error fetching data" });
    });
};


exports.getContact = (req, res, next) => {
  Disease.fetchAll().then((diseases) => {
    res.render("store/contact", {
      title: "Contact",
      path: "/contact",
      diseases: diseases[0],
    });
  });
};

exports.postContact = (req, res, next) => {
  const { name, email, number, message } = req.body;

  // null check (optional)
  if (!name || !number || !message) {
    return res.status(400).send("Name, email, and message are required.");
  }

  const contact = new Contact(name, email, number, message);

  contact
    .save()
    .then(() => res.redirect("/contact"))
    .catch((err) => {
      console.error("❌ Contact Save Error:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getAbout = (req, res, next) => {
  res.render("store/about", { title: "About", path: "/about" });
};

exports.getBlog = (req, res, next) => {
  Blog.fetchAll().then(([rows]) => {
    res.render("store/blog", { title: "Blog", path: "/blog", rows });
  });
};

exports.getDisease = (req, res, next) => {
  Disease.fetchAll().then(([rows]) => {
    res.render("store/disease", { title: "Disease", path: "/disease", rows });
  });
};

exports.getTechnology = (req, res, next) => {
  Technology.fetchAll().then(([rows]) => {
    res.render("store/tec", {
      title: "Technology",
      path: "/technology",
      technology: rows,
    });
  });
};

exports.getTechnologyById = (req, res, next) => {
  const id = req.params.id;
  Technology.findById(id).then(([rows]) => {
    res.render("store/blogDetail", {
      title: "Technology",
      path: "/technology",
      blog: rows[0],
    });
  });
};



exports.getBlogById = (req, res, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(([rows]) => {
      const blog = rows[0];
      res.render("store/blogDetail", {
        title: "blog",
        path: `/blog`,
        blog: blog,
      });
    })
    .catch((err) => {
      console.error("Error fetching blog by ID:", err);
      res.status(500).render("500", {
        title: "Server Error",
        path: "/500",
      });
    });
};

exports.getDiseaseDtls = (req, res, next) => {
  const id = req.params.id;
  Disease.findById(id).then(([disease]) =>
    res.render("store/blogDetail", {
      title: "Disease Details",
      path: "/disease",
      blog: disease[0],
    })
  );
}; // end of getDiseaseDtls
