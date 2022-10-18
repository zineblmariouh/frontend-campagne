import {Component, OnInit, Input} from '@angular/core';
import {NatureActiviteGrandPubliqueService} from '../../../../../controller/service/NatureActiviteGrandPublique.service';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-nature-activite-grand-publique-create-chercheur',
  templateUrl: './nature-activite-grand-publique-create-chercheur.component.html',
  styleUrls: ['./nature-activite-grand-publique-create-chercheur.component.css']
})
export class NatureActiviteGrandPubliqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNatureActiviteGrandPubliqueLibelle = true;
   _validNatureActiviteGrandPubliqueCode = true;




constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
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
    this.validNatureActiviteGrandPubliqueLibelle = value;
    this.validNatureActiviteGrandPubliqueCode = value;
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
     this.natureActiviteGrandPubliqueService.save().subscribe(natureActiviteGrandPublique=>{
       this.natureActiviteGrandPubliques.push({...natureActiviteGrandPublique});
       this.createNatureActiviteGrandPubliqueDialog = false;
       this.submitted = false;
       this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNatureActiviteGrandPubliqueLibelle();
this.validateNatureActiviteGrandPubliqueCode();

    }

private validateNatureActiviteGrandPubliqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNatureActiviteGrandPublique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureActiviteGrandPubliqueLibelle = false;
        } else {
            this.validNatureActiviteGrandPubliqueLibelle = true;
        }
    }
private validateNatureActiviteGrandPubliqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedNatureActiviteGrandPublique.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureActiviteGrandPubliqueCode = false;
        } else {
            this.validNatureActiviteGrandPubliqueCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createNatureActiviteGrandPubliqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
    return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
       }
set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
       }

 get selectedNatureActiviteGrandPublique():NatureActiviteGrandPubliqueVo {
           return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
       }
    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
       }

   get createNatureActiviteGrandPubliqueDialog(): boolean {
           return this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog;

       }
    set createNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog= value;
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

    get validNatureActiviteGrandPubliqueLibelle(): boolean {
    return this._validNatureActiviteGrandPubliqueLibelle;
    }

    set validNatureActiviteGrandPubliqueLibelle(value: boolean) {
    this._validNatureActiviteGrandPubliqueLibelle = value;
    }
    get validNatureActiviteGrandPubliqueCode(): boolean {
    return this._validNatureActiviteGrandPubliqueCode;
    }

    set validNatureActiviteGrandPubliqueCode(value: boolean) {
    this._validNatureActiviteGrandPubliqueCode = value;
    }


}
