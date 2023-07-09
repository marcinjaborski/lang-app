migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "zonbmtja",
        name: "userLanguage",
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

    // remove
    collection.schema.removeField("zonbmtja");

    return dao.saveCollection(collection);
  },
);
