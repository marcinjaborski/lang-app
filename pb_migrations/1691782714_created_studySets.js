migrate(
  (db) => {
    const collection = new Collection({
      id: "be7y9qfa5zdzwlr",
      created: "2023-08-11 19:38:34.952Z",
      updated: "2023-08-11 19:38:34.952Z",
      name: "studySets",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "wflzqexq",
          name: "title",
          type: "text",
          required: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
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
    const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr");

    return dao.deleteCollection(collection);
  },
);
