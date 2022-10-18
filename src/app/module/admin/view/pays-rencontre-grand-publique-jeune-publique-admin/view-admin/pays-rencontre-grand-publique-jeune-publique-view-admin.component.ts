import {Component, OnInit} from '@angular/core';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
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
  selector: 'app-pays-rencontre-grand-publique-jeune-publique-view-admin',
  templateUrl: './pays-rencontre-grand-publique-jeune-publique-view-admin.component.html',
  styleUrls: ['./pays-rencontre-grand-publique-jeune-publique-view-admin.component.css']
})
export class PaysRencontreGrandPubliqueJeunePubliqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysRencontreGrandPubliqueJeunePubliqueService: PaysRencontreGrandPubliqueJeunePubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

hideViewDialog(){
    this.viewPaysRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get paysRencontreGrandPubliqueJeunePubliques(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    return this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques;
       }
set paysRencontreGrandPubliqueJeunePubliques(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedPaysRencontreGrandPubliqueJeunePublique():PaysRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique = value;
       }

   get viewPaysRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.viewPaysRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set viewPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.viewPaysRencontreGrandPubliqueJeunePubliqueDialog= value;
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
