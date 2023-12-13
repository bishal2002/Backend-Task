
require("dotenv").config();

const { errorHandler } = require("../helper/status");
const {
    addCategory,getAllCategory
} = require("../services/category.services");


exports.addCategory = async (req, res) => {
    try {
        const resp = await addCategory(req.body);
        return res.status(resp.status || 201).json(resp);

    } catch (err) {
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        const resp = await getAllCategory(req.body);
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

