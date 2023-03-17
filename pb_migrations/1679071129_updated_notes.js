migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evtqytf9",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smdekknb",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0cqnntx",
    "name": "module",
    "type": "relation",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smdekknb",
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

  // update
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
})
