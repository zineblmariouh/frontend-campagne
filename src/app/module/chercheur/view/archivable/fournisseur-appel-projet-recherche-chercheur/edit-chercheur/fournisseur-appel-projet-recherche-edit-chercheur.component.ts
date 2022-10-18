import {Component, OnInit} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from '../../../../../controller/service/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from '../../../../../controller/model/FournisseurAppelProjetRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-fournisseur-appel-projet-recherche-edit-chercheur',
  templateUrl: './fournisseur-appel-projet-recherche-edit-chercheur.component.html',
  styleUrls: ['./fournisseur-appel-projet-recherche-edit-chercheur.component.css']
})
export class FournisseurAppelProjetRechercheEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedFournisseurAppelProjetRecherche.dateArchivage = DateUtils.toDate(this.selectedFournisseurAppelProjetRecherche.dateArchivage);
            this.selectedFournisseurAppelProjetRecherche.dateCreation = DateUtils.toDate(this.selectedFournisseurAppelProjetRecherche.dateCreation);
    this.fournisseurAppelProjetRechercheService.edit().subscribe(fournisseurAppelProjetRecherche=>{
    const myIndex = this.fournisseurAppelProjetRecherches.findIndex(e => e.id === this.selectedFournisseurAppelProjetRecherche.id);
    this.fournisseurAppelProjetRecherches[myIndex] = this.selectedFournisseurAppelProjetRecherche;
    this.editFournisseurAppelProjetRechercheDialog = false;
    this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();


    }, error => {
        console.log(error);
    });

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

hideEditDialog(){
    this.editFournisseurAppelProjetRechercheDialog  = false;
}

// getters and setters

get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

 get selectedFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }

   get editFournisseurAppelProjetRechercheDialog(): boolean {
           return this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog;

       }
    set editFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
