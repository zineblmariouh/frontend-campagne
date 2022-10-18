import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';

@Component({
  selector: 'app-outil-pedagogique-publique-cible-edit-chercheur',
  templateUrl: './outil-pedagogique-publique-cible-edit-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-publique-cible-edit-chercheur.component.css']
})
export class OutilPedagogiquePubliqueCibleEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiquePubliqueCibleService: OutilPedagogiquePubliqueCibleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private publiqueCibleService: PubliqueCibleService
) {
}

// methods
ngOnInit(): void {
    this.selectedPubliqueCible = new PubliqueCibleVo();
    this.publiqueCibleService.findAll().subscribe((data) => this.publiqueCibles = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiquePubliqueCibleService.edit().subscribe(outilPedagogiquePubliqueCible=>{
    const myIndex = this.outilPedagogiquePubliqueCibles.findIndex(e => e.id === this.selectedOutilPedagogiquePubliqueCible.id);
    this.outilPedagogiquePubliqueCibles[myIndex] = this.selectedOutilPedagogiquePubliqueCible;
    this.editOutilPedagogiquePubliqueCibleDialog = false;
    this.selectedOutilPedagogiquePubliqueCible = new OutilPedagogiquePubliqueCibleVo();


    }, error => {
        console.log(error);
    });

}

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
              public async openCreatepubliqueCible(publiqueCible: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'add');
                       if(isPermistted){
         this.selectedPubliqueCible = new PubliqueCibleVo();
        this.createPubliqueCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editOutilPedagogiquePubliqueCibleDialog  = false;
}

// getters and setters

get outilPedagogiquePubliqueCibles(): Array<OutilPedagogiquePubliqueCibleVo> {
    return this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles;
       }
set outilPedagogiquePubliqueCibles(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles = value;
       }

 get selectedOutilPedagogiquePubliqueCible(): OutilPedagogiquePubliqueCibleVo {
           return this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible;
       }
    set selectedOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible = value;
       }

   get editOutilPedagogiquePubliqueCibleDialog(): boolean {
           return this.outilPedagogiquePubliqueCibleService.editOutilPedagogiquePubliqueCibleDialog;

       }
    set editOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.editOutilPedagogiquePubliqueCibleDialog = value;
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
       get selectedPubliqueCible(): PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get createPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;
       }
      set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
