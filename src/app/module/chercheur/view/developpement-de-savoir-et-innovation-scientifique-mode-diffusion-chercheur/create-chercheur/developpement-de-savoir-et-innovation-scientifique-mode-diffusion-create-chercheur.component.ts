import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-mode-diffusion-create-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-mode-diffusion-create-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-mode-diffusion-create-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validModeDiffusionLibelle = true;
    _validModeDiffusionCode = true;



constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private modeDiffusionService :ModeDiffusionService
) {

}


// methods
ngOnInit(): void {

    this.selectedModeDiffusion = new ModeDiffusionVo();
    this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
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
     this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.save().subscribe(developpementDeSavoirEtInnovationScientifiqueModeDiffusion=>{
       this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions.push({...developpementDeSavoirEtInnovationScientifiqueModeDiffusion});
       this.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatemodeDiffusion(modeDiffusion: string) {
                      const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'add');
                       if(isPermistted){
         this.selectedModeDiffusion = new ModeDiffusionVo();
        this.createModeDiffusionDialog = true;
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
    this.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueModeDiffusions(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
       }
set developpementDeSavoirEtInnovationScientifiqueModeDiffusions(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion():DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog= value;
       }

       get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;
       }
      set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
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

}
