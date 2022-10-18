import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-conseils-scientifique-edit-admin',
  templateUrl: './enjeux-ird-conseils-scientifique-edit-admin.component.html',
  styleUrls: ['./enjeux-ird-conseils-scientifique-edit-admin.component.css']
})
export class EnjeuxIrdConseilsScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdConseilsScientifiqueService: EnjeuxIrdConseilsScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enjeuxIrdConseilsScientifiqueService.edit().subscribe(enjeuxIrdConseilsScientifique=>{
    const myIndex = this.enjeuxIrdConseilsScientifiques.findIndex(e => e.id === this.selectedEnjeuxIrdConseilsScientifique.id);
    this.enjeuxIrdConseilsScientifiques[myIndex] = this.selectedEnjeuxIrdConseilsScientifique;
    this.editEnjeuxIrdConseilsScientifiqueDialog = false;
    this.selectedEnjeuxIrdConseilsScientifique = new EnjeuxIrdConseilsScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEnjeuxIrdConseilsScientifiqueDialog  = false;
}

// getters and setters

get enjeuxIrdConseilsScientifiques(): Array<EnjeuxIrdConseilsScientifiqueVo> {
    return this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques;
       }
set enjeuxIrdConseilsScientifiques(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques = value;
       }

 get selectedEnjeuxIrdConseilsScientifique(): EnjeuxIrdConseilsScientifiqueVo {
           return this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique;
       }
    set selectedEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique = value;
       }

   get editEnjeuxIrdConseilsScientifiqueDialog(): boolean {
           return this.enjeuxIrdConseilsScientifiqueService.editEnjeuxIrdConseilsScientifiqueDialog;

       }
    set editEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this.enjeuxIrdConseilsScientifiqueService.editEnjeuxIrdConseilsScientifiqueDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
