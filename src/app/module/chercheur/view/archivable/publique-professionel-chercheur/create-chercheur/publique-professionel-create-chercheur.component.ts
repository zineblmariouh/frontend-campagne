import {Component, OnInit, Input} from '@angular/core';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-publique-professionel-create-chercheur',
  templateUrl: './publique-professionel-create-chercheur.component.html',
  styleUrls: ['./publique-professionel-create-chercheur.component.css']
})
export class PubliqueProfessionelCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPubliqueProfessionelLibelle = true;




constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService
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
    this.validPubliqueProfessionelLibelle = value;
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
     this.publiqueProfessionelService.save().subscribe(publiqueProfessionel=>{
       this.publiqueProfessionels.push({...publiqueProfessionel});
       this.createPubliqueProfessionelDialog = false;
       this.submitted = false;
       this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePubliqueProfessionelLibelle();

    }

private validatePubliqueProfessionelLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPubliqueProfessionel.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPubliqueProfessionelLibelle = false;
        } else {
            this.validPubliqueProfessionelLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createPubliqueProfessionelDialog  = false;
    this.setValidation(true);
}

// getters and setters

get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
    return this.publiqueProfessionelService.publiqueProfessionels;
       }
set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }

 get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }

   get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;

       }
    set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
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

    get validPubliqueProfessionelLibelle(): boolean {
    return this._validPubliqueProfessionelLibelle;
    }

    set validPubliqueProfessionelLibelle(value: boolean) {
    this._validPubliqueProfessionelLibelle = value;
    }


}
