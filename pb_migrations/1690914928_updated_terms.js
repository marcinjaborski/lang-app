migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "kmkui3dz",
        name: "tags",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "49d60mn6a1qifqf",
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
    const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

    // remove
    collection.schema.removeField("kmkui3dz");

    return dao.saveCollection(collection);
  },
);
