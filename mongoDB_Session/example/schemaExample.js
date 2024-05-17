// This is a schema in Mongoose
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 18 },
  });
  
  const User = mongoose.model('User', userSchema);


// Now with MongoDB Driver

//There isn't a MongoDB Driver example!!

// When using the MongoDB Node.js driver directly, 
// there's no built-in schema definition or validation. You would need
// to handle schema validation manually in your application code or rely
// on MongoDB's schemaless nature, which may lead to less structured data
// and potential data inconsistencies.