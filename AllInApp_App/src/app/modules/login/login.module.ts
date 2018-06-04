import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { LoginPage } from '../../pages/login/login';

import { LoginService } from '../../services/login/login.service';

@NgModule({
	declarations: [
		LoginPage
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		LoginPage
	],
	providers: [
		LoginService
	]
})
export class LoginModule {}
