migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    collection.listRule = "@request.auth.id = user.id";
    collection.createRule = "";
    collection.updateRule = "@request.auth.id = user.id";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymy2p2m8womxn9k");

    collection.listRule = null;
    collection.createRule = null;
    collection.updateRule = null;

    return dao.saveCollection(collection);
  },
);
