import {Component, OnInit, Input} from '@angular/core';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-encadrement-etudiant-enjeux-ird-create-chercheur',
  templateUrl: './encadrement-etudiant-enjeux-ird-create-chercheur.component.html',
  styleUrls: ['./encadrement-etudiant-enjeux-ird-create-chercheur.component.css']
})
export class EncadrementEtudiantEnjeuxIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private encadrementEtudiantService :EncadrementEtudiantService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
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
     this.encadrementEtudiantEnjeuxIrdService.save().subscribe(encadrementEtudiantEnjeuxIrd=>{
       this.encadrementEtudiantEnjeuxIrds.push({...encadrementEtudiantEnjeuxIrd});
       this.createEncadrementEtudiantEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedEncadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
              public async openCreateencadrementEtudiant(encadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
        this.createEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEncadrementEtudiantEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get encadrementEtudiantEnjeuxIrds(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    return this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds;
       }
set encadrementEtudiantEnjeuxIrds(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds = value;
       }

 get selectedEncadrementEtudiantEnjeuxIrd():EncadrementEtudiantEnjeuxIrdVo {
           return this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd;
       }
    set selectedEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd = value;
       }

   get createEncadrementEtudiantEnjeuxIrdDialog(): boolean {
           return this.encadrementEtudiantEnjeuxIrdService.createEncadrementEtudiantEnjeuxIrdDialog;

       }
    set createEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.createEncadrementEtudiantEnjeuxIrdDialog= value;
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
       get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
      set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }
       get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiants;
       }
       set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }
       get createEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.createEncadrementEtudiantDialog;
       }
      set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog= value;
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


    get validEnjeuxIrdLibelle(): boolean {
    return this._validEnjeuxIrdLibelle;
    }

    set validEnjeuxIrdLibelle(value: boolean) {
    this._validEnjeuxIrdLibelle = value;
    }
    get validEnjeuxIrdCode(): boolean {
    return this._validEnjeuxIrdCode;
    }

    set validEnjeuxIrdCode(value: boolean) {
    this._validEnjeuxIrdCode = value;
    }

}
