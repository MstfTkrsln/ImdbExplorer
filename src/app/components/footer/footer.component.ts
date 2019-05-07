import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  constructor() {
  }

  ngOnInit() { 
  }

  sendMail(){
    window.location.href = 'mailto:info@imdbexplorer.com';
  }

  navigateTwitter(){
    window.open('https://twitter.com/imdb_explorer');
  }

  navigateInstagram(){
    window.open('https://instagram.com/imdb.explorer');
  }  

}
