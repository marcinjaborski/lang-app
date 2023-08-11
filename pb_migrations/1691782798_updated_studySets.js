migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr");

    collection.listRule = "owner.id = @request.auth.id";
    collection.viewRule = "owner.id = @request.auth.id";
    collection.createRule = '@request.auth.id != ""';
    collection.updateRule = "owner.id = @request.auth.id";
    collection.deleteRule = "owner.id = @request.auth.id";

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "mjyrxldi",
        name: "owner",
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
    const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr");

    collection.listRule = null;
    collection.viewRule = null;
    collection.createRule = null;
    collection.updateRule = null;
    collection.deleteRule = null;

    // remove
    collection.schema.removeField("mjyrxldi");

    return dao.saveCollection(collection);
  },
);
