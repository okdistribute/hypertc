var tape = require('tape')
var Hypertc = require('./')
var DiscoverySwarmWeb = require('discovery-swarm-web')

var db = Hypertc.create()

const swarm = new DiscoverySwarmWeb({
  stream: () => db.replicate()
})

db.ready(() => {
  console.log('document ready:', db.publicKey)
  swarm.join(db.discoverykey)
  // initialize a new book
  var book = db.create()

  book.title = 'ham and eggs'
  book.author = 'rangermauve'
  book.type = 'Book' // this is very useful

  db.add(book)
})

db.on('change', (docId) => {
  var book = db.get(docId)
  console.log(book)
})
