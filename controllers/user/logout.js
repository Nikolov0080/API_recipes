module.exports.logout = (req, res) => {

    res.clearCookie('auth');
    console.log("======cookie dead!======");

    res.send("logout");
}