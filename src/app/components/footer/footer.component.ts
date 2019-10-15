import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private gas: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  sendMail() {
    window.location.href = 'mailto:info@imdbexplorer.com';
    this.gas.emitEvent("contact", "e-mail");
  }

  navigateTwitter() {
    window.open('https://twitter.com/imdb_explorer');
    this.gas.emitEvent("social-media", "twitter");
  }

  navigateInstagram() {
    window.open('https://instagram.com/imdb.explorer');
    this.gas.emitEvent("social-media", "instagram");
  }

}
