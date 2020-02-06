import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

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
	].slice(0,7);
	title = 'm4d-chat-client';
	toSendMessage = '';
	toSendImage = '';
	username: string;
	messages: { body: string, admin: boolean, date: string }[] = [];

	selectedFile: File;
	base64: string | ArrayBuffer;
	constructor(private socket: Socket, private http: HttpClient) { }

	onSendMessage() {
		this.socket.emit('messageFromClientToServer', { text: this.toSendMessage, username: this.username });
		this.messages.push({ body: this.toSendMessage, admin: false, date: new Date().toDateString() });
		console.log(this.toSendMessage);
		this.toSendMessage = '';
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
	public getUsername(): string {
		let usernameindex = localStorage.getItem('usernameIndexCount');
		if (usernameindex) {
			usernameindex = (parseInt(usernameindex) + 1) + '';
			if (parseInt(usernameindex) === this.usersList.length) {
				usernameindex = '0';
			}
			localStorage.setItem('usernameIndexCount', usernameindex);
		} else {
			localStorage.setItem('usernameIndexCount', '0');
		}

		return this.usersList[parseInt(usernameindex)];
	}

	async onFileChanged(event) {
		this.selectedFile = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(this.selectedFile);
		reader.onload = () => this.base64 = reader.result;
		reader.onerror = error => console.error(error);

	}
async onAudioChanged(event) {
		this.selectedFile = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(this.selectedFile);
		reader.onload = () => {
			this.base64 = reader.result;
			console.log(this.base64);
			
			};
		reader.onerror = error => console.error(error);

	}
	onSendImage() {
		console.log(this.socket);
		this.http.post('http://localhost:3000/image-upload', {
			data: this.base64,
			username: this.username,
			sourceSocketId: this.socket.ioSocket.id
			}).subscribe((response) => {
			console.log(response);
		}, err => console.log(err));
	}
	onSendAudio() {
		console.log(this.socket);
		this.http.post('http://localhost:3000/audio-upload', {
			data: this.base64,
			username: this.username,
			sourceSocketId: this.socket.ioSocket.id
			}).subscribe((response) => {
			console.log(response);
		}, err => console.log(err));
	}
}
