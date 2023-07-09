migrate(
  (db) => {
    const collection = new Collection({
      id: "ymy2p2m8womxn9k",
      created: "2023-06-30 19:34:26.011Z",
      updated: "2023-06-30 19:34:26.011Z",
      name: "settings",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "cbesv5ab",
          name: "separator",
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
          id: "hbfqm1di",
          name: "theme",
          type: "json",
          required: false,
          unique: false,
          options: {},
        },
        {
          system: false,
          id: "g04qlilc",
          name: "defaultBaseLang",
          type: "text",
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "gbfiwhs9",
          name: "defaultTargetLang",
          type: "text",
          required: false,
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
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    return dao.deleteCollection(collection);
  },
);
