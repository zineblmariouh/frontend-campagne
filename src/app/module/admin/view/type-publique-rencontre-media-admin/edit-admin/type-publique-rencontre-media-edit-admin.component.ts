import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';

@Component({
  selector: 'app-type-publique-rencontre-media-edit-admin',
  templateUrl: './type-publique-rencontre-media-edit-admin.component.html',
  styleUrls: ['./type-publique-rencontre-media-edit-admin.component.css']
})
export class TypePubliqueRencontreMediaEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueRencontreMediaService: TypePubliqueRencontreMediaService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaService: RencontreMediaService
 ,       private typePubliqueService: TypePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typePubliqueRencontreMediaService.edit().subscribe(typePubliqueRencontreMedia=>{
    const myIndex = this.typePubliqueRencontreMedias.findIndex(e => e.id === this.selectedTypePubliqueRencontreMedia.id);
    this.typePubliqueRencontreMedias[myIndex] = this.selectedTypePubliqueRencontreMedia;
    this.editTypePubliqueRencontreMediaDialog = false;
    this.selectedTypePubliqueRencontreMedia = new TypePubliqueRencontreMediaVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreaterencontreMedia(rencontreMedia: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'add');
                       if(isPermistted){
         this.selectedRencontreMedia = new RencontreMediaVo();
        this.createRencontreMediaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypePublique(typePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePublique', 'add');
                       if(isPermistted){
         this.selectedTypePublique = new TypePubliqueVo();
        this.createTypePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTypePubliqueRencontreMediaDialog  = false;
}

// getters and setters

get typePubliqueRencontreMedias(): Array<TypePubliqueRencontreMediaVo> {
    return this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias;
       }
set typePubliqueRencontreMedias(value: Array<TypePubliqueRencontreMediaVo>) {
        this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias = value;
       }

 get selectedTypePubliqueRencontreMedia(): TypePubliqueRencontreMediaVo {
           return this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia;
       }
    set selectedTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia = value;
       }

   get editTypePubliqueRencontreMediaDialog(): boolean {
           return this.typePubliqueRencontreMediaService.editTypePubliqueRencontreMediaDialog;

       }
    set editTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.editTypePubliqueRencontreMediaDialog = value;
       }

       get selectedRencontreMedia(): RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias(): Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get createRencontreMediaDialog(): boolean {
           return this.rencontreMediaService.createRencontreMediaDialog;
       }
      set createRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.createRencontreMediaDialog= value;
       }
       get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get createTypePubliqueDialog(): boolean {
           return this.typePubliqueService.createTypePubliqueDialog;
       }
      set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
