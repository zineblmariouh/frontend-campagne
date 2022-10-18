import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-discipline-scientifique-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-discipline-scientifique-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-discipline-scientifique-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
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
     this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.save().subscribe(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique=>{
       this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.push({...rencontreGrandPubliqueJeunePubliqueDisciplineScientifique});
       this.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
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
    this.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
       }
set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique():RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

   get createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;

       }
    set createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog= value;
       }

       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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
