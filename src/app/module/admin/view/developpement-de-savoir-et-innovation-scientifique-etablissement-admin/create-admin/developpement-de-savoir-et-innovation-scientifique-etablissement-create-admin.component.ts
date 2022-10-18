import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-etablissement-create-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-etablissement-create-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-etablissement-create-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEtablissementService: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
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
     this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.save().subscribe(developpementDeSavoirEtInnovationScientifiqueEtablissement=>{
       this.developpementDeSavoirEtInnovationScientifiqueEtablissements.push({...developpementDeSavoirEtInnovationScientifiqueEtablissement});
       this.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
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
    this.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEtablissements(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements;
       }
set developpementDeSavoirEtInnovationScientifiqueEtablissements(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement():DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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


    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }

}
