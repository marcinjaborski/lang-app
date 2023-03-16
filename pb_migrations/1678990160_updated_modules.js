migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  collection.listRule = "owner.id = @request.auth.id"
  collection.viewRule = "owner.id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "owner.id = @request.auth.id"
  collection.deleteRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
