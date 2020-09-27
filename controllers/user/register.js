const userSchema = require('../../models/user/userSchema');
const mongoose = require('mongoose');

module.exports.registerGet = (req, res) => {
    res.send({
        serverStatus: true,
        register: "register Allowed"
    });
}

module.exports.registerPost = (req, res) => {
    console.log(req.body);

    const {
        username,
        email,
        password
    } = req.body

    async function saveUser() {
      return await userSchema.create({ username, email, password })
    }

    saveUser().then((response)=>{
        if(response){
            console.log(response);
            res.send("REGISTERED! --- " +response.username);
        }else{
            console.log("SOMETHING WENT WRONG")
        }
    })
}