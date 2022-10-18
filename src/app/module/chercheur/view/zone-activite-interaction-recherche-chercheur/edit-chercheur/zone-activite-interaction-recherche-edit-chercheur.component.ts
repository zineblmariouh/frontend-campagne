import {Component, OnInit} from '@angular/core';
import {ZoneActiviteInteractionRechercheService} from '../../../../../controller/service/ZoneActiviteInteractionRecherche.service';
import {ZoneActiviteInteractionRechercheVo} from '../../../../../controller/model/ZoneActiviteInteractionRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-zone-activite-interaction-recherche-edit-chercheur',
  templateUrl: './zone-activite-interaction-recherche-edit-chercheur.component.html',
  styleUrls: ['./zone-activite-interaction-recherche-edit-chercheur.component.css']
})
export class ZoneActiviteInteractionRechercheEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneActiviteInteractionRechercheService: ZoneActiviteInteractionRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private paysService: PaysService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.zoneActiviteInteractionRechercheService.edit().subscribe(zoneActiviteInteractionRecherche=>{
    const myIndex = this.zoneActiviteInteractionRecherches.findIndex(e => e.id === this.selectedZoneActiviteInteractionRecherche.id);
    this.zoneActiviteInteractionRecherches[myIndex] = this.selectedZoneActiviteInteractionRecherche;
    this.editZoneActiviteInteractionRechercheDialog = false;
    this.selectedZoneActiviteInteractionRecherche = new ZoneActiviteInteractionRechercheVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editZoneActiviteInteractionRechercheDialog  = false;
}

// getters and setters

get zoneActiviteInteractionRecherches(): Array<ZoneActiviteInteractionRechercheVo> {
    return this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRecherches;
       }
set zoneActiviteInteractionRecherches(value: Array<ZoneActiviteInteractionRechercheVo>) {
        this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRecherches = value;
       }

 get selectedZoneActiviteInteractionRecherche(): ZoneActiviteInteractionRechercheVo {
           return this.zoneActiviteInteractionRechercheService.selectedZoneActiviteInteractionRecherche;
       }
    set selectedZoneActiviteInteractionRecherche(value: ZoneActiviteInteractionRechercheVo) {
        this.zoneActiviteInteractionRechercheService.selectedZoneActiviteInteractionRecherche = value;
       }

   get editZoneActiviteInteractionRechercheDialog(): boolean {
           return this.zoneActiviteInteractionRechercheService.editZoneActiviteInteractionRechercheDialog;

       }
    set editZoneActiviteInteractionRechercheDialog(value: boolean) {
        this.zoneActiviteInteractionRechercheService.editZoneActiviteInteractionRechercheDialog = value;
       }

       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
