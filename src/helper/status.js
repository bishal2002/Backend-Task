
const successHandler = {
    orderCreated: "Order Added sucessfully!",
    categoryCreated: "category created sucessfully!",
    datafetched: "Data fetched sucessfully!"
}

const errorHandler = {
    errorOrderCreation: "Failed to add the Order!",
    errorcategoryCreation: "Failed to create category!",
    errorfetchingCategory:"Error fetching category data!",
    missing: "Missing required parameters!"
};

module.exports = { successHandler, errorHandler };
