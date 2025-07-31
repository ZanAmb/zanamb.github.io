import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Router } from '@angular/router';

interface FileNode{
  name: string;
  path: string;
  type: 'dir' | 'file';
  children?: FileNode[];
  open?: boolean;
}
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
repos: any[] = [];
fmf: any[] = []
repo: string = "";
rootFiles: FileNode[] = [];

  constructor(private github: GithubService, private router: Router) {}

  ngOnInit(): void {
    this.github.getRepos().subscribe(data => {
      this.repos = data;
      this.repos = this.repos.filter(r => r.name != "FMF"); // Exclude unwanted public repos (private would need authorization), in my case the one, shown separately
    });
    this.github.getRepoFolders('FMF')
      .subscribe(data => {
        this.fmf = data;
      });
  }

  openFmf(fol: string){
    this.router.navigate(['/repos', 'FMF', fol])
  }
  openRepo(rpn: string){
    this.router.navigate(['/repos', rpn]);
  }
}
