migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.listRule = "@request.auth.id = owner.id";
    collection.createRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.listRule = null;
    collection.createRule = null;

    return dao.saveCollection(collection);
  },
);
