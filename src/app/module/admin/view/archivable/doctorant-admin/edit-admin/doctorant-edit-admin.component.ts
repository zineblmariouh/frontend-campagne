import {Component, OnInit} from '@angular/core';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {SexeService} from '../../../../../controller/service/Sexe.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-doctorant-edit-admin',
  templateUrl: './doctorant-edit-admin.component.html',
  styleUrls: ['./doctorant-edit-admin.component.css']
})
export class DoctorantEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private doctorantService: DoctorantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private sexeService: SexeService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDoctorant.dateArchivage = DateUtils.toDate(this.selectedDoctorant.dateArchivage);
            this.selectedDoctorant.dateCreation = DateUtils.toDate(this.selectedDoctorant.dateCreation);
    this.doctorantService.edit().subscribe(doctorant=>{
    const myIndex = this.doctorants.findIndex(e => e.id === this.selectedDoctorant.id);
    this.doctorants[myIndex] = this.selectedDoctorant;
    this.editDoctorantDialog = false;
    this.selectedDoctorant = new DoctorantVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatesexe(sexe: string) {
                      const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
                       if(isPermistted){
         this.selectedSexe = new SexeVo();
        this.createSexeDialog = true;
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

hideEditDialog(){
    this.editDoctorantDialog  = false;
}

// getters and setters

get doctorants(): Array<DoctorantVo> {
    return this.doctorantService.doctorants;
       }
set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }

 get selectedDoctorant(): DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
    set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }

   get editDoctorantDialog(): boolean {
           return this.doctorantService.editDoctorantDialog;

       }
    set editDoctorantDialog(value: boolean) {
        this.doctorantService.editDoctorantDialog = value;
       }

       get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes(): Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get createSexeDialog(): boolean {
           return this.sexeService.createSexeDialog;
       }
      set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
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
