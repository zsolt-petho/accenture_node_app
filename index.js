const mongoose = require('mongoose');

mongoose
.connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("mongodb is connected"))
.catch((err) => console.error("couldnt connect", err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    category: String,
    price: Number
});

// Create class
const Course = mongoose.model("Course", courseSchema );

// Update a record
async function updateCourse(id) {
    const course = await Course.findById(id)
    if(!course) return;

    course.isPublished = true;
    
    const result = await course.save()
    console.log(result)
}
updateCourse("60cc6e631d7b8a185444644c")

// Deleting a record
async function deleteCourse(id) {
    const result = await Course.deleteOne(
    { _id: id},
    { $set: {isPublished: true}});
}
deleteCourse('60cc6e6d409b09259cda1298');



// Create instance
async function CreateCourse() {
    const course = new Course( {
        name: "node training",
        author: "Zsolt",
        tags: ["node", "backend"],
        isPublished: false,
        category: "tech",
        price: 100
    })
    const result = await course.save();
    console.log(result);
}
CreateCourse();

// find a record
async function GetCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater then or equal)
    // lt (less than)
    // lte (less then or equal)
    // in
    // nin (not in)

    // or, and, nor
const pageNumber = 1
const pageSize = 1

    const courses = await Course
    // .find({ category: "tech"})
    /* .find({ price : { $eq: 200} }) */
   /*  .skip(1)
    .limit(1) */
   /*  .find({
        author: /^R/,
    }) */
    .find()
    .skip((pageNumber -1 ) * pageSize)
    .sort({ name: 1})
    .select({name: 1, author: 1})
    console.log(courses);
}
/* GetCourses(); */