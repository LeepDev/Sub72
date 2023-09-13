require('dotenv').config();
require('./config/database');

const Course = require('./models/course')
const TeeDetail = require('./models/teeDetail')

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');

// await needs an async function - use an async IIFE!
(async function() {
  // Save the promises (or call right in the array if feeling frisky)
  const resetCourse = Course.deleteMany({});
  const resetTeeDetail = TeeDetail.deleteMany({});
  
  // Promise.all will return a single promise that resolves
  // only after all of the array's promises resolve
  let results = await Promise.all([resetCourse, resetTeeDetail]);
  // results will be an array of result objects!
  console.log(results);

  let course = new Course()
  course.name = "Mount Prospect Golf Club"
  course.parOut = data.coursePar[0]["Par"]
  course.parIn = data.coursePar[1]["Par"]
  course.parTotal = data.coursePar[2]["Par"]
  course.holePars = data.holePars
  course.holeIndexes = data.holeIndexes
  await course.save()
  console.log(course)

  // let teeDetail = new TeeDetail()
  // teeDetail.color = data.teeDetails[0]["color"]
  // teeDetail.rating = data.teeDetails[0]["rating"]
  // teeDetail.slope = data.teeDetails[0]["slope"]
  // teeDetail.distanceOut = data.teeDetails[0]["out"]
  // teeDetail.distanceIn = data.teeDetails[0]["in"]
  // teeDetail.distanceTotal = data.teeDetails[0]["total"]
  // teeDetail.holeDistances = data.teeDetails[0]["distances"]
  // teeDetail.course = course._id
  // await teeDetail.save()
  // console.log(teeDetail)

  async function saveTee(td) {
    let teeDetail = new TeeDetail()
    teeDetail.color = td["color"]
    teeDetail.rating = td["rating"]
    teeDetail.slope = td["slope"]
    teeDetail.distanceOut = td["out"]
    teeDetail.distanceIn = td["in"]
    teeDetail.distanceTotal = td["total"]
    teeDetail.holeDistances = td["distances"]
    teeDetail.course = course._id
    await teeDetail.save()
    console.log(teeDetail)
  }

  await saveTee(data.teeDetails[0])
  await saveTee(data.teeDetails[1])
  await saveTee(data.teeDetails[2])
  await saveTee(data.teeDetails[3])

  // data.teeDetails.forEach(async (td) => {
  //   teeDetail.color = td["color"]
  //   teeDetail.rating = td["rating"]
  //   teeDetail.slope = td["slope"]
  //   teeDetail.distanceOut = td["out"]
  //   teeDetail.distanceIn = td["in"]
  //   teeDetail.distanceTotal = td["total"]
  //   teeDetail.holeDistances = td["distances"]
  //   teeDetail.course = course._id
  //   await teeDetail.save()
  //   console.log(teeDetail)
  // })
  
  // This time, provide the array of promises in-line
  // results = await Promise.all([
  // ]);
  // console.log('Created golfers:', results[0])
  
  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();

