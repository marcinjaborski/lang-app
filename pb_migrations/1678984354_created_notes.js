migrate((db) => {
  const collection = new Collection({
    "id": "ymeo7zhb0vdszgs",
    "created": "2023-03-16 16:32:34.620Z",
    "updated": "2023-03-16 16:32:34.620Z",
    "name": "notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "evtqytf9",
        "name": "title",
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
        "id": "zude4xgg",
        "name": "content",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "vdtiwibk",
        "name": "excerpt",
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
        "id": "rtsfzp6m",
        "name": "baseLang",
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
        "id": "p8lrphwb",
        "name": "targetLang",
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
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs");

  return dao.deleteCollection(collection);
})
