const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports.saveProfilePicture = (imageName) => {
    // save image in cloudinary
    return cloudinary.uploader.upload(process.cwd() + "/uploads/" + imageName, {
        resource_type: "image",
        public_id: "profilePictures/" + imageName,
        overwrite: true,
        transformation: [
            { quality: "90", format: "jpg", },
            { width: 300, height: 300, gravity: "face", radius: "max", crop: "crop" },
            { width: 200, height: 200, crop: "scale" }
        ]
    }, (err) => {
        if (err) {
            console.log(err)
        }
    }).then((resp) => {
        fs.unlink(process.cwd() + "/uploads/" + imageName, (err) => {
            // deleting image from file system after upload to cloudinary
            if (err) {
                console.log(err);
            }
            console.log("deleted");
        })
        console.log("Picture uploaded!");
        return resp.secure_url;
    }).catch((e) => {
        console.log(e);
    });
}