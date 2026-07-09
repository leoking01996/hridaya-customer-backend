const Product = require("../models/product");

exports.addProduct = async (req, res) => {

    try {

        const {
            product_name,
            price,
            description,
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const product = await Product.create({

            product_name,

            price,

            description,

            image: req.file.path,

            public_id: req.file.filename,

        });

        res.status(201).json({

            success: true,

            message: "Product created successfully",

            data: product,

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};