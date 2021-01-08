const Catalog = require("../models/Catolog");

module.exports = {
    add: async function (req) {
        try {
            const owner = req.owner
            const body = req.body
            Object.assign(body,{company_name:owner.company_name,email:owner.email,phone:owner.phone,address:owner.address});
            const result1 = await Catalog.find(body);
            if(result1.length!==0){
                throw Error("Catalog already exists")
            }
            const result = await Catalog.create(body);
            return{result,message:"Catalog created succesfully"};
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    update: async function (req, id) {
        let result = null;
        try {
            if (Object.keys(req.body).length === 0) {
                throw Error("Body can not be empty");
            }
            let result1 = await Catalog.findById(id);
            if (!result1) {
                throw Error("No Product is found");
            }
            await Product.findByIdAndUpdate(id, {
                name: req.body.name,
                price: req.body.price,
                image:req.body.image
            });
            result = await Product.findOne({
                _id: id
            });
            return {
                result,
                message: "product details updated "
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    get: async function (id) {
        let result = null;
        try {
            result = await Catalog.findById(id);
            if (!result) {
                throw Error("no catalog found");
            }
            return {
                result,
                message: "catalog found"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    getAll: async function (req){
        let result = null;
        try{
            let owner = req.owner;
            result = await Catalog.find({owner:owner._id});
            if(result.length===0){
                throw Error("no product found");
            }
            return{result,message:"all product for the perticular owner"}
        }catch(err){
            return{error:err.message}
        }
    },

    delete: async function (id) {
        let result = null;
        try {
            result = await Product.findById(id);
            if (result) {
                result = await Product.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Product deleted successfully"
                };
            } else {
                throw Error(`no product found for this id: ${id}`)
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }
}