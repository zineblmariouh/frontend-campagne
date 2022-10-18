import {Component, OnInit, Input} from '@angular/core';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
@Component({
  selector: 'app-type-savoir-developpement-de-savoir-et-innovation-scientifique-create-admin',
  templateUrl: './type-savoir-developpement-de-savoir-et-innovation-scientifique-create-admin.component.html',
  styleUrls: ['./type-savoir-developpement-de-savoir-et-innovation-scientifique-create-admin.component.css']
})
export class TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeSavoirLibelle = true;
    _validTypeSavoirCode = true;



constructor(private datePipe: DatePipe, private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private typeSavoirService :TypeSavoirService
) {

}


// methods
ngOnInit(): void {

    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
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
     this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.save().subscribe(typeSavoirDeveloppementDeSavoirEtInnovationScientifique=>{
       this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.push({...typeSavoirDeveloppementDeSavoirEtInnovationScientifique});
       this.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
       this.submitted = false;
       this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

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
    this.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques;
       }
set typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique():TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
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
