import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-outil-pedagogique-discipline-scientifique-create-admin',
  templateUrl: './outil-pedagogique-discipline-scientifique-create-admin.component.html',
  styleUrls: ['./outil-pedagogique-discipline-scientifique-create-admin.component.css']
})
export class OutilPedagogiqueDisciplineScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private outilPedagogiqueDisciplineScientifiqueService: OutilPedagogiqueDisciplineScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
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
     this.outilPedagogiqueDisciplineScientifiqueService.save().subscribe(outilPedagogiqueDisciplineScientifique=>{
       this.outilPedagogiqueDisciplineScientifiques.push({...outilPedagogiqueDisciplineScientifique});
       this.createOutilPedagogiqueDisciplineScientifiqueDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiqueDisciplineScientifique = new OutilPedagogiqueDisciplineScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
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
    this.createOutilPedagogiqueDisciplineScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiqueDisciplineScientifiques(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    return this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques;
       }
set outilPedagogiqueDisciplineScientifiques(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques = value;
       }

 get selectedOutilPedagogiqueDisciplineScientifique():OutilPedagogiqueDisciplineScientifiqueVo {
           return this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique;
       }
    set selectedOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique = value;
       }

   get createOutilPedagogiqueDisciplineScientifiqueDialog(): boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.createOutilPedagogiqueDisciplineScientifiqueDialog;

       }
    set createOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.createOutilPedagogiqueDisciplineScientifiqueDialog= value;
       }

       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
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
