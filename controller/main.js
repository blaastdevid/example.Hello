//
// example.Hello -- reading text input, sending messages between the mobile client and server.
// Messages are echoed back to all connected clients.
//
// See the chapter "Your First App - Hello Mobile", on the Getting Started Guide for a detailed
// runthrough of this example app.
//

var InputBox = require('ui').InputBox;
var TextView = require('ui').TextView;

var app = this;

var strings = ['Hello!', 'Waiting for your input...'];
var counter = 0;
var timer;

exports[':active'] = function() {
	var view = this;
	timer = setInterval(function() {
		view.get('hello').label(strings[counter++]);
		counter %= strings.length;
	}, 1000);
};

exports[':inactive'] = function() {
	clearInterval(timer);
};

exports[':keypress'] = function(key) {
     strings.push(key);
	 this.input.emit('keypress', key);
};

exports[':load'] = function() {
	var view = this;

	view.input = new InputBox({
		style: {
			'background-color': '#aaaaee',
			width: 'fill-parent',
			height: 20
		}
	});

	view.add(view.input);

	view.input.on('submit', function() {
		app.msg('chat', { text: view.input.value() });
		view.input.value('');
	});
	
	app.on('message', function(action, data) {
		var tv = new TextView({
			label: data.text
		});
		view.add(tv, { before: 0 });
	});
};
