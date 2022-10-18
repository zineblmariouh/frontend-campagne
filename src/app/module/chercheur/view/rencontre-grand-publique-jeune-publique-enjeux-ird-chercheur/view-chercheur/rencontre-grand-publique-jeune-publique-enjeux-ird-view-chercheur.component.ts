import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-enjeux-ird-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-enjeux-ird-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-enjeux-ird-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
       }
set rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd():RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

   get viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
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
