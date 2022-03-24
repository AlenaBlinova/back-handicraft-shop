const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// Add a order
exports.addOrder = async ({ user_id, status, paid }) => {
    try {
        const [{ id: orderId }] = await knex("orders")
            .insert([{ user_id, status, paid }])
            .returning("id");
        return { orderId };
    } catch (error) {
        throw new ControllerException("The order has already been added");
    }
};

// Edit a order
exports.editOrder = async ({ orderId, user_id, status, paid }) => {
    const [record] = await knex("orders")
        .select("user_id", "status", "paid")
        .where({ id: orderId });

    if (!record) {
        throw new ControllerException("Order has not been found");
    }

    const patch = {};
    if (id) patch.id = id;
    if (user_id) patch.user_id = user_id;
    if (status) patch.status = status;
    if (paid) patch.paid = paid;
    await knex("orders")
        .update(patch)
        .where({ id: orderId });

    return {};
};

// Delete a order
exports.deleteOrder = async ({ orderId }) => {
    try {
        await knex("orders")
            .where({ id: orderId }).delete();

        return true;
    }
    catch (error) {
        throw new ControllerException("Error");
    }
};

// Get order by id
exports.getOrderById = async ({ orderId }) => {
    const [record] = await knex("orders")
        .select(
            "id",
            "user_id",
            "status",
            "paid"
        )
        .where({ id: orderId });

    return record;
};

// Get order by list
exports.getOrderByList = async ({ limit, offset }) => {
    const [record] = await knex("orders")
        .select(
            "id",
            "status",
            "paid"
        )
        .limit(limit)
        .offset(offset)

    return record;
};