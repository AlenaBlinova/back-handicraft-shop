const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const categoriesController = require("../categories");

const categories = [
    { name: "Вышивка" },
];

beforeEach(async () => {
    await db.seed.run();
});

test("Возможность добавления категории", async () => {
    const data = await categoriesController.addCategory(categories[0]);

    expect(data).toEqual(expect.any(Object));
    expect(data.categoryId).toEqual(expect.any(Number));
    expect(data.categoryId).toBeGreaterThan(0);
});

test("Возможность сохранения категории", async () => {
    const { categoryId } = await categoriesController.addCategory(categories[0]);
    const record = await categoriesController.getCategoryById({ categoryId });

    expect(record.name).toBe(categories[0].name);
});