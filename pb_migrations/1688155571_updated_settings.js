migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "yilruokf",
        name: "user",
        type: "relation",
        required: true,
        unique: false,
        options: {
          collectionId: "_pb_users_auth_",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: [],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    // remove
    collection.schema.removeField("yilruokf");

    return dao.saveCollection(collection);
  },
);
