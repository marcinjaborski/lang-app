/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  collection.listRule = "owner.id = @request.auth.id || shared.id ~ @request.auth.id"
  collection.viewRule = "owner.id = @request.auth.id || shared.id ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be7y9qfa5zdzwlr")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
