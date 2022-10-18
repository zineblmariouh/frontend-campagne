import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirEncadrementEtudiantService} from '../../../../../controller/service/CommunauteSavoirEncadrementEtudiant.service';
import {CommunauteSavoirEncadrementEtudiantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
@Component({
  selector: 'app-communaute-savoir-encadrement-etudiant-create-admin',
  templateUrl: './communaute-savoir-encadrement-etudiant-create-admin.component.html',
  styleUrls: ['./communaute-savoir-encadrement-etudiant-create-admin.component.css']
})
export class CommunauteSavoirEncadrementEtudiantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommunauteSavoirLibelle = true;
    _validCommunauteSavoirCode = true;



constructor(private datePipe: DatePipe, private communauteSavoirEncadrementEtudiantService: CommunauteSavoirEncadrementEtudiantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private communauteSavoirService :CommunauteSavoirService
,       private encadrementEtudiantService :EncadrementEtudiantService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
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
     this.communauteSavoirEncadrementEtudiantService.save().subscribe(communauteSavoirEncadrementEtudiant=>{
       this.communauteSavoirEncadrementEtudiants.push({...communauteSavoirEncadrementEtudiant});
       this.createCommunauteSavoirEncadrementEtudiantDialog = false;
       this.submitted = false;
       this.selectedCommunauteSavoirEncadrementEtudiant = new CommunauteSavoirEncadrementEtudiantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
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
    this.createCommunauteSavoirEncadrementEtudiantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get communauteSavoirEncadrementEtudiants(): Array<CommunauteSavoirEncadrementEtudiantVo> {
    return this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiants;
       }
set communauteSavoirEncadrementEtudiants(value: Array<CommunauteSavoirEncadrementEtudiantVo>) {
        this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiants = value;
       }

 get selectedCommunauteSavoirEncadrementEtudiant():CommunauteSavoirEncadrementEtudiantVo {
           return this.communauteSavoirEncadrementEtudiantService.selectedCommunauteSavoirEncadrementEtudiant;
       }
    set selectedCommunauteSavoirEncadrementEtudiant(value: CommunauteSavoirEncadrementEtudiantVo) {
        this.communauteSavoirEncadrementEtudiantService.selectedCommunauteSavoirEncadrementEtudiant = value;
       }

   get createCommunauteSavoirEncadrementEtudiantDialog(): boolean {
           return this.communauteSavoirEncadrementEtudiantService.createCommunauteSavoirEncadrementEtudiantDialog;

       }
    set createCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this.communauteSavoirEncadrementEtudiantService.createCommunauteSavoirEncadrementEtudiantDialog= value;
       }

       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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


    get validCommunauteSavoirLibelle(): boolean {
    return this._validCommunauteSavoirLibelle;
    }

    set validCommunauteSavoirLibelle(value: boolean) {
    this._validCommunauteSavoirLibelle = value;
    }
    get validCommunauteSavoirCode(): boolean {
    return this._validCommunauteSavoirCode;
    }

    set validCommunauteSavoirCode(value: boolean) {
    this._validCommunauteSavoirCode = value;
    }

}
