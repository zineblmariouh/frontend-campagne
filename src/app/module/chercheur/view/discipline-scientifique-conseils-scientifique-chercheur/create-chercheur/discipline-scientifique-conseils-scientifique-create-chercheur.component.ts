import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
@Component({
  selector: 'app-discipline-scientifique-conseils-scientifique-create-chercheur',
  templateUrl: './discipline-scientifique-conseils-scientifique-create-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-conseils-scientifique-create-chercheur.component.css']
})
export class DisciplineScientifiqueConseilsScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validConseilsScientifiqueNatureExpertise = true;
    _validConseilsScientifiqueIntitule = true;
    _validConseilsScientifiqueEtablissementConseilsScientifiques = true;
    _validConseilsScientifiqueTypeExpertise = true;
    _validConseilsScientifiqueNombreJoursConsacres = true;
    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilsScientifiqueService: DisciplineScientifiqueConseilsScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private conseilsScientifiqueService :ConseilsScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
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
     this.disciplineScientifiqueConseilsScientifiqueService.save().subscribe(disciplineScientifiqueConseilsScientifique=>{
       this.disciplineScientifiqueConseilsScientifiques.push({...disciplineScientifiqueConseilsScientifique});
       this.createDisciplineScientifiqueConseilsScientifiqueDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueConseilsScientifique = new DisciplineScientifiqueConseilsScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDisciplineScientifiqueConseilsScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueConseilsScientifiques(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    return this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques;
       }
set disciplineScientifiqueConseilsScientifiques(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilsScientifique():DisciplineScientifiqueConseilsScientifiqueVo {
           return this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique;
       }
    set selectedDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique = value;
       }

   get createDisciplineScientifiqueConseilsScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.createDisciplineScientifiqueConseilsScientifiqueDialog;

       }
    set createDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.createDisciplineScientifiqueConseilsScientifiqueDialog= value;
       }

       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
       }
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
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


    get validConseilsScientifiqueNatureExpertise(): boolean {
    return this._validConseilsScientifiqueNatureExpertise;
    }

    set validConseilsScientifiqueNatureExpertise(value: boolean) {
    this._validConseilsScientifiqueNatureExpertise = value;
    }
    get validConseilsScientifiqueIntitule(): boolean {
    return this._validConseilsScientifiqueIntitule;
    }

    set validConseilsScientifiqueIntitule(value: boolean) {
    this._validConseilsScientifiqueIntitule = value;
    }
    get validConseilsScientifiqueEtablissementConseilsScientifiques(): boolean {
    return this._validConseilsScientifiqueEtablissementConseilsScientifiques;
    }

    set validConseilsScientifiqueEtablissementConseilsScientifiques(value: boolean) {
    this._validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    }
    get validConseilsScientifiqueTypeExpertise(): boolean {
    return this._validConseilsScientifiqueTypeExpertise;
    }

    set validConseilsScientifiqueTypeExpertise(value: boolean) {
    this._validConseilsScientifiqueTypeExpertise = value;
    }
    get validConseilsScientifiqueNombreJoursConsacres(): boolean {
    return this._validConseilsScientifiqueNombreJoursConsacres;
    }

    set validConseilsScientifiqueNombreJoursConsacres(value: boolean) {
    this._validConseilsScientifiqueNombreJoursConsacres = value;
    }
    get validDisciplineScientifiqueLibelleFr(): boolean {
    return this._validDisciplineScientifiqueLibelleFr;
    }

    set validDisciplineScientifiqueLibelleFr(value: boolean) {
    this._validDisciplineScientifiqueLibelleFr = value;
    }
    get validDisciplineScientifiqueLibelleEng(): boolean {
    return this._validDisciplineScientifiqueLibelleEng;
    }

    set validDisciplineScientifiqueLibelleEng(value: boolean) {
    this._validDisciplineScientifiqueLibelleEng = value;
    }
    get validDisciplineScientifiqueCode(): boolean {
    return this._validDisciplineScientifiqueCode;
    }

    set validDisciplineScientifiqueCode(value: boolean) {
    this._validDisciplineScientifiqueCode = value;
    }

}
