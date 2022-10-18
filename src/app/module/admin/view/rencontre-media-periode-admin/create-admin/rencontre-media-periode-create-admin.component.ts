import {Component, OnInit, Input} from '@angular/core';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
@Component({
  selector: 'app-rencontre-media-periode-create-admin',
  templateUrl: './rencontre-media-periode-create-admin.component.html',
  styleUrls: ['./rencontre-media-periode-create-admin.component.css']
})
export class RencontreMediaPeriodeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private rencontreMediaPeriodeService: RencontreMediaPeriodeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreMediaService :RencontreMediaService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.rencontreMediaPeriodeService.save().subscribe(rencontreMediaPeriode=>{
       this.rencontreMediaPeriodes.push({...rencontreMediaPeriode});
       this.createRencontreMediaPeriodeDialog = false;
       this.submitted = false;
       this.selectedRencontreMediaPeriode = new RencontreMediaPeriodeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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

hideCreateDialog(){
    this.createRencontreMediaPeriodeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreMediaPeriodes(): Array<RencontreMediaPeriodeVo> {
    return this.rencontreMediaPeriodeService.rencontreMediaPeriodes;
       }
set rencontreMediaPeriodes(value: Array<RencontreMediaPeriodeVo>) {
        this.rencontreMediaPeriodeService.rencontreMediaPeriodes = value;
       }

 get selectedRencontreMediaPeriode():RencontreMediaPeriodeVo {
           return this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode;
       }
    set selectedRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode = value;
       }

   get createRencontreMediaPeriodeDialog(): boolean {
           return this.rencontreMediaPeriodeService.createRencontreMediaPeriodeDialog;

       }
    set createRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.createRencontreMediaPeriodeDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }



}
