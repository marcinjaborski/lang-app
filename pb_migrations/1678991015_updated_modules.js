migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  collection.createRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwums8g7my5ni9z")

  collection.createRule = null

  return dao.saveCollection(collection)
})
