import {Component, OnInit} from '@angular/core';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';

@Component({
  selector: 'app-rencontre-media-periode-edit-chercheur',
  templateUrl: './rencontre-media-periode-edit-chercheur.component.html',
  styleUrls: ['./rencontre-media-periode-edit-chercheur.component.css']
})
export class RencontreMediaPeriodeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaPeriodeService: RencontreMediaPeriodeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaService: RencontreMediaService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedRencontreMediaPeriode.dateRencontre = DateUtils.toDate(this.selectedRencontreMediaPeriode.dateRencontre);
    this.rencontreMediaPeriodeService.edit().subscribe(rencontreMediaPeriode=>{
    const myIndex = this.rencontreMediaPeriodes.findIndex(e => e.id === this.selectedRencontreMediaPeriode.id);
    this.rencontreMediaPeriodes[myIndex] = this.selectedRencontreMediaPeriode;
    this.editRencontreMediaPeriodeDialog = false;
    this.selectedRencontreMediaPeriode = new RencontreMediaPeriodeVo();


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
// methods

hideEditDialog(){
    this.editRencontreMediaPeriodeDialog  = false;
}

// getters and setters

get rencontreMediaPeriodes(): Array<RencontreMediaPeriodeVo> {
    return this.rencontreMediaPeriodeService.rencontreMediaPeriodes;
       }
set rencontreMediaPeriodes(value: Array<RencontreMediaPeriodeVo>) {
        this.rencontreMediaPeriodeService.rencontreMediaPeriodes = value;
       }

 get selectedRencontreMediaPeriode(): RencontreMediaPeriodeVo {
           return this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode;
       }
    set selectedRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode = value;
       }

   get editRencontreMediaPeriodeDialog(): boolean {
           return this.rencontreMediaPeriodeService.editRencontreMediaPeriodeDialog;

       }
    set editRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.editRencontreMediaPeriodeDialog = value;
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
