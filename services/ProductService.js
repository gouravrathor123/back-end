const { compareSync } = require("bcrypt");
const Product = require("../models/Products");

module.exports = {
    add: async function (req) {
        try {
           const body = req.body;
           
           Object.assign(body,{owner:req.owner._id})
           const result1 = await Product.find(body);
           
           if(result1.length!==0){
               throw Error("Product already exists");
           }
           const result = await Product.create(body);
           return{
               result,
               message:"product added"
           }
            console.log(body);
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
            let result1 = await Product.findById(id);
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
            result = await Product.findById(id);
            if (!result) {
                throw Error("no product found");
            }
            return {
                result,
                message: "product found"
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
            result = await Product.find({owner:owner._id});
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
    },
}