exports.up = async (knex) => {
    await knex.schema.createTable("categories", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable("products_categories", (table) => {
        table.increments("id");
        table.integer("category_id").notNullable();
        table.integer("product_id").notNullable();
        table
            .foreign("product_id")
            .references("products.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        table
            .foreign("category_id")
            .references("categories.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("products_categories");
    await knex.schema.dropTableIfExists("categories");
};