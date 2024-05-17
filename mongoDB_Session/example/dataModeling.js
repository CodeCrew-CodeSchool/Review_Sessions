// In Mongoose data modeling with models looks like this

// Using the User model we kind of used in server.js
const users = await User.find().sort({ name: 1 }).limit(10);

// Now with MongoDB Driver

// Using the MongoDB Node.js driver directly
const users = await collection.find().sort({ name: 1 }).limit(10).toArray();





// In this example, Mongoose's data modeling with models provides a more 
// expressive and object-oriented way to interact with data. You can use
// methods like find, findOne, and sort directly on the Mongoose model 
// (User) to query and manipulate data, making the code more readable 
// and easier to maintain.

// On the other hand, when using the MongoDB Node.js driver directly, 
// you need to work with MongoDB collections and methods like find and 
// sort on the collection object obtained from the database connection. 
// While still functional, this approach requires more boilerplate code 
// and lacks the convenience and abstraction provided by Mongoose's data 
// modeling features