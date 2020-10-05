const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports.saveRecipeImage = (imageName) => {
    // save image in cloudinary
    return cloudinary.uploader.upload(process.cwd() + "/uploads/" + imageName, {
        resource_type: "image",
        public_id: "recipes/" + imageName,
        overwrite: true,
        transformation: [{
            quality: "10",
            format: "png",
            crop:"scale"
        }]
    }, (err) => {
        if (err) {
            console.log(err)
        }
    }).then((resp) => {
        fs.unlink(process.cwd() + "/uploads/" + imageName, (err) => {
            // deleting image from file system after upload to cloudinary
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