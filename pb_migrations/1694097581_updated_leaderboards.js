/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4xo6krjt5lwg8l")

  collection.name = "scores"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z4xo6krjt5lwg8l")

  collection.name = "leaderboards"

  return dao.saveCollection(collection)
})
