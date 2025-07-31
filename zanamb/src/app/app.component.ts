import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})

export class AppComponent {
  title = 'zanamb';
  constructor(private translate: TranslateService) {
  translate.addLangs(['en', 'sl']);
  translate.setDefaultLang('en');

  const browserLang = translate.getBrowserLang() || 'sl';
  const savedLang = localStorage.getItem('lang');
  translate.use(savedLang || browserLang?.match(/en|sl/) ? browserLang : 'en');
}
}
