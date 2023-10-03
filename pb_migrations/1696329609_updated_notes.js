/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs")

  collection.updateRule = "owner.id = @request.auth.id || shared.id ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ymeo7zhb0vdszgs")

  collection.updateRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
})
