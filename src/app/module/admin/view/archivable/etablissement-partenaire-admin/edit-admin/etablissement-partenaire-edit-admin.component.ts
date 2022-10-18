import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireService} from '../../../../../controller/service/EtablissementPartenaire.service';
import {EtablissementPartenaireVo} from '../../../../../controller/model/EtablissementPartenaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etablissement-partenaire-edit-admin',
  templateUrl: './etablissement-partenaire-edit-admin.component.html',
  styleUrls: ['./etablissement-partenaire-edit-admin.component.css']
})
export class EtablissementPartenaireEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEtablissementPartenaire.dateArchivage = DateUtils.toDate(this.selectedEtablissementPartenaire.dateArchivage);
            this.selectedEtablissementPartenaire.dateCreation = DateUtils.toDate(this.selectedEtablissementPartenaire.dateCreation);
    this.etablissementPartenaireService.edit().subscribe(etablissementPartenaire=>{
    const myIndex = this.etablissementPartenaires.findIndex(e => e.id === this.selectedEtablissementPartenaire.id);
    this.etablissementPartenaires[myIndex] = this.selectedEtablissementPartenaire;
    this.editEtablissementPartenaireDialog = false;
    this.selectedEtablissementPartenaire = new EtablissementPartenaireVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtablissementPartenaireDialog  = false;
}

// getters and setters

get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
    return this.etablissementPartenaireService.etablissementPartenaires;
       }
set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
       }

 get selectedEtablissementPartenaire(): EtablissementPartenaireVo {
           return this.etablissementPartenaireService.selectedEtablissementPartenaire;
       }
    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
       }

   get editEtablissementPartenaireDialog(): boolean {
           return this.etablissementPartenaireService.editEtablissementPartenaireDialog;

       }
    set editEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.editEtablissementPartenaireDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
