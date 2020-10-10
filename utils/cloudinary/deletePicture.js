const cloudinary = require("cloudinary").v2;

exports.deletePicture = (path, pictureName) => {
    cloudinary.uploader.destroy(path + pictureName,(result)=>{
        console.log(result)
    }).catch(e=>console.log(e))
}