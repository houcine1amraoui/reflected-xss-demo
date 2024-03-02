# reflected-xss-demo

# An example of an XSS attack

The server exposes "/hello" endpoint expects a name passed as a query parameter
and returns message saying: "Hello, $name".

Reflected XSS:

Since the server is concatenating the user input to the output message without proper validation (e.g., escaping it), this makes it vulnerable to Reflected XSS.
In XSS attacks, injected scripts reflect off to web server and execute immediately.

## Example:

Attacker can crafts the following URL and sends it to the victim
http://localhost:2000/hello?name=%3Cscript%3Ealert(1)%3C/script%3E

The script is then reflected to the browser that runs it immediatly, leading to accessing the cookies of HttpOnly attribute is not set to true.
