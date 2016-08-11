import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';

import { IntroComponent }  from './intro/intro.component';

@NgModule({
  imports: [ BrowserModule,routing ],
  declarations: [ IntroComponent ],
  bootstrap: [ IntroComponent ]
})
export class AppModule { }
