const express = require('express');
const ownerController = require('../controller/OwnerController')
const router = new express.Router();
const Oauth = require("../middleware/Owner/Oauth");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(undefined,"./ownerprofilepics");
    },
    filename: (req,file,cb) => {
        cb(undefined,req.owner.email + ".jpg");
    },
});
const upload=multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 *5,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});
// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'))
//         }

//         cb(undefined, true)
//     }
// });

router
    .route("/owner")
    .post(
        ownerController.add
    );

router
    .route("/owner/check")
    .post(
        ownerController.check
    );

router
    .route("/owner/update/")
    .put(
        Oauth,
        ownerController.edit
    );

router
    .route("/owner/delete/")
    .delete(
        Oauth,
        ownerController.delete
    );

// router
//     .route("/owner/:id")
//     .get(
//         Oauth,
//         ownerController.get
//     );

router
    .route("/owner/getProfile")
    .get(
        Oauth,
        ownerController.getProfile
    );

router
    .route("/ownerlist")
    .get(
        ownerController.list
    );

router
    .route("/owner/login")
    .post(
        ownerController.login
    );

router
    .route("/owner/forget")
    .post(
        ownerController.forgetPassword
    );

router
    .route("/owner/reset")
    .post(
        ownerController.resetPassword
    );

router
    .route("/owner/changePassword")
    .put(
        ownerController.changePassword
    );

router
    .route("/owner/register")
    .post(
        ownerController.register
    );

router
    .route("/owner/uploadavatar")
    .patch(Oauth,upload.single('avatar'),
    ownerController.uploadavatar
    );

router
    .route("/owner/listofemployees")
    .get(
        Oauth,
        ownerController.listofemployees
    );

router
    .route("/owner/verify")
    .post(
        ownerController.verify
    );

router
    .route("/owner/logout")
    .post(
        Oauth,
        ownerController.logout
    );
module.exports = router;