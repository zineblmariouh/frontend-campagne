import {Component, OnInit, Input} from '@angular/core';
import {CommissionScientifiqueService} from '../../../../../controller/service/CommissionScientifique.service';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-commission-scientifique-create-chercheur',
  templateUrl: './commission-scientifique-create-chercheur.component.html',
  styleUrls: ['./commission-scientifique-create-chercheur.component.css']
})
export class CommissionScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCommissionScientifiqueLibelleCourt = true;
   _validCommissionScientifiqueCode = true;




constructor(private datePipe: DatePipe, private commissionScientifiqueService: CommissionScientifiqueService
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
    this.validCommissionScientifiqueLibelleCourt = value;
    this.validCommissionScientifiqueCode = value;
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
     this.commissionScientifiqueService.save().subscribe(commissionScientifique=>{
       this.commissionScientifiques.push({...commissionScientifique});
       this.createCommissionScientifiqueDialog = false;
       this.submitted = false;
       this.selectedCommissionScientifique = new CommissionScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCommissionScientifiqueLibelleCourt();
this.validateCommissionScientifiqueCode();

    }

private validateCommissionScientifiqueLibelleCourt(){
        if (this.stringUtilService.isEmpty(this.selectedCommissionScientifique.libelleCourt)) {
            this.errorMessages.push('Libelle court non valide');
            this.validCommissionScientifiqueLibelleCourt = false;
        } else {
            this.validCommissionScientifiqueLibelleCourt = true;
        }
    }
private validateCommissionScientifiqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedCommissionScientifique.code)) {
            this.errorMessages.push('Code non valide');
            this.validCommissionScientifiqueCode = false;
        } else {
            this.validCommissionScientifiqueCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createCommissionScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get commissionScientifiques(): Array<CommissionScientifiqueVo> {
    return this.commissionScientifiqueService.commissionScientifiques;
       }
set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }

 get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }

   get createCommissionScientifiqueDialog(): boolean {
           return this.commissionScientifiqueService.createCommissionScientifiqueDialog;

       }
    set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog= value;
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

    get validCommissionScientifiqueLibelleCourt(): boolean {
    return this._validCommissionScientifiqueLibelleCourt;
    }

    set validCommissionScientifiqueLibelleCourt(value: boolean) {
    this._validCommissionScientifiqueLibelleCourt = value;
    }
    get validCommissionScientifiqueCode(): boolean {
    return this._validCommissionScientifiqueCode;
    }

    set validCommissionScientifiqueCode(value: boolean) {
    this._validCommissionScientifiqueCode = value;
    }


}
