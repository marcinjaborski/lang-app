migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // add
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
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // remove
    collection.schema.removeField("kd5mw0qk");

    return dao.saveCollection(collection);
  },
);
