migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csledsrf",
    "name": "owner",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("e0g65cks1umhxei")

  // remove
  collection.schema.removeField("csledsrf")

  return dao.saveCollection(collection)
})
