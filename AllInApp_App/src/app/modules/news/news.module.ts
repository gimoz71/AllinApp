import { ListObjectModule } from './../list-object/list-object.module';
import { NewsPage } from './../../pages/news/news';
import { NewsCardPage } from './../../pages/news-card/news-card';
import { NgModule } from '@angular/core';
import { MyChatPage } from '../../pages/mychat/mychat';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [NewsPage],
	imports: [IonicModule, ListObjectModule],
	exports: [NewsPage]
})
export class NewsModule {}
