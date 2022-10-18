import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueConseilEtComiteScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilEtComiteScientifique.service';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {ConseilEtComiteScientifiqueService} from '../../../../../controller/service/ConseilEtComiteScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-discipline-scientifique-conseil-et-comite-scientifique-create-admin',
  templateUrl: './discipline-scientifique-conseil-et-comite-scientifique-create-admin.component.html',
  styleUrls: ['./discipline-scientifique-conseil-et-comite-scientifique-create-admin.component.css']
})
export class DisciplineScientifiqueConseilEtComiteScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilEtComiteScientifiqueService: DisciplineScientifiqueConseilEtComiteScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private conseilEtComiteScientifiqueService :ConseilEtComiteScientifiqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
    this.conseilEtComiteScientifiqueService.findAll().subscribe((data) => this.conseilEtComiteScientifiques = data);
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
     this.disciplineScientifiqueConseilEtComiteScientifiqueService.save().subscribe(disciplineScientifiqueConseilEtComiteScientifique=>{
       this.disciplineScientifiqueConseilEtComiteScientifiques.push({...disciplineScientifiqueConseilEtComiteScientifique});
       this.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueConseilEtComiteScientifique = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateconseilEtComiteScientifique(conseilEtComiteScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
        this.createConseilEtComiteScientifiqueDialog = true;
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
    this.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueConseilEtComiteScientifiques(): Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> {
    return this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques;
       }
set disciplineScientifiqueConseilEtComiteScientifiques(value: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilEtComiteScientifique():DisciplineScientifiqueConseilEtComiteScientifiqueVo {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique;
       }
    set selectedDisciplineScientifiqueConseilEtComiteScientifique(value: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique = value;
       }

   get createDisciplineScientifiqueConseilEtComiteScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog;

       }
    set createDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog= value;
       }

       get selectedConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
      set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }
       get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
       set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }
       get createConseilEtComiteScientifiqueDialog(): boolean {
           return this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog;
       }
      set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog= value;
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
