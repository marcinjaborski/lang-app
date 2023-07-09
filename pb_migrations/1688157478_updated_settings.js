migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "cbesv5ab",
        name: "separator",
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
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "cbesv5ab",
        name: "separator",
        type: "text",
        required: true,
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
);
