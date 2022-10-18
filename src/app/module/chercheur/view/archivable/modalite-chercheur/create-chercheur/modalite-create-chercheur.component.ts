import {Component, OnInit, Input} from '@angular/core';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-modalite-create-chercheur',
  templateUrl: './modalite-create-chercheur.component.html',
  styleUrls: ['./modalite-create-chercheur.component.css']
})
export class ModaliteCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteLibelle = true;




constructor(private datePipe: DatePipe, private modaliteService: ModaliteService
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
    this.validModaliteLibelle = value;
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
     this.modaliteService.save().subscribe(modalite=>{
       this.modalites.push({...modalite});
       this.createModaliteDialog = false;
       this.submitted = false;
       this.selectedModalite = new ModaliteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteLibelle();

    }

private validateModaliteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModalite.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteLibelle = false;
        } else {
            this.validModaliteLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createModaliteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modalites(): Array<ModaliteVo> {
    return this.modaliteService.modalites;
       }
set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

 get selectedModalite():ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }

   get createModaliteDialog(): boolean {
           return this.modaliteService.createModaliteDialog;

       }
    set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
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

    get validModaliteLibelle(): boolean {
    return this._validModaliteLibelle;
    }

    set validModaliteLibelle(value: boolean) {
    this._validModaliteLibelle = value;
    }


}
