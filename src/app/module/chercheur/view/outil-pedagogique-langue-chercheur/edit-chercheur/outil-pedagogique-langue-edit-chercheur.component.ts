import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';

@Component({
  selector: 'app-outil-pedagogique-langue-edit-chercheur',
  templateUrl: './outil-pedagogique-langue-edit-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-langue-edit-chercheur.component.css']
})
export class OutilPedagogiqueLangueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueLangueService: OutilPedagogiqueLangueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private langueService: LangueService
) {
}

// methods
ngOnInit(): void {
    this.selectedLangue = new LangueVo();
    this.langueService.findAll().subscribe((data) => this.langues = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiqueLangueService.edit().subscribe(outilPedagogiqueLangue=>{
    const myIndex = this.outilPedagogiqueLangues.findIndex(e => e.id === this.selectedOutilPedagogiqueLangue.id);
    this.outilPedagogiqueLangues[myIndex] = this.selectedOutilPedagogiqueLangue;
    this.editOutilPedagogiqueLangueDialog = false;
    this.selectedOutilPedagogiqueLangue = new OutilPedagogiqueLangueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatelangue(langue: string) {
                      const isPermistted = await this.roleService.isPermitted('Langue', 'add');
                       if(isPermistted){
         this.selectedLangue = new LangueVo();
        this.createLangueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
// methods

hideEditDialog(){
    this.editOutilPedagogiqueLangueDialog  = false;
}

// getters and setters

get outilPedagogiqueLangues(): Array<OutilPedagogiqueLangueVo> {
    return this.outilPedagogiqueLangueService.outilPedagogiqueLangues;
       }
set outilPedagogiqueLangues(value: Array<OutilPedagogiqueLangueVo>) {
        this.outilPedagogiqueLangueService.outilPedagogiqueLangues = value;
       }

 get selectedOutilPedagogiqueLangue(): OutilPedagogiqueLangueVo {
           return this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue;
       }
    set selectedOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue = value;
       }

   get editOutilPedagogiqueLangueDialog(): boolean {
           return this.outilPedagogiqueLangueService.editOutilPedagogiqueLangueDialog;

       }
    set editOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.editOutilPedagogiqueLangueDialog = value;
       }

       get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues(): Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get createLangueDialog(): boolean {
           return this.langueService.createLangueDialog;
       }
      set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
