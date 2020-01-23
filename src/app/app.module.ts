import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SocketIoModule.forRoot(config),

		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
