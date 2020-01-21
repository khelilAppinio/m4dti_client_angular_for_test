import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	usersList = [
		'staplingcircumpolar',
		'downmanual',
		'trashadmissions',
		'unlockinghoop',
		'atticwinnings',
		'glidematerial',
		'baboonascend',
		'torchcasino',
		'fonticonsfaith',
		'heliumjulian',
		'mortifyfavourite',
		'dilationmuzzle',
		'spiritualicing',
		'peeppolio',
		'decimalouachita',
		'dishsailor',
		'septumwife',
		'scadderabandoned',
		'marionfriday',
		'untaggedcake',
		'fiddlesydney',
		'digbywing',
		'inversescolding',
		'amusermotorcycle',
		'dramatizeunkempt',
		'esteemedpenny',
		'rustyduckling'
	];
	title = 'm4d-chat-client';
	toSendMessage = '';
	toSendImage = '';
	username: string;
	messages: { body: string, admin: boolean, date: string }[] = [];
	constructor(private socket: Socket) { }

	onSendMessage() {
		this.socket.emit('messageFromClientToServer', {text: this.toSendMessage, username: this.username});
		this.messages.push({ body: this.toSendMessage, admin: false, date: new Date().toDateString() });
		console.log(this.toSendMessage);
		this.toSendMessage = '';
	}

	onFileChanged(event: any) {
		const img = URL.createObjectURL(event.target.files[0]);
		console.log(event);
	}

	ngOnInit(): void {
		this.username = this.getUsername();
		this.socket.emit('messageInitFromClient', this.username); // ! TODO: error handling

		this.socket.on('messageFromServerToClient', (response) => {
			console.log(response);
		});

		this.socket.on('messageFromMainClientToClient', (response) => {
			this.messages.push({ body: response.body, admin: true, date: new Date().toDateString() });
		});
	}
	public getUsername(): string{
		let usernameindex = localStorage.getItem('usernameIndexCount');
		if (usernameindex) {
			usernameindex = (parseInt(usernameindex)+1) + '';
			if (parseInt(usernameindex) === this.usersList.length) {
				usernameindex = '0';
			}
			localStorage.setItem('usernameIndexCount', usernameindex);
		} else {
			localStorage.setItem('usernameIndexCount', '0');
		}

		return this.usersList[parseInt(usernameindex)];
	}
}
