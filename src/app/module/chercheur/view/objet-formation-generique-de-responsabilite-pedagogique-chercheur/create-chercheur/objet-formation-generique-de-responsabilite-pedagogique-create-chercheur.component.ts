import {Component, OnInit, Input} from '@angular/core';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueService} from '../../../../../controller/service/ObjetFormationGeneriqueDeResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo} from '../../../../../controller/model/ObjetFormationGeneriqueDeResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
@Component({
  selector: 'app-objet-formation-generique-de-responsabilite-pedagogique-create-chercheur',
  templateUrl: './objet-formation-generique-de-responsabilite-pedagogique-create-chercheur.component.html',
  styleUrls: ['./objet-formation-generique-de-responsabilite-pedagogique-create-chercheur.component.css']
})
export class ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validObjetFormationGeneriqueLibelle = true;
    _validObjetFormationGeneriqueCode = true;
    _validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
    _validResponsabilitePedagogiqueStatusCursus = true;
    _validResponsabilitePedagogiqueIntituleCursus = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;



constructor(private datePipe: DatePipe, private objetFormationGeneriqueDeResponsabilitePedagogiqueService: ObjetFormationGeneriqueDeResponsabilitePedagogiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
,       private objetFormationGeneriqueService :ObjetFormationGeneriqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
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
     this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.save().subscribe(objetFormationGeneriqueDeResponsabilitePedagogique=>{
       this.objetFormationGeneriqueDeResponsabilitePedagogiques.push({...objetFormationGeneriqueDeResponsabilitePedagogique});
       this.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = false;
       this.submitted = false;
       this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateresponsabilitePedagogique(responsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
        this.createResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get objetFormationGeneriqueDeResponsabilitePedagogiques(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
    return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques;
       }
set objetFormationGeneriqueDeResponsabilitePedagogiques(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques = value;
       }

 get selectedObjetFormationGeneriqueDeResponsabilitePedagogique():ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
       }
    set selectedObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

   get createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(): boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;

       }
    set createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog= value;
       }

       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
       }
       get selectedResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
      set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
       get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
       set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }
       get createResponsabilitePedagogiqueDialog(): boolean {
           return this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog;
       }
      set createResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog= value;
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


    get validObjetFormationGeneriqueLibelle(): boolean {
    return this._validObjetFormationGeneriqueLibelle;
    }

    set validObjetFormationGeneriqueLibelle(value: boolean) {
    this._validObjetFormationGeneriqueLibelle = value;
    }
    get validObjetFormationGeneriqueCode(): boolean {
    return this._validObjetFormationGeneriqueCode;
    }

    set validObjetFormationGeneriqueCode(value: boolean) {
    this._validObjetFormationGeneriqueCode = value;
    }
    get validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(): boolean {
    return this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique;
    }

    set validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(value: boolean) {
    this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    }
    get validResponsabilitePedagogiqueStatusCursus(): boolean {
    return this._validResponsabilitePedagogiqueStatusCursus;
    }

    set validResponsabilitePedagogiqueStatusCursus(value: boolean) {
    this._validResponsabilitePedagogiqueStatusCursus = value;
    }
    get validResponsabilitePedagogiqueIntituleCursus(): boolean {
    return this._validResponsabilitePedagogiqueIntituleCursus;
    }

    set validResponsabilitePedagogiqueIntituleCursus(value: boolean) {
    this._validResponsabilitePedagogiqueIntituleCursus = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

}
