const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports.saveImage = (imageName) => {



    return cloudinary.uploader.upload(  process.cwd() + "/uploads/" + imageName, {
        resource_type: "image",
        public_id: "recipes/images/" + imageName,
        overwrite: true,
        transformation:[
            {quality:"40",}
        ]
    }, (err) => {
        if (err) {
            console.log(err)
        }
    }).then((resp) => {
        fs.unlink(process.cwd() + "/uploads/" + imageName, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log("deleted")
            })
        return resp.secure_url;
    }).catch((e) => {
        console.log(e)
    })
}

  