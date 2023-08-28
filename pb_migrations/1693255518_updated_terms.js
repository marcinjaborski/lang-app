/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "agyr3hz6",
        name: "understanding",
        type: "number",
        required: false,
        unique: false,
        options: {
          min: 0,
          max: 3,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "agyr3hz6",
        name: "understanding",
        type: "number",
        required: false,
        unique: false,
        options: {
          min: 0,
          max: 2,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
