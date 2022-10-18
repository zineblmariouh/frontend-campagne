import {Component, OnInit, Input} from '@angular/core';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-niveau-responsabilite-pedagogique-create-admin',
  templateUrl: './niveau-responsabilite-pedagogique-create-admin.component.html',
  styleUrls: ['./niveau-responsabilite-pedagogique-create-admin.component.css']
})
export class NiveauResponsabilitePedagogiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauResponsabilitePedagogiqueLibelle = true;




constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
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
    this.validNiveauResponsabilitePedagogiqueLibelle = value;
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
     this.niveauResponsabilitePedagogiqueService.save().subscribe(niveauResponsabilitePedagogique=>{
       this.niveauResponsabilitePedagogiques.push({...niveauResponsabilitePedagogique});
       this.createNiveauResponsabilitePedagogiqueDialog = false;
       this.submitted = false;
       this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNiveauResponsabilitePedagogiqueLibelle();

    }

private validateNiveauResponsabilitePedagogiqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauResponsabilitePedagogique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauResponsabilitePedagogiqueLibelle = false;
        } else {
            this.validNiveauResponsabilitePedagogiqueLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createNiveauResponsabilitePedagogiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
    return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }

 get selectedNiveauResponsabilitePedagogique():NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }

   get createNiveauResponsabilitePedagogiqueDialog(): boolean {
           return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;

       }
    set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog= value;
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

    get validNiveauResponsabilitePedagogiqueLibelle(): boolean {
    return this._validNiveauResponsabilitePedagogiqueLibelle;
    }

    set validNiveauResponsabilitePedagogiqueLibelle(value: boolean) {
    this._validNiveauResponsabilitePedagogiqueLibelle = value;
    }


}
