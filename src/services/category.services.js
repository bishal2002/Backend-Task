require("dotenv").config();
const express = require("express");
const app = express();

//models
const CategoryModel = require('../models/category.model')

app.use(express.json());

const { successHandler, errorHandler } = require("../helper/status");



exports.getAllCategory = async () => {
    const AllcategoryData = await CategoryModel.find({});
    if(!AllcategoryData){
        return { status: 400, message: errorHandler.errorfetchingCategory };
    }
    return { status: 200, message: successHandler.datafetched , resp : AllcategoryData  };
};

exports.addCategory = async (body) => {
    const { name } = body;

    if(!name ){
        return { status: 400, message: errorHandler.missing };
    }

    const categoryCreation = await CategoryModel.create({ name });

    if (categoryCreation) {
        return { status: 201, message: successHandler.categoryCreated };
    }
    else {
        return { status: 400, message: errorHandler.errorcategoryCreation };
    }
};