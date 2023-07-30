migrate(
  (db) => {
    const collection = new Collection({
      id: "49d60mn6a1qifqf",
      created: "2023-07-30 10:51:22.682Z",
      updated: "2023-07-30 10:51:22.682Z",
      name: "tags",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "qiknr49c",
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
        },
        {
          system: false,
          id: "p0zi0pft",
          name: "label",
          type: "text",
          required: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
      ],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    return dao.deleteCollection(collection);
  },
);
