/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "uvoyalhx",
        name: "terms",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "e0g65cks1umhxei",
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
    const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "uvoyalhx",
        name: "terms",
        type: "relation",
        required: true,
        unique: false,
        options: {
          collectionId: "e0g65cks1umhxei",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: [],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
