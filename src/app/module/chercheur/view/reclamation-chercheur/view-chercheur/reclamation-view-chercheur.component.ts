import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../controller/model/Reclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
import {TypeReclamationService} from '../../../../../controller/service/TypeReclamation.service';
import {EtatReclamationVo} from '../../../../../controller/model/EtatReclamation.model';
import {EtatReclamationService} from '../../../../../controller/service/EtatReclamation.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-reclamation-view-chercheur',
  templateUrl: './reclamation-view-chercheur.component.html',
  styleUrls: ['./reclamation-view-chercheur.component.css']
})
export class ReclamationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private reclamationService: ReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeReclamationService :TypeReclamationService
    ,private etatReclamationService :EtatReclamationService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
    this.selectedTypeReclamation = new TypeReclamationVo();
    this.typeReclamationService.findAll().subscribe((data) => this.typeReclamations = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewReclamationDialog  = false;
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get viewReclamationDialog():boolean {
           return this.reclamationService.viewReclamationDialog;

       }
    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog= value;
       }

       get selectedTypeReclamation():TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
      set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
       get typeReclamations():Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
       set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }
       get editTypeReclamationDialog():boolean {
           return this.typeReclamationService.editTypeReclamationDialog;
       }
      set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog= value;
       }
       get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations():Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get editEtatReclamationDialog():boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
      set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
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
