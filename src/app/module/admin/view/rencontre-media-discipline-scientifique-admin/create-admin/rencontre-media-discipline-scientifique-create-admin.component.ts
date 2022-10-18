import {Component, OnInit, Input} from '@angular/core';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
@Component({
  selector: 'app-rencontre-media-discipline-scientifique-create-admin',
  templateUrl: './rencontre-media-discipline-scientifique-create-admin.component.html',
  styleUrls: ['./rencontre-media-discipline-scientifique-create-admin.component.css']
})
export class RencontreMediaDisciplineScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private rencontreMediaDisciplineScientifiqueService: RencontreMediaDisciplineScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private rencontreMediaService :RencontreMediaService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
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
     this.rencontreMediaDisciplineScientifiqueService.save().subscribe(rencontreMediaDisciplineScientifique=>{
       this.rencontreMediaDisciplineScientifiques.push({...rencontreMediaDisciplineScientifique});
       this.createRencontreMediaDisciplineScientifiqueDialog = false;
       this.submitted = false;
       this.selectedRencontreMediaDisciplineScientifique = new RencontreMediaDisciplineScientifiqueVo();


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
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createRencontreMediaDisciplineScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreMediaDisciplineScientifiques(): Array<RencontreMediaDisciplineScientifiqueVo> {
    return this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques;
       }
set rencontreMediaDisciplineScientifiques(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques = value;
       }

 get selectedRencontreMediaDisciplineScientifique():RencontreMediaDisciplineScientifiqueVo {
           return this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique;
       }
    set selectedRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique = value;
       }

   get createRencontreMediaDisciplineScientifiqueDialog(): boolean {
           return this.rencontreMediaDisciplineScientifiqueService.createRencontreMediaDisciplineScientifiqueDialog;

       }
    set createRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.createRencontreMediaDisciplineScientifiqueDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
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


    get validDisciplineScientifiqueLibelleFr(): boolean {
    return this._validDisciplineScientifiqueLibelleFr;
    }

    set validDisciplineScientifiqueLibelleFr(value: boolean) {
    this._validDisciplineScientifiqueLibelleFr = value;
    }
    get validDisciplineScientifiqueLibelleEng(): boolean {
    return this._validDisciplineScientifiqueLibelleEng;
    }

    set validDisciplineScientifiqueLibelleEng(value: boolean) {
    this._validDisciplineScientifiqueLibelleEng = value;
    }
    get validDisciplineScientifiqueCode(): boolean {
    return this._validDisciplineScientifiqueCode;
    }

    set validDisciplineScientifiqueCode(value: boolean) {
    this._validDisciplineScientifiqueCode = value;
    }

}
