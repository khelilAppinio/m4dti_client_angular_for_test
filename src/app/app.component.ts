import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'm4d-chat-client';
	toSendMessage = '';
	toSendImage = '';
	username: string;
	messages: { body: string, admin: boolean, date: string }[] = [];
	constructor(private socket: Socket) { }

	onSendMessage() {
		this.socket.emit('messageFromClientToServer', this.toSendMessage);
		this.messages.push({body: this.toSendMessage, admin: false, date: new Date().toDateString()});
		console.log(this.toSendMessage);
		this.toSendMessage = '';
	}

	onFileChanged(event: any) {
		let img = URL.createObjectURL(event.target.files[0]);
		console.log(event);
	}

	ngOnInit(): void {
		this.username = prompt('[Test] enter username', 'No username');
		this.socket.emit('messageInitFromClient', this.username); //! TODO: error handling

		this.socket.on('messageFromServerToClient', (response) => {
			console.log(response);
		});

		this.socket.on('messageFromMainClientToClient', (response) => {
			this.messages.push({body: response.body, admin: true, date: new Date().toDateString()});
		});
	}
}
