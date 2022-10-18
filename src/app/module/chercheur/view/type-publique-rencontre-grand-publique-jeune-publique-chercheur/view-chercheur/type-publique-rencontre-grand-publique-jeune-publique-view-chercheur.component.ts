import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';

@Component({
  selector: 'app-type-publique-rencontre-grand-publique-jeune-publique-view-chercheur',
  templateUrl: './type-publique-rencontre-grand-publique-jeune-publique-view-chercheur.component.html',
  styleUrls: ['./type-publique-rencontre-grand-publique-jeune-publique-view-chercheur.component.css']
})
export class TypePubliqueRencontreGrandPubliqueJeunePubliqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueRencontreGrandPubliqueJeunePubliqueService: TypePubliqueRencontreGrandPubliqueJeunePubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private typePubliqueService :TypePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
}

hideViewDialog(){
    this.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get typePubliqueRencontreGrandPubliqueJeunePubliques(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques;
       }
set typePubliqueRencontreGrandPubliqueJeunePubliques(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedTypePubliqueRencontreGrandPubliqueJeunePublique():TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
       }
    set selectedTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

   get viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog= value;
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
       get selectedTypePublique():TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques():Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get editTypePubliqueDialog():boolean {
           return this.typePubliqueService.editTypePubliqueDialog;
       }
      set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
