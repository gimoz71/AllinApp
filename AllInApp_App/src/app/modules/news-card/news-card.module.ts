import { HomeNewsModule } from './../home-news/home-com.module';
import { NewsCardPage } from './../../pages/news-card/news-card';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [NewsCardPage],
	imports: [IonicModule, HomeNewsModule],
	exports: [NewsCardPage]
})
export class NewsCardModule {}
