module.exports.profileGet = (req, res) => {
    
    res.render('profile')
}

module.exports.profilePost = (req, res) => {
    console.log(req.body)
    console.log(req.params)
    res.send(req.body)
}