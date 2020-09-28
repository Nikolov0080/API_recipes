module.exports.profileGet = (req, res) => {
    console.log(78454);
    
    res.render('profile')
}

module.exports.profilePost = (req, res) => {
    console.log(req.body)
    console.log(req.params)
    res.send(req.body)
}