const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// Add a category
exports.addCategory = async ({ name }) => {
    try {
        const [{ id: categoryId }] = await knex("categories")
            .insert([{ name }])
            .returning("id");
        return { categoryId };
    } catch (error) {
        console.error(error)
        throw new ControllerException("The category has already been added");
    }
};

// Edit a category
exports.editCategory = async ({ categoryId, name }) => {
    const [record] = await knex("categories")
        .select("id", "name")
        .where({ id: categoryId });

    if (!record) {
        throw new ControllerException("Category has not been found");
    }

    const patch = {};
    if (id) patch.id = id;
    if (name) patch.name = name;
    await knex("categories")
        .update(patch)
        .where({ id: categoryId });

    return {};
};

// Delete a category
exports.deleteCaregory = async ({ categoryId }) => {
    try {
        await knex("categories")
            .where({ id: categoryId }).delete();

        return true;
    }
    catch (error) {
        console.error(error);
        throw new ControllerException("Error");
    }
};

// Get category by id
exports.getCategoryById = async ({ categoryId }) => {
    const [record] = await knex("categories")
        .select(
            "id",
            "name"
        )
        .where({ id: categoryId });

    return record;
};

// Get category by list
exports.getCategoryByList = async ({ limit, offset }) => {
    const [record] = await knex("categories")
        .select(
            "id",
            "name"
        )
        .limit(limit)
        .offset(offset)

    return record;
};