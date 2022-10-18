import {Component, OnInit} from '@angular/core';
import {InstrumentsEtDispositifsIrdService} from '../../../../../controller/service/InstrumentsEtDispositifsIrd.service';
import {InstrumentsEtDispositifsIrdVo} from '../../../../../controller/model/InstrumentsEtDispositifsIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-instruments-et-dispositifs-ird-view-admin',
  templateUrl: './instruments-et-dispositifs-ird-view-admin.component.html',
  styleUrls: ['./instruments-et-dispositifs-ird-view-admin.component.css']
})
export class InstrumentsEtDispositifsIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentsEtDispositifsIrdService: InstrumentsEtDispositifsIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewInstrumentsEtDispositifsIrdDialog  = false;
}

// getters and setters

get instrumentsEtDispositifsIrds(): Array<InstrumentsEtDispositifsIrdVo> {
    return this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds;
       }
set instrumentsEtDispositifsIrds(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds = value;
       }

 get selectedInstrumentsEtDispositifsIrd():InstrumentsEtDispositifsIrdVo {
           return this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd;
       }
    set selectedInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd = value;
       }

   get viewInstrumentsEtDispositifsIrdDialog():boolean {
           return this.instrumentsEtDispositifsIrdService.viewInstrumentsEtDispositifsIrdDialog;

       }
    set viewInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.instrumentsEtDispositifsIrdService.viewInstrumentsEtDispositifsIrdDialog= value;
       }

       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
