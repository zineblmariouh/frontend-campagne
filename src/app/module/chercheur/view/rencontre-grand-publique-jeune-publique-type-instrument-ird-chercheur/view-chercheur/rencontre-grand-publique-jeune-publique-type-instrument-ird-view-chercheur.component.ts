import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-type-instrument-ird-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-type-instrument-ird-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-type-instrument-ird-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd():RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

   get viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog= value;
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
