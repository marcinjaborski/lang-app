migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqukgmun",
    "name": "owner",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  // remove
  collection.schema.removeField("uqukgmun")

  return dao.saveCollection(collection)
})
