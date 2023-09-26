/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "kd5mw0qk",
        name: "note",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "ymeo7zhb0vdszgs",
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
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "kd5mw0qk",
        name: "note",
        type: "relation",
        required: true,
        unique: false,
        options: {
          collectionId: "ymeo7zhb0vdszgs",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: [],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
