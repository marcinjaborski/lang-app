migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "agyr3hz6",
        name: "understanding",
        type: "number",
        required: false,
        unique: false,
        options: {
          min: 1,
          max: 3,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // remove
    collection.schema.removeField("agyr3hz6");

    return dao.saveCollection(collection);
  },
);
