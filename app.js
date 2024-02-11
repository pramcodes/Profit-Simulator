var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;   
var cors = require("cors");
const multer=require("multer");


var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://Pramit:8r3qvQC6OGoRAgfF@cluster0.bl756mz.mongodb.net/?retryWrites=true&w=majority"; 

var DATABASENAME = "Business";
var database;

app.listen(3000, () =>{
    Mongoclient.connect(CONNECTION_STRING, (error, client)=> {

        database = client.db(DATABASENAME);
        console.log("Connected to mongodb database");
    })

})

app.get('/GetBusiness/:name', (request, response) => {
    const query = { business_name: request.params.name };

    database.collection("Simulator").find(query).toArray((error, result) => {
        if (error) {
            response.status(500).send({ error: "Internal Server Error" });
            return;
        }

        if (result.length === 0) {
            response.status(404).send({ error: "Business not found" });
            return;
        }

        // Extract the password field from the first result (assuming there's only one result)
        const { password } = result[0];
        console.log(password);

        // Send only the password
        response.send({ password });
    });
});


// app.post("/api/todo/AddNotes", multer().none(),(request, response) => {
//     database.collection("Simulator").count({},function(err, numOfDocs){
//         database.collection("Simulator").insertOne({
//             id: (numOfDocs+1).toString() ,
//             title: request.body.title,
//             description: request.body.newNotes,
//         });
//         response.json("Added Successfully");
//     })
// })    


// app.post("/api/uploadCSV", multer().none(), (request, response) => {
//     try {
//       // Assuming csvData is an array of objects with Date and Profit properties
//       const csvData = request.body.csvData || [];
  
//       // Count existing documents in the "Data" collection
//       database.collection("Data").countDocuments({}, function (err, numOfDocs) {
//         if (err) {
//           response.status(500).json({ error: "Error counting documents in MongoDB" });
//           return;
//         }
  
//         // Prepare an array to store new data
//         const newDataArray = [];
  
//         // Iterate through the CSV data and format it
//         csvData.forEach((csvEntry, index) => {
//           const newData = {
//             id: (numOfDocs + index + 1).toString(),
//             Date: csvEntry.Date || "",
//             Profit: csvEntry.Profit || 0,  // Assuming Profit is a numeric value
//           };
  
//           newDataArray.push(newData);
//         });
  
//         // Insert the formatted data into the "Data" collection
//         database.collection("Data").insertMany(newDataArray, function (err, result) {
//           if (err) {
//             response.status(500).json({ error: "Failed to add data to MongoDB" });
//           } else {
//             response.json("Added Successfully");
//           }
//         });
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       response.status(400).json({ error: "Bad Request" });
//     }
//   });
  

// const express = require('express');
// const mongoose = require('mongoose');
// const ejs = require('ejs');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // Enable CORS for all routes
// app.use(cors());

// // Serve static files (index.html, etc.)
// app.use(express.static('public'));

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://Pramit:8r3qvQC6OGoRAgfF@cluster0.bl756mz.mongodb.net/Business?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1); // Exit the application on connection error
// });

// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Define a MongoDB schema
// const businessSchema = new mongoose.Schema({
//   _id: String,
//   business_name: String,
//   market: String,
//   products: [
//     {
//       product_name: String,
//       unit_price: Number,
//       quantity_sold: Number,
//     },
//   ],
//   expenses: [
//     {
//       expense_type: String,
//       amount: Number,
//     },
//   ],
//   revenues: [
//     {
//       source: String,
//       amount: Number,
//     },
//   ],
//   profit: Number,
//   timestamp: Date,
// }, { collection: 'Simulator' });

// // Create a MongoDB model based on the schema
// const Business = mongoose.model('Business', businessSchema);


// // Set up middleware to parse JSON requests
// app.use(express.json());



// // Define routes
// app.get('/getUserById/:name', async (req, res) => {
  
//   try {
//     const businesses = await Business.find({business_name: req.params.name});
//     // console.log(await mongoose.connection.db.listCollections().toArray());
//     // Render the 'businesses' view and pass the retrieved businesses as data
//     // console.log(businesses);
//     // res.render('index', { businesses });
//     res.send(businesses.params.password);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/business', async (req, res) => {
//   try {
//     const newBusiness = new Business(req.body);
//     await newBusiness.save();
//     res.status(201).json(newBusiness);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
