const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// Add a review
exports.addReview = async ({ author_id, text, order_id, photogallery_id, published }) => {
    try {
        const [{ id: reviewId }] = await knex("reviews")
            .insert([{ author_id, text, order_id, photogallery_id, published }])
            .returning("id");
        return { reviewId };
    } catch (error) {
        throw new ControllerException("Some fields are not filled in");
    }
};

// Edit a review
exports.editReview = async ({ author_id, text, order_id, photogallery_id, published }) => {
    const [record] = await knex("reviews")
        .select("author_id", "text", "order_id", "photogallery_id", "published")
        .where({ id: reviewId });

    if (!record) {
        throw new ControllerException("Review has not been found");
    }

    const patch = {};
    if (id) patch.id = id;
    if (author_id) patch.author_id = author_id;
    if (photogallery_id) patch.photogallery = photogallery_id;
    if (text) patch.text = text;
    if (order_id) patch.order_id = order_id;
    if (published) patch.published = published;

    await knex("reviews")
        .update(patch)
        .where({ id: reviewId });

    return {};
};

// Delete a review
exports.deleteReview = async ({ reviewId }) => {
    try {
        await knex("reviews")
            .where({ id: reviewId }).delete();

        return true;
    }
    catch (error) {
        throw new ControllerException("Error");
    }
};

// Get review by id
exports.getReviewById = async ({ reviewId }) => {
    const [record] = await knex("reviews")
        .select(
            "author_id",
            "text",
            "order_id",
            "photogallery_id",
            "published"
        )
        .where({ id: reviewId });

    return record;
};

// Get review by list
exports.getReviewByList = async ({ limit, offset }) => {
    const [record] = await knex("reviews")
        .select(
            "author_id",
            "text",
            "order_id",
            "photogallery_id",
            "published"
        )
        .limit(limit)
        .offset(offset)

    return record;
};