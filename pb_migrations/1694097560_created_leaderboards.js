/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "z4xo6krjt5lwg8l",
    "created": "2023-09-07 14:39:20.839Z",
    "updated": "2023-09-07 14:39:20.839Z",
    "name": "leaderboards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o7kqn6wm",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "yvyc5jlo",
        "name": "game",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "quiz",
            "match"
          ]
        }
      },
      {
        "system": false,
        "id": "dapypwea",
        "name": "score",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "xgavwezf",
        "name": "studySetSharedId",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 36,
          "max": 36,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("z4xo6krjt5lwg8l");

  return dao.deleteCollection(collection);
})
