const express = require('express');
const app = express();
const port = 3000;
const zod = require('zod');

// Define Zod schema for the expected object structure
const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
  country: zod.literal('IN') // 'country' must be the string 'IN'
});

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to display "Hello"
app.get('/', (req, res) => {
  res.send("Hello");
});

// POST endpoint '/zod' to handle the object with email, password, and country properties
app.post('/zod', (req, res) => {
  const body = req.body; // Assuming req.body is an object with email, password, and country
  const response = schema.safeParse(body);

  if (!response.success) {
    res.status(400).json({ message: "Validation failed", errors: response.error.errors });
  } else {
    res.json({ message: "Validation successful", data: response.data });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
