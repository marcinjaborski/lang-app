/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ves33ijt",
    "name": "shared",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  // remove
  collection.schema.removeField("ves33ijt")

  return dao.saveCollection(collection)
})
