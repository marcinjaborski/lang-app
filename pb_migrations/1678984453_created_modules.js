migrate((db) => {
  const collection = new Collection({
    "id": "wwums8g7my5ni9z",
    "created": "2023-03-16 16:34:13.295Z",
    "updated": "2023-03-16 16:34:13.295Z",
    "name": "modules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qjmcjpac",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nld4r8pv",
        "name": "notes",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ymeo7zhb0vdszgs",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": [
            "title",
            "id",
            "excerpt"
          ]
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
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z");

  return dao.deleteCollection(collection);
})
