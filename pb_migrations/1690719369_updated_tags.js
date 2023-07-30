migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.deleteRule = "@request.auth.id = owner.id";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.deleteRule = null;

    return dao.saveCollection(collection);
  },
);
