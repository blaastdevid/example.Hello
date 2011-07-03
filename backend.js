
// Map of all connected clients
var clients = {};

// Listen to client connection and disconnection events
app.realtime(function(client, event) {
	if (event === 'CONNECTED') {
		// Map the client object by client id
		clients[client.id] = client;
	} else if (event === 'DISCONNECTED') {
		// Delete the client object mapping
		delete clients[client.id];
	}
});

// Listen to client messages
app.message(function(client, action, data) {
	// On 'chat' action, send the text to all connected clients
	if (action === 'chat') {
		var text = data.text;

		for (var k in clients) {
			var cl = clients[k];
			cl.msg('chat', { text: text });
		}
	}
});

// Used in this example:
//
// Application object
//		realtime()
//		message()
//
// Client object
//		msg()

