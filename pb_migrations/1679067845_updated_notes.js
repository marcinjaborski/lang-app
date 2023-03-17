migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0cqnntx",
    "name": "module",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "wwums8g7my5ni9z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs")

  // remove
  collection.schema.removeField("q0cqnntx")

  return dao.saveCollection(collection)
})
