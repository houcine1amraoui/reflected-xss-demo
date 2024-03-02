const express = require("express");
const app = express();

// The /hello endpoint generates page output in code.
// It expects a name as a parameter to say "Hello, $name"
// and concatenates the user input to the output without escaping it.

// However this endpoint is vulnerable to Reflected XSS
// Reflected XSS: Injected scripts reflect off a web server and execute immediately,
// Occurs since user input is accepted without proper validation.
// Example: Attacker can crafts the following URL and sends it to the victim
// http://localhost:1000/hello?name=%3Cscript%3Ealert(1)%3C/script%3E
app.get("/hello", function (req, res) {
  res.send(`Hello, ${req.query.name}`);
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
