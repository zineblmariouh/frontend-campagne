import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdChercheurService} from '../../../../../controller/service/TypeInstrumentIrdChercheur.service';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-type-instrument-ird-chercheur-view-chercheur',
  templateUrl: './type-instrument-ird-chercheur-view-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-chercheur-view-chercheur.component.css']
})
export class TypeInstrumentIrdChercheurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdChercheurService: TypeInstrumentIrdChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewTypeInstrumentIrdChercheurDialog  = false;
}

// getters and setters

get typeInstrumentIrdChercheurs(): Array<TypeInstrumentIrdChercheurVo> {
    return this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs;
       }
set typeInstrumentIrdChercheurs(value: Array<TypeInstrumentIrdChercheurVo>) {
        this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs = value;
       }

 get selectedTypeInstrumentIrdChercheur():TypeInstrumentIrdChercheurVo {
           return this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur;
       }
    set selectedTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur = value;
       }

   get viewTypeInstrumentIrdChercheurDialog():boolean {
           return this.typeInstrumentIrdChercheurService.viewTypeInstrumentIrdChercheurDialog;

       }
    set viewTypeInstrumentIrdChercheurDialog(value: boolean) {
        this.typeInstrumentIrdChercheurService.viewTypeInstrumentIrdChercheurDialog= value;
       }

       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
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
