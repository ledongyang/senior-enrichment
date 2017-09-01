'use strict'
const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../package.json');

const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;

console.log(chalk.yellow(`Opening database connection to ${connectionString}`));

// create the database instance that can be used in other database files
const db = module.exports = new Sequelize(connectionString, {
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  native: true    // lets Sequelize know we can use pg-native for ~30% more speed (if you have issues with pg-native feel free to take this out and work it back in later when we have time to help)
});

// run our models file (makes all associations for our Sequelize objects)
require('./models')

// seeds
const campuses = [
  { name: 'Titan', image: 'https://www.nasa.gov/sites/default/files/pia17470_0.jpg' },
  { name: 'Terra', image: 'http://www.guiageo-americas.com/mapas/mapa/americas-nasa.jpg' }
];

const students = [{
  name: 'Cody',
  email: 'cody@cody.com',
  campusId: 1
}, {
  name: 'Ben',
  email: 'ben@ben.com',
  campusId: 1
}, {
  name: 'Star',
  email: 'star@star.com',
  campusId: 2
}, {
  name: 'Batman',
  email: 'batman@bat.com',
  campusId: 2
}]

const seed = () =>
  Promise.all(campuses.map(campus =>
    db.models.campus.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    db.models.student.create(student))
  ));


// sync the db, creating it if necessary
function sync(force=false, retries=0, maxRetries=5) {
  return db.sync({force: true})
  .then(ok => console.log(`Synced models to db ${connectionString}`))
  .then(() => {
      console.log('Seeding databse');
      return seed();
  })
  .catch(fail => {
    // Don't do this auto-create nonsense in prod, or
    // if we've retried too many times.
    if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
      console.error(chalk.red(`********** database error ***********`))
      console.error(chalk.red(`    Couldn't connect to ${connectionString}`))
      console.error()
      console.error(chalk.red(fail))
      console.error(chalk.red(`*************************************`))
      return
    }
    // Otherwise, do this autocreate nonsense
    console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => sync(true, retries + 1))
  })
}

db.didSync = sync();
