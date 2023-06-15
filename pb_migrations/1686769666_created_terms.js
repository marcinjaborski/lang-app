migrate((db) => {
  const collection = new Collection({
    "id": "e0g65cks1umhxei",
    "created": "2023-06-14 19:07:46.719Z",
    "updated": "2023-06-14 19:07:46.719Z",
    "name": "terms",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5q6lockr",
        "name": "base",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xgdaf567",
        "name": "translation",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei");

  return dao.deleteCollection(collection);
})
