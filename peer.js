var tape = require('tape')
var Hypertc = require('./')
var DiscoverySwarmWeb = require('discovery-swarm-web')

// Peer: get book from somewhere else
var db = Hypertc.get(process.argv[2])

const swarm = new DiscoverySwarmWeb({
  stream: () => db.replicate()
})

db.ready(() => {
  swarm.join(db.discoverykey)
  var docs = db.list()

  // adhere to the model set by the initial peer
  var doc = docs.findOne((d) => d.type === 'Book')
  var book = db.get(doc.id)

  console.log('these are the same', book.id, doc.id)

  var author = book.author
  console.log('got rangermauve', author)

  db.update(book.id, {author: 'rangermauve and karissa'})
})

db.on('change', (docId) => {
  var book = db.get(docId)
  console.log(book)
})
