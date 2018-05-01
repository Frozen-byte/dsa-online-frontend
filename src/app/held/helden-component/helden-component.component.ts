import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-helden-component',
  templateUrl: './helden.component.html',
  styleUrls: ['./helden.component.css']
})
export abstract class HeldenComponent implements OnInit {

  constructor(private heldenService: HeldenService, private router: Router) { }

  ngOnInit() {
    if (!this.heldenService.held) {
      this.router.navigateByUrl('home');
    } else {
      this.init();
    }
  }

  protected init(): void {}

  get held() {
    return this.heldenService.held;
  }

}
