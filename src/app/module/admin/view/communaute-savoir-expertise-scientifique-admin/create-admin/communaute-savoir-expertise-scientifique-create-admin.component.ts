import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirExpertiseScientifiqueService} from '../../../../../controller/service/CommunauteSavoirExpertiseScientifique.service';
import {CommunauteSavoirExpertiseScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirExpertiseScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import {ExpertiseScientifiqueService} from '../../../../../controller/service/ExpertiseScientifique.service';
@Component({
  selector: 'app-communaute-savoir-expertise-scientifique-create-admin',
  templateUrl: './communaute-savoir-expertise-scientifique-create-admin.component.html',
  styleUrls: ['./communaute-savoir-expertise-scientifique-create-admin.component.css']
})
export class CommunauteSavoirExpertiseScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommunauteSavoirLibelle = true;
    _validCommunauteSavoirCode = true;



constructor(private datePipe: DatePipe, private communauteSavoirExpertiseScientifiqueService: CommunauteSavoirExpertiseScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private communauteSavoirService :CommunauteSavoirService
,       private expertiseScientifiqueService :ExpertiseScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
    this.expertiseScientifiqueService.findAll().subscribe((data) => this.expertiseScientifiques = data);
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
     this.communauteSavoirExpertiseScientifiqueService.save().subscribe(communauteSavoirExpertiseScientifique=>{
       this.communauteSavoirExpertiseScientifiques.push({...communauteSavoirExpertiseScientifique});
       this.createCommunauteSavoirExpertiseScientifiqueDialog = false;
       this.submitted = false;
       this.selectedCommunauteSavoirExpertiseScientifique = new CommunauteSavoirExpertiseScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateexpertiseScientifique(expertiseScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'add');
                       if(isPermistted){
         this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
        this.createExpertiseScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
// methods

hideCreateDialog(){
    this.createCommunauteSavoirExpertiseScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get communauteSavoirExpertiseScientifiques(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
    return this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques;
       }
set communauteSavoirExpertiseScientifiques(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques = value;
       }

 get selectedCommunauteSavoirExpertiseScientifique():CommunauteSavoirExpertiseScientifiqueVo {
           return this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique;
       }
    set selectedCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique = value;
       }

   get createCommunauteSavoirExpertiseScientifiqueDialog(): boolean {
           return this.communauteSavoirExpertiseScientifiqueService.createCommunauteSavoirExpertiseScientifiqueDialog;

       }
    set createCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this.communauteSavoirExpertiseScientifiqueService.createCommunauteSavoirExpertiseScientifiqueDialog= value;
       }

       get selectedExpertiseScientifique(): ExpertiseScientifiqueVo {
           return this.expertiseScientifiqueService.selectedExpertiseScientifique;
       }
      set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
       }
       get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
           return this.expertiseScientifiqueService.expertiseScientifiques;
       }
       set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
       }
       get createExpertiseScientifiqueDialog(): boolean {
           return this.expertiseScientifiqueService.createExpertiseScientifiqueDialog;
       }
      set createExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.createExpertiseScientifiqueDialog= value;
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
