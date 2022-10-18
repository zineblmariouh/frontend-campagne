import {Component, OnInit, Input} from '@angular/core';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
@Component({
  selector: 'app-mode-diffusion-create-admin',
  templateUrl: './mode-diffusion-create-admin.component.html',
  styleUrls: ['./mode-diffusion-create-admin.component.css']
})
export class ModeDiffusionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModeDiffusionLibelle = true;
   _validModeDiffusionCode = true;

    _validTypeSavoirLibelle = true;
    _validTypeSavoirCode = true;



constructor(private datePipe: DatePipe, private modeDiffusionService: ModeDiffusionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeSavoirService :TypeSavoirService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
}




private setValidation(value : boolean){
    this.validModeDiffusionLibelle = value;
    this.validModeDiffusionCode = value;
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
     this.modeDiffusionService.save().subscribe(modeDiffusion=>{
       this.modeDiffusions.push({...modeDiffusion});
       this.createModeDiffusionDialog = false;
       this.submitted = false;
       this.selectedModeDiffusion = new ModeDiffusionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModeDiffusionLibelle();
this.validateModeDiffusionCode();

    }

private validateModeDiffusionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModeDiffusion.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModeDiffusionLibelle = false;
        } else {
            this.validModeDiffusionLibelle = true;
        }
    }
private validateModeDiffusionCode(){
        if (this.stringUtilService.isEmpty(this.selectedModeDiffusion.code)) {
            this.errorMessages.push('Code non valide');
            this.validModeDiffusionCode = false;
        } else {
            this.validModeDiffusionCode = true;
        }
    }













//openPopup
              public async openCreatetypeSavoir(typeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
                       if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
        this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createModeDiffusionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modeDiffusions(): Array<ModeDiffusionVo> {
    return this.modeDiffusionService.modeDiffusions;
       }
set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }

 get selectedModeDiffusion():ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }

   get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;

       }
    set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
       }

       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
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

    get validModeDiffusionLibelle(): boolean {
    return this._validModeDiffusionLibelle;
    }

    set validModeDiffusionLibelle(value: boolean) {
    this._validModeDiffusionLibelle = value;
    }
    get validModeDiffusionCode(): boolean {
    return this._validModeDiffusionCode;
    }

    set validModeDiffusionCode(value: boolean) {
    this._validModeDiffusionCode = value;
    }

    get validTypeSavoirLibelle(): boolean {
    return this._validTypeSavoirLibelle;
    }

    set validTypeSavoirLibelle(value: boolean) {
    this._validTypeSavoirLibelle = value;
    }
    get validTypeSavoirCode(): boolean {
    return this._validTypeSavoirCode;
    }

    set validTypeSavoirCode(value: boolean) {
    this._validTypeSavoirCode = value;
    }

}
