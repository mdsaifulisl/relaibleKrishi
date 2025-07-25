
exports.getLogin = (req, res, next) => {
    res.render("auth/login", { title: "Login", path: '/login', error: "" });
};


// =====
// post login
exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    const secretEmail = process.env.SECRET_EMAIL;
    const secretPassword = process.env.SECRET_PASSWORD;

    if (email === secretEmail && password === secretPassword) {
        req.session.isLoggedIn = true;
        req.session.email = email;
        return req.session.save(() => {
        res.redirect("/"); // your protected page
        });
    } else {
        res.render("auth/login", {
        title: "Login",
        path: "/login",
        error: ".Invalid email or password try aging",
        });
    }
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};