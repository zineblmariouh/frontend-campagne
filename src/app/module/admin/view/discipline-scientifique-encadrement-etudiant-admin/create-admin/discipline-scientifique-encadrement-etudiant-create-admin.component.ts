import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueEncadrementEtudiantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementEtudiant.service';
import {DisciplineScientifiqueEncadrementEtudiantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
@Component({
  selector: 'app-discipline-scientifique-encadrement-etudiant-create-admin',
  templateUrl: './discipline-scientifique-encadrement-etudiant-create-admin.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-etudiant-create-admin.component.css']
})
export class DisciplineScientifiqueEncadrementEtudiantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementEtudiantService: DisciplineScientifiqueEncadrementEtudiantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private encadrementEtudiantService :EncadrementEtudiantService
) {

}


// methods
ngOnInit(): void {

    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
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
     this.disciplineScientifiqueEncadrementEtudiantService.save().subscribe(disciplineScientifiqueEncadrementEtudiant=>{
       this.disciplineScientifiqueEncadrementEtudiants.push({...disciplineScientifiqueEncadrementEtudiant});
       this.createDisciplineScientifiqueEncadrementEtudiantDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueEncadrementEtudiant = new DisciplineScientifiqueEncadrementEtudiantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
    this.createDisciplineScientifiqueEncadrementEtudiantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueEncadrementEtudiants(): Array<DisciplineScientifiqueEncadrementEtudiantVo> {
    return this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiants;
       }
set disciplineScientifiqueEncadrementEtudiants(value: Array<DisciplineScientifiqueEncadrementEtudiantVo>) {
        this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiants = value;
       }

 get selectedDisciplineScientifiqueEncadrementEtudiant():DisciplineScientifiqueEncadrementEtudiantVo {
           return this.disciplineScientifiqueEncadrementEtudiantService.selectedDisciplineScientifiqueEncadrementEtudiant;
       }
    set selectedDisciplineScientifiqueEncadrementEtudiant(value: DisciplineScientifiqueEncadrementEtudiantVo) {
        this.disciplineScientifiqueEncadrementEtudiantService.selectedDisciplineScientifiqueEncadrementEtudiant = value;
       }

   get createDisciplineScientifiqueEncadrementEtudiantDialog(): boolean {
           return this.disciplineScientifiqueEncadrementEtudiantService.createDisciplineScientifiqueEncadrementEtudiantDialog;

       }
    set createDisciplineScientifiqueEncadrementEtudiantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementEtudiantService.createDisciplineScientifiqueEncadrementEtudiantDialog= value;
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
