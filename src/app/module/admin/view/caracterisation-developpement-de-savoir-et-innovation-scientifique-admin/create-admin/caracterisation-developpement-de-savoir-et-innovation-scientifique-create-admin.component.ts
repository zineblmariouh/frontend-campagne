import {Component, OnInit, Input} from '@angular/core';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.service';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
import {CaracterisationService} from '../../../../../controller/service/Caracterisation.service';
@Component({
  selector: 'app-caracterisation-developpement-de-savoir-et-innovation-scientifique-create-admin',
  templateUrl: './caracterisation-developpement-de-savoir-et-innovation-scientifique-create-admin.component.html',
  styleUrls: ['./caracterisation-developpement-de-savoir-et-innovation-scientifique-create-admin.component.css']
})
export class CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCaracterisationLibelle = true;
    _validCaracterisationCode = true;



constructor(private datePipe: DatePipe, private caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private caracterisationService :CaracterisationService
) {

}


// methods
ngOnInit(): void {

    this.selectedCaracterisation = new CaracterisationVo();
    this.caracterisationService.findAll().subscribe((data) => this.caracterisations = data);
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
     this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.save().subscribe(caracterisationDeveloppementDeSavoirEtInnovationScientifique=>{
       this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques.push({...caracterisationDeveloppementDeSavoirEtInnovationScientifique});
       this.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
       this.submitted = false;
       this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = new CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatecaracterisation(caracterisation: string) {
                      const isPermistted = await this.roleService.isPermitted('Caracterisation', 'add');
                       if(isPermistted){
         this.selectedCaracterisation = new CaracterisationVo();
        this.createCaracterisationDialog = true;
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
    this.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get caracterisationDeveloppementDeSavoirEtInnovationScientifiques(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques;
       }
set caracterisationDeveloppementDeSavoirEtInnovationScientifiques(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique():CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

       get selectedCaracterisation(): CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
      set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }
       get caracterisations(): Array<CaracterisationVo> {
           return this.caracterisationService.caracterisations;
       }
       set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }
       get createCaracterisationDialog(): boolean {
           return this.caracterisationService.createCaracterisationDialog;
       }
      set createCaracterisationDialog(value: boolean) {
        this.caracterisationService.createCaracterisationDialog= value;
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


    get validCaracterisationLibelle(): boolean {
    return this._validCaracterisationLibelle;
    }

    set validCaracterisationLibelle(value: boolean) {
    this._validCaracterisationLibelle = value;
    }
    get validCaracterisationCode(): boolean {
    return this._validCaracterisationCode;
    }

    set validCaracterisationCode(value: boolean) {
    this._validCaracterisationCode = value;
    }

}
