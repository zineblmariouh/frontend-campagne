import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-periode-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-periode-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-periode-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliquePeriodeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliquePeriodeService: RencontreGrandPubliqueJeunePubliquePeriodeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliquePeriodes(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
    return this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes;
       }
set rencontreGrandPubliqueJeunePubliquePeriodes(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliquePeriode():RencontreGrandPubliqueJeunePubliquePeriodeVo {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode;
       }
    set selectedRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

   get viewRencontreGrandPubliqueJeunePubliquePeriodeDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog= value;
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
