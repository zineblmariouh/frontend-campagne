import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueService} from '../../../../../controller/service/ObjetFormationGeneriqueDeResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo} from '../../../../../controller/model/ObjetFormationGeneriqueDeResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';

@Component({
  selector: 'app-objet-formation-generique-de-responsabilite-pedagogique-edit-admin',
  templateUrl: './objet-formation-generique-de-responsabilite-pedagogique-edit-admin.component.html',
  styleUrls: ['./objet-formation-generique-de-responsabilite-pedagogique-edit-admin.component.css']
})
export class ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private objetFormationGeneriqueDeResponsabilitePedagogiqueService: ObjetFormationGeneriqueDeResponsabilitePedagogiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private objetFormationGeneriqueService: ObjetFormationGeneriqueService
 ,       private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.edit().subscribe(objetFormationGeneriqueDeResponsabilitePedagogique=>{
    const myIndex = this.objetFormationGeneriqueDeResponsabilitePedagogiques.findIndex(e => e.id === this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique.id);
    this.objetFormationGeneriqueDeResponsabilitePedagogiques[myIndex] = this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
    this.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = false;
    this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get objetFormationGeneriqueDeResponsabilitePedagogiques(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
    return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques;
       }
set objetFormationGeneriqueDeResponsabilitePedagogiques(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques = value;
       }

 get selectedObjetFormationGeneriqueDeResponsabilitePedagogique(): ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
       }
    set selectedObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

   get editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(): boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;

       }
    set editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
