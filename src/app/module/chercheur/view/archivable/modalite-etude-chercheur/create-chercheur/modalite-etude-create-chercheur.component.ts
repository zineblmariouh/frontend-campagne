import {Component, OnInit, Input} from '@angular/core';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-modalite-etude-create-chercheur',
  templateUrl: './modalite-etude-create-chercheur.component.html',
  styleUrls: ['./modalite-etude-create-chercheur.component.css']
})
export class ModaliteEtudeCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModaliteEtudeLibelle = true;




constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
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
    this.validModaliteEtudeLibelle = value;
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
     this.modaliteEtudeService.save().subscribe(modaliteEtude=>{
       this.modaliteEtudes.push({...modaliteEtude});
       this.createModaliteEtudeDialog = false;
       this.submitted = false;
       this.selectedModaliteEtude = new ModaliteEtudeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModaliteEtudeLibelle();

    }

private validateModaliteEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedModaliteEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validModaliteEtudeLibelle = false;
        } else {
            this.validModaliteEtudeLibelle = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createModaliteEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude():ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get createModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;

       }
    set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
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

    get validModaliteEtudeLibelle(): boolean {
    return this._validModaliteEtudeLibelle;
    }

    set validModaliteEtudeLibelle(value: boolean) {
    this._validModaliteEtudeLibelle = value;
    }


}
