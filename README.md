# An example of an XSS attack

The server exposes "/hello" endpoint that expects a name passed as a query parameter
and returns a message saying: "Hello, $name".

## Reflected XSS:

Since the server is concatenating the user input to the output message without any proper validation (e.g., escaping it), makes it vulnerable to Reflected XSS.
In such an attack, attacker can inject scripts that are then reflected back to the browser and execute immediately.

## Example:

The attacker can crafts the following URL and sends it to the victim
http://localhost:2000/hello?name=%3Cscript%3Ealert(document.cookie)%3C/script%3E

The script is then reflected to the browser that runs it immediatly, leading to accessing the cookies of HttpOnly attribute is not set to true.
