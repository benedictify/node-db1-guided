// db is connection knex(config)
const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // select * from shippers;
  // Maintanable:
  const rows = await db('shippers')
    .select('shipperid', 'shippername', 'phone')
    .orderBy('shippername', 'desc')

  // escape hatch, don't do it, please! NIGHTMARE!!!!!
  // const rows = await db.raw('select * from shippers;')
  return rows
}

async function getById(shipperId) {
  // raw sql first!!!!!
  const [record] = await db('shippers')
    .select('shipperid', 'shippername', 'phone')
    .where('shipperid', '=', shipperId) // the '=' can be omitted

  // const record = await db('shippers')
  // .select('shipperid', 'shippername', 'phone')
  // .where('shipperid', '=', shipperId)
  // .first()
  return record
}

async function create(newShipper) {
  // do not use destructuring unless
  // you have determined that the stuff is an array
  // the insert returns an array of ids
  const [shipperid] = await db('shippers').insert(newShipper)
  const shipper = await getById(shipperid)
  return shipper
}

async function update(id, shipper) {
  // the update returns num of records affected
  await db('shippers')
    .update(shipper)
    .where('shipperid', id)
  const updated = await getById(id)
  return updated
}

async function remove(shipperId) {
  await db('shippers')
  .delete()
  .where('shipperid', shipperId)
  return `the shipper with id ${shipperId} got axed!`
}
