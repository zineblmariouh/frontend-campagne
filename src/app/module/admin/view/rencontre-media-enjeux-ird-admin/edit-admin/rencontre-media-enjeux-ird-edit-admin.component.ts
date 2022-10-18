import {Component, OnInit} from '@angular/core';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-rencontre-media-enjeux-ird-edit-admin',
  templateUrl: './rencontre-media-enjeux-ird-edit-admin.component.html',
  styleUrls: ['./rencontre-media-enjeux-ird-edit-admin.component.css']
})
export class RencontreMediaEnjeuxIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaEnjeuxIrdService: RencontreMediaEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaService: RencontreMediaService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreMediaEnjeuxIrdService.edit().subscribe(rencontreMediaEnjeuxIrd=>{
    const myIndex = this.rencontreMediaEnjeuxIrds.findIndex(e => e.id === this.selectedRencontreMediaEnjeuxIrd.id);
    this.rencontreMediaEnjeuxIrds[myIndex] = this.selectedRencontreMediaEnjeuxIrd;
    this.editRencontreMediaEnjeuxIrdDialog = false;
    this.selectedRencontreMediaEnjeuxIrd = new RencontreMediaEnjeuxIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
// methods

hideEditDialog(){
    this.editRencontreMediaEnjeuxIrdDialog  = false;
}

// getters and setters

get rencontreMediaEnjeuxIrds(): Array<RencontreMediaEnjeuxIrdVo> {
    return this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds;
       }
set rencontreMediaEnjeuxIrds(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds = value;
       }

 get selectedRencontreMediaEnjeuxIrd(): RencontreMediaEnjeuxIrdVo {
           return this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd;
       }
    set selectedRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd = value;
       }

   get editRencontreMediaEnjeuxIrdDialog(): boolean {
           return this.rencontreMediaEnjeuxIrdService.editRencontreMediaEnjeuxIrdDialog;

       }
    set editRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.editRencontreMediaEnjeuxIrdDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
