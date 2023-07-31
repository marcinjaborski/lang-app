migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "sf9ksi83",
        name: "color",
        type: "text",
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: "",
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    // remove
    collection.schema.removeField("sf9ksi83");

    return dao.saveCollection(collection);
  },
);
