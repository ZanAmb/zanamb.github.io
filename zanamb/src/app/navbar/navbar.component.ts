import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { GithubService } from '../services/github.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent implements OnInit {
  currentLang: string;
  fmf: any[] = [];
  othr: any[] = [];

  constructor(public translate: TranslateService, private github: GithubService, private router: Router) {
    this.currentLang = translate.currentLang || translate.getDefaultLang();
  }



  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  menuOpen=false;
  dropdownOpen=false;
  dropdownOpen2=false;
  isMobile=false;

  toggleMenu(){
    this.menuOpen =!this.menuOpen;
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }
  showDropdown(event: Event){
    if (!this.isMobile){
    this.dropdownOpen = true;}
  }
  hideDropdown(event: Event){
    if (!this.isMobile){
    this.dropdownOpen = false;}
  }
  toggleDropdown2(event: Event) {
    event.stopPropagation();
    this.dropdownOpen2 = !this.dropdownOpen2;
  }
  showDropdown2(event: Event){
    if (!this.isMobile){
    this.dropdownOpen2 = true;}
  }
  hideDropdown2(event: Event){
    if (!this.isMobile){
    this.dropdownOpen2 = false;}
  }

  ngOnInit() {
      this.isMobile = this.checkIfMobileDevice();
      window.addEventListener('click', this.handleOutsideClick);
      this.github.getRepoFolders('FMF')
      .subscribe(data => {
        this.fmf = data;
      });
      this.github.getRepos().subscribe(data => {
      this.othr = data;
      this.othr = this.othr.filter(r => r.name != "FMF"); // Exclude unwanted public repos (private would need authorization), in my case the one, shown separately.
    });
  }

  ngOnDestroy() {
      window.removeEventListener('click', this.handleOutsideClick);
  }
  handleOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && !target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }

    if (target && !target.closest('.navbar-links') && !target.closest('.hamburger')) {
      this.menuOpen = false;
    }
  }
  checkIfMobileDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  goHome(){
    window.location.href="#";
  }
  openFmf(fol: string){
    this.router.navigate(['/repos', 'FMF', fol])
    setTimeout(() => {
    window.location.reload();
  }, 5);
  }
    openRepo(rpn: string){
    this.router.navigate(['/repos', rpn]);
    setTimeout(() => {
    window.location.reload();
  }, 5);
  }
}
