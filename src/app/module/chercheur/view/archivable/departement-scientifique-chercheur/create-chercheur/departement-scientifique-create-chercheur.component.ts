import {Component, OnInit, Input} from '@angular/core';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-departement-scientifique-create-chercheur',
  templateUrl: './departement-scientifique-create-chercheur.component.html',
  styleUrls: ['./departement-scientifique-create-chercheur.component.css']
})
export class DepartementScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDepartementScientifiqueLibelle = true;
   _validDepartementScientifiqueCode = true;




constructor(private datePipe: DatePipe, private departementScientifiqueService: DepartementScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validDepartementScientifiqueLibelle = value;
    this.validDepartementScientifiqueCode = value;
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
     this.departementScientifiqueService.save().subscribe(departementScientifique=>{
       this.departementScientifiques.push({...departementScientifique});
       this.createDepartementScientifiqueDialog = false;
       this.submitted = false;
       this.selectedDepartementScientifique = new DepartementScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDepartementScientifiqueLibelle();
this.validateDepartementScientifiqueCode();

    }

private validateDepartementScientifiqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementScientifique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validDepartementScientifiqueLibelle = false;
        } else {
            this.validDepartementScientifiqueLibelle = true;
        }
    }
private validateDepartementScientifiqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementScientifique.code)) {
            this.errorMessages.push('Code non valide');
            this.validDepartementScientifiqueCode = false;
        } else {
            this.validDepartementScientifiqueCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createDepartementScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get departementScientifiques(): Array<DepartementScientifiqueVo> {
    return this.departementScientifiqueService.departementScientifiques;
       }
set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

 get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }

   get createDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.createDepartementScientifiqueDialog;

       }
    set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog= value;
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

    get validDepartementScientifiqueLibelle(): boolean {
    return this._validDepartementScientifiqueLibelle;
    }

    set validDepartementScientifiqueLibelle(value: boolean) {
    this._validDepartementScientifiqueLibelle = value;
    }
    get validDepartementScientifiqueCode(): boolean {
    return this._validDepartementScientifiqueCode;
    }

    set validDepartementScientifiqueCode(value: boolean) {
    this._validDepartementScientifiqueCode = value;
    }


}
