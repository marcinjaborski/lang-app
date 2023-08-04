migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs");

    collection.listRule = "owner.id = @request.auth.id || shared.email = @request.auth.email";
    collection.viewRule = "owner.id = @request.auth.id || shared.email = @request.auth.email";

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "yghcs03g",
        name: "shared",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "_pb_users_auth_",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: ["username", "email"],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs");

    collection.listRule = null;
    collection.viewRule = null;

    // remove
    collection.schema.removeField("yghcs03g");

    return dao.saveCollection(collection);
  },
);
