import {Component, OnInit, Input} from '@angular/core';
import {TypePubliqueCultureScientifiqueService} from '../../../../../controller/service/TypePubliqueCultureScientifique.service';
import {TypePubliqueCultureScientifiqueVo} from '../../../../../controller/model/TypePubliqueCultureScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-publique-culture-scientifique-create-chercheur',
  templateUrl: './type-publique-culture-scientifique-create-chercheur.component.html',
  styleUrls: ['./type-publique-culture-scientifique-create-chercheur.component.css']
})
export class TypePubliqueCultureScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypePubliqueCultureScientifiqueCode = true;
   _validTypePubliqueCultureScientifiqueLibelle = true;




constructor(private datePipe: DatePipe, private typePubliqueCultureScientifiqueService: TypePubliqueCultureScientifiqueService
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
    this.validTypePubliqueCultureScientifiqueCode = value;
    this.validTypePubliqueCultureScientifiqueLibelle = value;
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
     this.typePubliqueCultureScientifiqueService.save().subscribe(typePubliqueCultureScientifique=>{
       this.typePubliqueCultureScientifiques.push({...typePubliqueCultureScientifique});
       this.createTypePubliqueCultureScientifiqueDialog = false;
       this.submitted = false;
       this.selectedTypePubliqueCultureScientifique = new TypePubliqueCultureScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypePubliqueCultureScientifiqueCode();
this.validateTypePubliqueCultureScientifiqueLibelle();

    }

private validateTypePubliqueCultureScientifiqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypePubliqueCultureScientifique.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypePubliqueCultureScientifiqueCode = false;
        } else {
            this.validTypePubliqueCultureScientifiqueCode = true;
        }
    }
private validateTypePubliqueCultureScientifiqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypePubliqueCultureScientifique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypePubliqueCultureScientifiqueLibelle = false;
        } else {
            this.validTypePubliqueCultureScientifiqueLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypePubliqueCultureScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePubliqueCultureScientifiques(): Array<TypePubliqueCultureScientifiqueVo> {
    return this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques;
       }
set typePubliqueCultureScientifiques(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques = value;
       }

 get selectedTypePubliqueCultureScientifique():TypePubliqueCultureScientifiqueVo {
           return this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique;
       }
    set selectedTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique = value;
       }

   get createTypePubliqueCultureScientifiqueDialog(): boolean {
           return this.typePubliqueCultureScientifiqueService.createTypePubliqueCultureScientifiqueDialog;

       }
    set createTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.createTypePubliqueCultureScientifiqueDialog= value;
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

    get validTypePubliqueCultureScientifiqueCode(): boolean {
    return this._validTypePubliqueCultureScientifiqueCode;
    }

    set validTypePubliqueCultureScientifiqueCode(value: boolean) {
    this._validTypePubliqueCultureScientifiqueCode = value;
    }
    get validTypePubliqueCultureScientifiqueLibelle(): boolean {
    return this._validTypePubliqueCultureScientifiqueLibelle;
    }

    set validTypePubliqueCultureScientifiqueLibelle(value: boolean) {
    this._validTypePubliqueCultureScientifiqueLibelle = value;
    }


}
