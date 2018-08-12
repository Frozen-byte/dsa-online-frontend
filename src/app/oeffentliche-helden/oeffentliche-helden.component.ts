import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {RoutingService} from '../shared/routing.service';
import {MessageService} from '../service/message/message.service';
import {HeldenInfo, HeldenService} from '../meine-helden/helden.service';
import {GruppeIncludingHeld, GruppenService} from '../meine-helden/gruppen.service';
import {isMobile} from "../util/Constants";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-oeffentliche-helden',
  templateUrl: './oeffentliche-helden.component.html',
  styleUrls: ['./oeffentliche-helden.component.css']
})
export class OeffentlicheHeldenComponent implements OnInit {


  public activeIndex = null;
  public gruppen: GruppeIncludingHeld[];

  private publicOnly = true;
  private showInactive = false;

  constructor(private gruppenService: GruppenService, private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadGruppen();
    this.activatedRoute.queryParams.subscribe((data) => this.activeIndex = parseInt(data.gruppe, 10));
  }

  loadGruppen() {
      this.gruppenService.getGruppenIncludingHeld(this.publicOnly, this.showInactive)
        .subscribe((data) => this.gruppen = data);
  }

  onPublicChange(event) {
    this.publicOnly = event.checked;
    this.loadGruppen();
  }

  onActiveChange(event) {
    this.showInactive = !event.checked;
    this.loadGruppen();
  }

  get canViewAll(): boolean {
    return this.authenticationService.rights.indexOf('VIEW_ALL') !== -1;
  }

  get editHelden() {
    return this.authenticationService.rights.indexOf('EDIT_ALL') !== -1;
  }

  forceReload() {
    this.loadGruppen();
  }

  onOpen(event) {
    this.activeIndex = event.index;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        gruppe: this.activeIndex
      }
    });
  }


}
