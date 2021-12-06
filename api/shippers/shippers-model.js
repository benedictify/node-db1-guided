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
  const rows = await db('shippers')
    .select('shipperid', 'shippername', 'phone')
    .where('shipperid', '=', shipperId) // the '=' can be omitted
  console.log(rows)
  return rows
}

async function create() {
  return 'create wired'
}

async function update() {
  return 'update wired'
}

async function remove() {
  return 'delete wired'
}
