// example.Hello -- bootstrap.js

var app = this;

// Listen to the connected event. This tells the runtime we need a connection to the backend.
// Without listening to this event, the application runs offline.
app.on('connected', function() {
	console.log('Connected to backend.');	
});
