import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { GruppenService, GruppeSelectItem } from "../shared/gruppen.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public roadMap = [
    {
      label: 'Regelmäßiges updaten der Helden',
      done: true
    },
    {
      label: 'PDF-Download',
      done: true
    },
    {
      label: 'XML-Download',
      done: true
    },
    {
      label: 'Öffentlich sichtbare Helden',
      done: true
    },
    {
      label: 'Laden von Helden über URL',
      done: true
    },
    {
      label: 'Versions-Vergleich',
      done: true
    },
    {
      label: 'PDF für alte Helden',
      done: true
    },
    {
      label: 'Aventurischer Kalender',
      done: false
    },
    {
      label: 'Einträge für Gruppen im Kalender',
      done: false
    },
    {
      label: 'Einträge für Helden im Kalender',
      done: false
    },
    {
      label: 'Wecker für Helden (z.B. für Rüstungsgewöhnung)',
      done: false
    }

  ];
  public groups: Observable<GruppeSelectItem[]> = this.gruppenService.getGroups();

  constructor(
    private gruppenService: GruppenService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  public selectGroup(groupItem: GruppeSelectItem) {
    this.gruppenService.setCurrentGroup(groupItem.value);
    this.router.navigate(["/gruppen"]);
  }
}
