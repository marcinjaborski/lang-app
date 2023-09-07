/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "oay66bfi",
        name: "friends",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "_pb_users_auth_",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: [],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("oay66bfi");

    return dao.saveCollection(collection);
  },
);
