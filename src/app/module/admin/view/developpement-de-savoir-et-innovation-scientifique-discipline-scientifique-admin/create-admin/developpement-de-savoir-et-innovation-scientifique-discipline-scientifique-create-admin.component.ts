import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-create-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-create-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-create-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommunauteSavoirLibelle = true;
    _validCommunauteSavoirCode = true;



constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private communauteSavoirService :CommunauteSavoirService
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
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
     this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.save().subscribe(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique=>{
       this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.push({...developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique});
       this.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();


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
    this.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique():DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog= value;
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
