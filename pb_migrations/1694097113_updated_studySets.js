/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgtyftfp",
    "name": "sharedId",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 36,
      "max": 36,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  // remove
  collection.schema.removeField("cgtyftfp")

  return dao.saveCollection(collection)
})
