const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const reviewsController = require("../reviews");

const reviews = [
    { author_id: 2, text: "Из плохого материала и цена большая!", order_id: 1, photogallery_id: 1, published: false },
    { author_id: 3, text: "Очень красивая игрушка, но торчат нитки", order_id: 1, photogallery_id: 1, published: true },
    { author_id: 4, text: "Очень симпотично и красиво:)", order_id: 1, photogallery_id: 1, published: true },
];

beforeEach(async () => {
    await db.seed.run();
});

test("Возможность добавления отзыва", async () => {
    const data = await reviewsController.addReview(reviews[0]);

    expect(data).toEqual(expect.any(Object));
    expect(data.reviewId).toEqual(expect.any(Number));
    expect(data.reviewId).toBeGreaterThan(0);
});

test("Возможность сохранения отзыва", async () => {
    const { reviewId } = await reviewsController.addReview(reviews[1]);
    const record = await reviewsController.getReviewById({ reviewId });

    expect(record.author_id).toBe(reviews[1].author_id);
    expect(record.text).toBe(reviews[1].text);
    expect(record.order_id).toBe(reviews[1].order_id);
    expect(record.photogallery_id).toBe(reviews[1].photogallery_id);
    expect(record.published).toBe(reviews[1].published);
});