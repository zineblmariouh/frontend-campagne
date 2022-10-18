import {Component, OnInit, Input} from '@angular/core';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
@Component({
  selector: 'app-entite-administrative-create-chercheur',
  templateUrl: './entite-administrative-create-chercheur.component.html',
  styleUrls: ['./entite-administrative-create-chercheur.component.css']
})
export class EntiteAdministrativeCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEntiteAdministrativeCode = true;
   _validEntiteAdministrativeLibelleCourt = true;

    _validTypeEntiteAdministrativeLibelle = true;



constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeEntiteAdministrativeService :TypeEntiteAdministrativeService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
}




private setValidation(value : boolean){
    this.validEntiteAdministrativeCode = value;
    this.validEntiteAdministrativeLibelleCourt = value;
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
     this.entiteAdministrativeService.save().subscribe(entiteAdministrative=>{
       this.entiteAdministratives.push({...entiteAdministrative});
       this.createEntiteAdministrativeDialog = false;
       this.submitted = false;
       this.selectedEntiteAdministrative = new EntiteAdministrativeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEntiteAdministrativeCode();
this.validateEntiteAdministrativeLibelleCourt();

    }

private validateEntiteAdministrativeCode(){
        if (this.stringUtilService.isEmpty(this.selectedEntiteAdministrative.code)) {
            this.errorMessages.push('Code non valide');
            this.validEntiteAdministrativeCode = false;
        } else {
            this.validEntiteAdministrativeCode = true;
        }
    }
private validateEntiteAdministrativeLibelleCourt(){
        if (this.stringUtilService.isEmpty(this.selectedEntiteAdministrative.libelleCourt)) {
            this.errorMessages.push('Libelle court non valide');
            this.validEntiteAdministrativeLibelleCourt = false;
        } else {
            this.validEntiteAdministrativeLibelleCourt = true;
        }
    }


















//openPopup
              public async openCreatetypeEntiteAdministrative(typeEntiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
        this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEntiteAdministrativeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get entiteAdministratives(): Array<EntiteAdministrativeVo> {
    return this.entiteAdministrativeService.entiteAdministratives;
       }
set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

 get selectedEntiteAdministrative():EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }

   get createEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.createEntiteAdministrativeDialog;

       }
    set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog= value;
       }

       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
      set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
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

    get validEntiteAdministrativeCode(): boolean {
    return this._validEntiteAdministrativeCode;
    }

    set validEntiteAdministrativeCode(value: boolean) {
    this._validEntiteAdministrativeCode = value;
    }
    get validEntiteAdministrativeLibelleCourt(): boolean {
    return this._validEntiteAdministrativeLibelleCourt;
    }

    set validEntiteAdministrativeLibelleCourt(value: boolean) {
    this._validEntiteAdministrativeLibelleCourt = value;
    }

    get validTypeEntiteAdministrativeLibelle(): boolean {
    return this._validTypeEntiteAdministrativeLibelle;
    }

    set validTypeEntiteAdministrativeLibelle(value: boolean) {
    this._validTypeEntiteAdministrativeLibelle = value;
    }

}
