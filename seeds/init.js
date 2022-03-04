exports.seed = async function (knex) {
    await knex("reviews_products").del();
    await knex("orders_products").del();
    await knex("photos").del();
    await knex("reviews").del();
    await knex("products").del();
    await knex("orders").del();
    await knex("photogalleries").del();
    await knex("users").del();

    await knex("users").insert([
        {
            id: 1,
            name: "Aljona",
            email: "aljona@yandex.ru",
            email_is_confirmed: true,
            password: "1123456",
            role: "admin"
        },
    ]);
    await knex("orders").insert([
        {
            id: 1,
            user_id: 1,
            status: "in_process",
            paid: false
        },
    ]);
    await knex("photogalleries").insert([
        {
            id: 1
        },
    ]);
    await knex("photos").insert([
        {
            id: 1,
            photogallery_id: 1,
            photoPath: "На компе"
        },
    ]);
    await knex("products").insert([
        {
            id: 1,
            name: "Кот из бисера",
            photogallery_id: 1,
            price: "500",
            structure: "Состав: чешский бисер, синтепон, леска. Размеры: высота - 7см, ширина - 5см, длина - 10см.",
            description: "Описание: чёрно-белый кот, зелёные глаза, длинный хвост, в лежачем положении.",
            rating: "5"
        },
    ]);
    await knex("orders_products").insert([
        {
            id: 1,
            order_id: 1,
            product_id: 1
        },
    ]);
    await knex("reviews").insert([
        {
            id: 1,
            author_id: 1,
            text: "Сделано качествено. Мне понравилось!",
            order_id: 1,
            photogallery_id: 1,
            published: true
        },
    ]);
    await knex("reviews_products").insert([
        {
            id: 1,
            review_id: 1,
            product_id: 1
        },
    ]);
};