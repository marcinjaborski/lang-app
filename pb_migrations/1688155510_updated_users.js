migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("iu06zeio");

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "iu06zeio",
        name: "settings",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "ymy2p2m8womxn9k",
          cascadeDelete: true,
          minSelect: null,
          maxSelect: 1,
          displayFields: [],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
