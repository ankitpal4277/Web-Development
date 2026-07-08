use("CrudDB");

console.log(db);

db.createCollection("Courses");

db.Courses.insertOne({
    name: "ankits web dev", 
    price: 0, 
    projects: 45
})

db.Courses.insertMany([
  {
    name: 'harrys dsa course',
    price: NumberInt('4999'),
    projects: NumberInt('30')
  },
  {
    name: 'sigma web dev batch',
    price: NumberInt('0'),
    projects: NumberInt('60')
  },
  {
    name: 'react mastery course',
    price: NumberInt('2499'),
    projects: NumberInt('12')
  },
  {
    name: 'nodejs backend bootcamp',
    price: NumberInt('3999'),
    projects: NumberInt('18')
  },
  {
    name: 'python for beginners',
    price: NumberInt('0'),
    projects: NumberInt('25')
  },
  {
    name: 'dsa in java',
    price: NumberInt('5999'),
    projects: NumberInt('40')
  },
  {
    name: 'mongodb crash course',
    price: NumberInt('999'),
    projects: NumberInt('8')
  },
  {
    name: 'system design basics',
    price: NumberInt('4499'),
    projects: NumberInt('15')
  },
  {
    name: 'git and github guide',
    price: NumberInt('0'),
    projects: NumberInt('10')
  },
  {
    name: 'tailwind css crash course',
    price: NumberInt('1499'),
    projects: NumberInt('20')
  }
])


let a = db.Courses.find({price: 0})

// console.log(a);

// console.log(a.count());

// console.log(a.toArray());

let b = db.Courses.findOne({price: 0})

console.log(b);

db.Courses.updateOne({price: 0}, {$set: {price: 10000}})

db.Courses.deleteOne({price: 10000});
