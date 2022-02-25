exports.up = async (knex) => {
    await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.boolean("email_is_confirmed").notNullable().defaultTo(false);
      table.string("email_confirmation_code", 6);
      table.string("password").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table
        .enu("role", ["user", "admin"])
        .notNullable()
        .defaultTo("user");
    });
  
    await knex.schema.createTable("orders", (table) => {
      table.increments("id");
      table.integer("user_id").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
      table
        .enu("status", ["in_process", "shipping", "delivered"])
        .notNullable()
        .defaultTo("in_process");
      table.boolean("paid").notNullable().defaultTo(false);
      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("photogalleries", (table) => {
      table.increments("id");
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable("photos", (table) => {
      table.increments("id");
      table.integer("photogallery_id")
      table.string("photoPath")
      table
        .foreign("photogallery_id")
        .references("photogalleries.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("products", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("photogallery_id")
      table.decimal("price").notNullable();
      table.string("structure").notNullable();
      table.string("description").notNullable();
      table.enu("rating", ["1", "2", "3", "4", "5"])
      table
        .foreign("photogallery_id")
        .references("photogalleries.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("orders_products", (table) => {
      table.increments("id");
      table.integer("order_id")
      table.integer("product_id")
      table
        .foreign("order_id")
        .references("products.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table
        .foreign("product_id")
        .references("products.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
    await knex.schema.createTable("reviews", (table) => {
        table.increments("id");
        table.integer("author_id").notNullable();
        table.text("text")
        table.integer("order_id")
        table.integer("photogallery_id")
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.boolean("published").notNullable().defaultTo(false);
        table
          .foreign("author_id")
          .references("users.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        table
          .foreign("order_id")
          .references("orders.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        table
          .foreign("photogallery_id")
          .references("photogalleries.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      });

      await knex.schema.createTable("reviews_products", (table) => {
        table.increments("id");
        table.integer("review_id")
        table.integer("product_id")
        table
          .foreign("review_id")
          .references("reviews.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        table
          .foreign("product_id")
          .references("products.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("orders");
    await knex.schema.dropTableIfExists("reviews_products");
    await knex.schema.dropTableIfExists("orders_products");
    await knex.schema.dropTableIfExists("users");
    await knex.schema.dropTableIfExists("reviews");
    await knex.schema.dropTableIfExists("photogalleries");
    await knex.schema.dropTableIfExists("photos");
    await knex.schema.dropTableIfExists("products");
  };