import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComunicazioniPage } from '../comunicazioni/comunicazioni';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public header1: string;
  public header2: string;
  public header3: string;

  public content1: string;
  public content2: string;
  public content3: string;


  constructor(public navCtrl: NavController) {

  }

  public ngOnInit() : void {
    this.header1 = "header1_prova";
    this.header2 = "header2_prova";
    this.header3 = "header3_prova";
    this.content1 = "content1_prova";
    this.content2 = "content2_prova";
    this.content3 = "content3_prova";
  }

  public load() : void {
    this.navCtrl.push(ComunicazioniPage, {val: 'pippo'});
  }

}
