import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})

export class AppComponent {
  title = 'zanamb';
  constructor(private translate: TranslateService, private router: Router) {
  translate.addLangs(['en', 'sl']);
  translate.setDefaultLang('sl');

  const browserLang = translate.getBrowserLang() || 'sl';
  const savedLang = localStorage.getItem('lang');
  const langToUse = savedLang && ['en', 'sl'].includes(savedLang)
  ? savedLang
  : (browserLang && ['en', 'sl'].includes(browserLang) ? browserLang : 'sl');

translate.use(langToUse);

  const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      const relativeUrl = redirect.substring(location.origin.length);
      this.router.navigateByUrl(relativeUrl);
    }
}
}
