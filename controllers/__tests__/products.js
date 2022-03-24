const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const productsController = require("../products");

const products = [
    { name: "Котик", price: 4000, structure: "Состав: чешский бисер, синтепон, леска.", description: "Описание: чёрно-белый кот, зелёные глаза, длинный хвост, в лежачем положении.", rating: "1", photogallery_id: 1 },
    { name: "Синий попугай", price: 1050, structure: "Состав: чешский бисер, синтепон, леска.", description: "Описание: синий попугай в сидячем положении.", rating: "2", photogallery_id: 1 },
    { name: "Рыжая собака", price: 2500, structure: "Состав: чешский бисер, синтепон, леска.", description: "Описание: рыжая собака с зелёными глазами.", rating: "3", photogallery_id: 1 },
    { name: "Кот с жёлтыми глазами", price: 3350, structure: "Состав: чешский бисер, синтепон, леска.", description: "Описание: кот с жёлтыми глазами, короткий хвост.", rating: "4", photogallery_id: 1 },
];

beforeEach(async () => {
    await db.seed.run();
});

test("Возможность добавления товара", async () => {
    const data = await productsController.addProduct(products[0]);

    expect(data).toEqual(expect.any(Object));
    expect(data.productId).toEqual(expect.any(Number));
    expect(data.productId).toBeGreaterThan(0);
});

test("Возможность сохранения товара", async () => {
    const { productId } = await productsController.addProduct(products[1]);
    const record = await productsController.getProductById({ productId });

    expect(record.name).toBe(products[1].name);
    expect(record.price).toBe(products[1].price);
    expect(record.structure).toBe(products[1].structure);
    expect(record.photogallery_id).toBe(products[1].photogallery_id);
    expect(record.description).toBe(products[1].description);
    expect(record.rating).toBe(products[1].rating);
});