import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';

@Component({
  selector: 'app-type-publique-rencontre-media-view-chercheur',
  templateUrl: './type-publique-rencontre-media-view-chercheur.component.html',
  styleUrls: ['./type-publique-rencontre-media-view-chercheur.component.css']
})
export class TypePubliqueRencontreMediaViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueRencontreMediaService: TypePubliqueRencontreMediaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaService :RencontreMediaService
    ,private typePubliqueService :TypePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

hideViewDialog(){
    this.viewTypePubliqueRencontreMediaDialog  = false;
}

// getters and setters

get typePubliqueRencontreMedias(): Array<TypePubliqueRencontreMediaVo> {
    return this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias;
       }
set typePubliqueRencontreMedias(value: Array<TypePubliqueRencontreMediaVo>) {
        this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias = value;
       }

 get selectedTypePubliqueRencontreMedia():TypePubliqueRencontreMediaVo {
           return this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia;
       }
    set selectedTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia = value;
       }

   get viewTypePubliqueRencontreMediaDialog():boolean {
           return this.typePubliqueRencontreMediaService.viewTypePubliqueRencontreMediaDialog;

       }
    set viewTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.viewTypePubliqueRencontreMediaDialog= value;
       }

       get selectedRencontreMedia():RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias():Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get editRencontreMediaDialog():boolean {
           return this.rencontreMediaService.editRencontreMediaDialog;
       }
      set editRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.editRencontreMediaDialog= value;
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
