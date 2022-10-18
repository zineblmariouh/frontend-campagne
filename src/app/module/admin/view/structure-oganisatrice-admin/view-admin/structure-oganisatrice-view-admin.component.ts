import {Component, OnInit} from '@angular/core';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-structure-oganisatrice-view-admin',
  templateUrl: './structure-oganisatrice-view-admin.component.html',
  styleUrls: ['./structure-oganisatrice-view-admin.component.css']
})
export class StructureOganisatriceViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private structureOganisatriceService: StructureOganisatriceService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

hideViewDialog(){
    this.viewStructureOganisatriceDialog  = false;
}

// getters and setters

get structureOganisatrices(): Array<StructureOganisatriceVo> {
    return this.structureOganisatriceService.structureOganisatrices;
       }
set structureOganisatrices(value: Array<StructureOganisatriceVo>) {
        this.structureOganisatriceService.structureOganisatrices = value;
       }

 get selectedStructureOganisatrice():StructureOganisatriceVo {
           return this.structureOganisatriceService.selectedStructureOganisatrice;
       }
    set selectedStructureOganisatrice(value: StructureOganisatriceVo) {
        this.structureOganisatriceService.selectedStructureOganisatrice = value;
       }

   get viewStructureOganisatriceDialog():boolean {
           return this.structureOganisatriceService.viewStructureOganisatriceDialog;

       }
    set viewStructureOganisatriceDialog(value: boolean) {
        this.structureOganisatriceService.viewStructureOganisatriceDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedRencontreGrandPubliqueJeunePublique():RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques():Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get editRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
