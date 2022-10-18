import {Component, OnInit} from '@angular/core';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-status-projet-edit-admin',
  templateUrl: './status-projet-edit-admin.component.html',
  styleUrls: ['./status-projet-edit-admin.component.css']
})
export class StatusProjetEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusProjetService: StatusProjetService
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
            this.selectedStatusProjet.dateArchivage = DateUtils.toDate(this.selectedStatusProjet.dateArchivage);
            this.selectedStatusProjet.dateCreation = DateUtils.toDate(this.selectedStatusProjet.dateCreation);
    this.statusProjetService.edit().subscribe(statusProjet=>{
    const myIndex = this.statusProjets.findIndex(e => e.id === this.selectedStatusProjet.id);
    this.statusProjets[myIndex] = this.selectedStatusProjet;
    this.editStatusProjetDialog = false;
    this.selectedStatusProjet = new StatusProjetVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStatusProjetDialog  = false;
}

// getters and setters

get statusProjets(): Array<StatusProjetVo> {
    return this.statusProjetService.statusProjets;
       }
set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }

 get selectedStatusProjet(): StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
    set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }

   get editStatusProjetDialog(): boolean {
           return this.statusProjetService.editStatusProjetDialog;

       }
    set editStatusProjetDialog(value: boolean) {
        this.statusProjetService.editStatusProjetDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
