import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-discipline-scientifique-encadrement-doctorant-create-admin',
  templateUrl: './discipline-scientifique-encadrement-doctorant-create-admin.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-doctorant-create-admin.component.css']
})
export class DisciplineScientifiqueEncadrementDoctorantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementDoctorantService: DisciplineScientifiqueEncadrementDoctorantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private encadrementDoctorantService :EncadrementDoctorantService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
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
     this.disciplineScientifiqueEncadrementDoctorantService.save().subscribe(disciplineScientifiqueEncadrementDoctorant=>{
       this.disciplineScientifiqueEncadrementDoctorants.push({...disciplineScientifiqueEncadrementDoctorant});
       this.createDisciplineScientifiqueEncadrementDoctorantDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateencadrementDoctorant(encadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
        this.createEncadrementDoctorantDialog = true;
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
    this.createDisciplineScientifiqueEncadrementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueEncadrementDoctorants(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    return this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants;
       }
set disciplineScientifiqueEncadrementDoctorants(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants = value;
       }

 get selectedDisciplineScientifiqueEncadrementDoctorant():DisciplineScientifiqueEncadrementDoctorantVo {
           return this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant;
       }
    set selectedDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant = value;
       }

   get createDisciplineScientifiqueEncadrementDoctorantDialog(): boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.createDisciplineScientifiqueEncadrementDoctorantDialog;

       }
    set createDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.createDisciplineScientifiqueEncadrementDoctorantDialog= value;
       }

       get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get createEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
       }
      set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
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
