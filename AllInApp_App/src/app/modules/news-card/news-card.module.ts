import { NewsCardPage } from './../../pages/news-card/news-card';
import { HomeMessModule } from './../home-mess/home-mess.module';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [NewsCardPage],
	imports: [IonicModule, HomeMessModule],
	exports: [NewsCardPage]
})
export class NewsCardModule {}
