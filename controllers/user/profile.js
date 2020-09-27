module.exports.profileGet = (req,res)=>{
    res.send({
        serverStatus: true,
        profile: 'user Profile'
      });
}

module.exports.profilePost = (req,res)=>{
    console.log(req.body)
    console.log(req.params)
    res.send(req.body)
}