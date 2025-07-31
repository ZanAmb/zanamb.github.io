import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GithubService } from '../services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';
import { HttpClient } from '@angular/common/http';

const exclude = [".gitattributes", ".md"];
@Component({
  selector: 'app-browser',
  standalone: false,
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BrowserComponent implements OnInit {
  username = '';
  repo = '';
  path = '';
  items: any[] = [];
  readme: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private github: GithubService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
      await new Promise(resolve => setTimeout(resolve, 5));
      const full = this.router.url.replace(/^\/repos\//, '');
      const segments = full.split('/');
      this.repo = segments[0];
      this.path = segments.slice(1).join("/");
      this.loadContents();
  }
  get fFiles(){
    return this.items.filter(item => {
      if (item.type === "dir") return true;
      const extension = item.name.slice(item.name.lastIndexOf(".")).toLowerCase();
      return !exclude.includes(extension);
    })
  }
  loadContents(): void {
    const fetchPath = this.path || '';
    this.github.getFolderContents(this.repo, fetchPath)
      .subscribe(data => {this.items = data;

        const readmeItem = data.find(item => item.name.toLowerCase() === 'readme.md');
    if (readmeItem?.download_url) {
      this.http.get(readmeItem.download_url, { responseType: 'text' }).subscribe(md => {
        this.readme = marked.parse(md);
        console.log(this.readme)
      });
    }
      });
  }

  openDir(repo: string, pth: any){
    this.router.navigateByUrl('repos/' + repo + "/" + pth.replace("%2F", "/"));
    setTimeout(() => {
    this.ngOnInit();
  }, 5);
  }

  goUpDirectory() {
  const url = this.router.url;
  const segments = url.split('/').filter(s => s.length > 0);

  if (segments.length > 2) {
    const parentSegments = segments.slice(0, -1);
    const parentUrl = '/' + parentSegments.join('/');

    this.router.navigateByUrl(parentUrl);
    setTimeout(() => {
    this.ngOnInit();
  }, 5);
  } else {
    this.router.navigateByUrl("/");
  }
}
}
