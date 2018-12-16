import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { IntroComponent } from './components/intro/intro.component';
import { IntroTitleComponent } from './components/intro/intro-title/intro-title.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    IntroComponent,
    IntroTitleComponent,
  ]
})
export class CoreModule { }
