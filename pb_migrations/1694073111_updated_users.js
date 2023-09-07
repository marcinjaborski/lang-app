/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "lvaygxei",
        name: "thumbnail",
        type: "file",
        required: false,
        unique: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          thumbs: [],
          protected: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("lvaygxei");

    return dao.saveCollection(collection);
  },
);
