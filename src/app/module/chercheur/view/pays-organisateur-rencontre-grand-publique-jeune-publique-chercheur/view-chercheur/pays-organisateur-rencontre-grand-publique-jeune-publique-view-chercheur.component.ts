import {Component, OnInit} from '@angular/core';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-organisateur-rencontre-grand-publique-jeune-publique-view-chercheur',
  templateUrl: './pays-organisateur-rencontre-grand-publique-jeune-publique-view-chercheur.component.html',
  styleUrls: ['./pays-organisateur-rencontre-grand-publique-jeune-publique-view-chercheur.component.css']
})
export class PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get paysOrganisateurRencontreGrandPubliqueJeunePubliques(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
    return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques;
       }
set paysOrganisateurRencontreGrandPubliqueJeunePubliques(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique():PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }

   get viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog= value;
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
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
