import {Component, OnInit, Input} from '@angular/core';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
@Component({
  selector: 'app-type-publique-rencontre-media-create-chercheur',
  templateUrl: './type-publique-rencontre-media-create-chercheur.component.html',
  styleUrls: ['./type-publique-rencontre-media-create-chercheur.component.css']
})
export class TypePubliqueRencontreMediaCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypePubliqueLibelle = true;
    _validTypePubliqueCode = true;



constructor(private datePipe: DatePipe, private typePubliqueRencontreMediaService: TypePubliqueRencontreMediaService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typePubliqueService :TypePubliqueService
,       private rencontreMediaService :RencontreMediaService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
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
     this.typePubliqueRencontreMediaService.save().subscribe(typePubliqueRencontreMedia=>{
       this.typePubliqueRencontreMedias.push({...typePubliqueRencontreMedia});
       this.createTypePubliqueRencontreMediaDialog = false;
       this.submitted = false;
       this.selectedTypePubliqueRencontreMedia = new TypePubliqueRencontreMediaVo();


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

hideCreateDialog(){
    this.createTypePubliqueRencontreMediaDialog  = false;
    this.setValidation(true);
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

   get createTypePubliqueRencontreMediaDialog(): boolean {
           return this.typePubliqueRencontreMediaService.createTypePubliqueRencontreMediaDialog;

       }
    set createTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.createTypePubliqueRencontreMediaDialog= value;
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


    get validTypePubliqueLibelle(): boolean {
    return this._validTypePubliqueLibelle;
    }

    set validTypePubliqueLibelle(value: boolean) {
    this._validTypePubliqueLibelle = value;
    }
    get validTypePubliqueCode(): boolean {
    return this._validTypePubliqueCode;
    }

    set validTypePubliqueCode(value: boolean) {
    this._validTypePubliqueCode = value;
    }

}
