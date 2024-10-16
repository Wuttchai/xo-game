const express = require('express')
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const config = {
    user: 'sa',
    password: '123456789',
    server: 'localhost', // or '127.0.0.1'
    database: 'xo',
    options: {
        encrypt: true, // Use true for Azure, false for local
        trustServerCertificate: true, // Change as needed
    }
};

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
    sql.close();
}); 





/* app.get("/", (request, response) => {
    // Execute a SELECT query
    sql.connect(config);
    new sql.Request().query("SELECT u.UserName ,sum(s.Point) as Point , FORMAT (max(s.created_at), 'dd-MM-yyyy') as CreateDate  FROM Users u join Score s on u.UserID = s.user_id group by u.UserName, s.user_id", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
        sql.close();
    });
     
}); */


app.get('/', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);

        // Create a new request
        const request = new sql.Request();
 

        // Execute the query
        const result = await request.query("SELECT u.UserName ,sum(s.Point) as Point , FORMAT (max(s.created_at), 'dd-MM-yyyy') as CreateDate  FROM Users u join Score s on u.UserID = s.user_id group by u.UserName, s.user_id");

        // Send the result back as a JSON response
        res.send(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the connection
        await sql.close();
    }
});


app.get('/point-by-user', async (req, res) => {
    const userId = req.query.userID; 
    try {
        // Connect to the database
        await sql.connect(config);

        // Create a new request
        const request = new sql.Request();

        // Add parameters
        request.input('userId', sql.Int, userId);

        // Execute the query
        const result = await request.query('select top 2 point as point from Score where user_id = @userId order by score_id desc');

        // Send the result back as a JSON response
        res.send(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the connection
        await sql.close();
    }
});







/* app.get("/point-by-user", (request,response) => {
    const userID = request.query.userID; 
    getPointByUser(userID)
    response.send(getPointByUser(userID));
});


async function getPointByUser(userId) {
    try {
        // Connect to the database
        await sql.connect(config);

        // Create a request
        const request = new sql.Request();

        // Add parameters
        request.input('userId', sql.Int, userId);

        // Execute the query
        const result = await request.query('select top 3 point as point from Score where user_id = 1 order by score_id desc');
        return result
        console.log(result.recordset); // Handle the result set
    } catch (err) {
        console.error('SQL error', err);
    } finally {
        // Close the connection
        await sql.close();
    }
} */



app.post('/save-winner', (req, res) => {
    console.log(req.body)
    const { userID, point } = req.body; // Extract data from request body 
    
    // You can process the data here (e.g., save to a database)
     insertData(userID, point);
    // Send a response back to the client
    res.send({ message: 'Data received successfully', data: { userID, point } });
});

 async function insertData(name, point) {
    try {
        // Connect to the database
        let pool = await sql.connect(config);

        // Insert data
        const result = await pool.request()
            .input('userID', sql.VarChar, name)  // Adjust data type as needed
            .input('point', sql.Int, point) // Adjust data type as needed
            .query('INSERT INTO Score (user_id, Point) VALUES (@userID, @point)');

        console.log('Data inserted:', result.rowsAffected);
    } catch (err) {
        console.error('SQL error:', err);
    } finally {
        // Close the connection
        await sql.close();
    }
} 

 /* app.get("/", (request, response) => {
    // Execute a SELECT query
    new sql.Request().query("SELECT * FROM Users", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
});  */
 /* app.get('/', (req, res) => {
  res.send('Hello World!')
})  */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})