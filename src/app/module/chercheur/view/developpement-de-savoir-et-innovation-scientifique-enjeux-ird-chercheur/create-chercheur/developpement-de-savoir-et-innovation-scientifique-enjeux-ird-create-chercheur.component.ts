import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-enjeux-ird-create-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-enjeux-ird-create-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-enjeux-ird-create-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
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
     this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.save().subscribe(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd=>{
       this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.push({...developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd});
       this.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();


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
              public async openCreatedeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'add');
                       if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
       }
set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd():DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog= value;
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
       get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
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
