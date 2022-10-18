import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-outil-pedagogique-pays-diffusion-create-chercheur',
  templateUrl: './outil-pedagogique-pays-diffusion-create-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-pays-diffusion-create-chercheur.component.css']
})
export class OutilPedagogiquePaysDiffusionCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private outilPedagogiquePaysDiffusionService: OutilPedagogiquePaysDiffusionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
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
     this.outilPedagogiquePaysDiffusionService.save().subscribe(outilPedagogiquePaysDiffusion=>{
       this.outilPedagogiquePaysDiffusions.push({...outilPedagogiquePaysDiffusion});
       this.createOutilPedagogiquePaysDiffusionDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiquePaysDiffusion = new OutilPedagogiquePaysDiffusionVo();


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
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createOutilPedagogiquePaysDiffusionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiquePaysDiffusions(): Array<OutilPedagogiquePaysDiffusionVo> {
    return this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions;
       }
set outilPedagogiquePaysDiffusions(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions = value;
       }

 get selectedOutilPedagogiquePaysDiffusion():OutilPedagogiquePaysDiffusionVo {
           return this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion;
       }
    set selectedOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion = value;
       }

   get createOutilPedagogiquePaysDiffusionDialog(): boolean {
           return this.outilPedagogiquePaysDiffusionService.createOutilPedagogiquePaysDiffusionDialog;

       }
    set createOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this.outilPedagogiquePaysDiffusionService.createOutilPedagogiquePaysDiffusionDialog= value;
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
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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


    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }

}
