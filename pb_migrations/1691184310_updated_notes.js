migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs");

    collection.listRule = "owner.id = @request.auth.id";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs");

    collection.listRule = null;

    return dao.saveCollection(collection);
  },
);
