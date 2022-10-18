import {Component, OnInit} from '@angular/core';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-rencontre-media-edit-admin',
  templateUrl: './pays-rencontre-media-edit-admin.component.html',
  styleUrls: ['./pays-rencontre-media-edit-admin.component.css']
})
export class PaysRencontreMediaEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysRencontreMediaService: PaysRencontreMediaService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaService: RencontreMediaService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysRencontreMediaService.edit().subscribe(paysRencontreMedia=>{
    const myIndex = this.paysRencontreMedias.findIndex(e => e.id === this.selectedPaysRencontreMedia.id);
    this.paysRencontreMedias[myIndex] = this.selectedPaysRencontreMedia;
    this.editPaysRencontreMediaDialog = false;
    this.selectedPaysRencontreMedia = new PaysRencontreMediaVo();


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
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaysRencontreMediaDialog  = false;
}

// getters and setters

get paysRencontreMedias(): Array<PaysRencontreMediaVo> {
    return this.paysRencontreMediaService.paysRencontreMedias;
       }
set paysRencontreMedias(value: Array<PaysRencontreMediaVo>) {
        this.paysRencontreMediaService.paysRencontreMedias = value;
       }

 get selectedPaysRencontreMedia(): PaysRencontreMediaVo {
           return this.paysRencontreMediaService.selectedPaysRencontreMedia;
       }
    set selectedPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this.paysRencontreMediaService.selectedPaysRencontreMedia = value;
       }

   get editPaysRencontreMediaDialog(): boolean {
           return this.paysRencontreMediaService.editPaysRencontreMediaDialog;

       }
    set editPaysRencontreMediaDialog(value: boolean) {
        this.paysRencontreMediaService.editPaysRencontreMediaDialog = value;
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
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
