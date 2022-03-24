const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// Add a product
exports.addProduct = async ({ name, price, structure, description, rating, photogallery_id }) => {
    try {
        const [{ id: productId }] = await knex("products")
            .insert([{ name, price, structure, description, rating, photogallery_id }])
            .returning("id");
        return { productId };
    } catch (error) {
        throw new ControllerException("The product has already been added");
    }
};

// Edit a product
exports.editProduct = async ({ productId, name, price, structure, description, rating, photogallery_id }) => {
    const [record] = await knex("products")
        .select("id", "name", "price", "structure", "description", "rating", "photogallery_id")
        .where({ id: productId });

    if (!record) {
        throw new ControllerException("Product has not been found");
    }

    const patch = {};
    if (id) patch.id = id;
    if (name) patch.name = name;
    if (photogallery_id) patch.photogallery = photogallery_id;
    if (price) patch.price = price;
    if (structure) patch.structure = structure;
    if (description) patch.description = description;
    if (rating) patch.rating = rating;
    await knex("products")
        .update(patch)
        .where({ id: productId });

    return {};
};

// Delete a product
exports.deleteProdut = async ({ productId }) => {
    try {
        await knex("products")
            .where({ id: productId }).delete();

        return true;
    }
    catch (error) {
        throw new ControllerException("Error");
    }
};

// Get product by id
exports.getProductById = async ({ productId }) => {
    const [record] = await knex("products")
        .select(
            "id",
            "name",
            "price",
            "structure",
            "description",
            "rating",
            "photogallery_id"
        )
        .where({ id: productId });

    return record;
};

// Get product by list
exports.getProductByList = async ({ limit, offset }) => {
    const [record] = await knex("products")
        .select(
            "id",
            "name",
            "price",
            "structure",
            "description",
            "rating",
            "photogallery_id"
        )
        .limit(limit)
        .offset(offset)

    return record;
};