import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-pays-view-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-pays-view-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-pays-view-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiquePaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiquePaysService: DeveloppementDeSavoirEtInnovationScientifiquePaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiquePayss(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    return this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss;
       }
set developpementDeSavoirEtInnovationScientifiquePayss(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiquePays():DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog= value;
       }

       get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques():Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get editDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
