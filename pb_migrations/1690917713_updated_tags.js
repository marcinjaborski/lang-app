migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.viewRule = "@request.auth.id = owner.id";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("49d60mn6a1qifqf");

    collection.viewRule = null;

    return dao.saveCollection(collection);
  },
);
