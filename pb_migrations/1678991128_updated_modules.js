migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  // update
  collection.schema.addField(new SchemaField({
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
      "maxSelect": 1,
      "displayFields": [
        "title",
        "id",
        "excerpt"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
