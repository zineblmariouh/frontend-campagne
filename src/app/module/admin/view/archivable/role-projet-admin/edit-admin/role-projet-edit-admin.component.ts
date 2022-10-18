import {Component, OnInit} from '@angular/core';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-role-projet-edit-admin',
  templateUrl: './role-projet-edit-admin.component.html',
  styleUrls: ['./role-projet-edit-admin.component.css']
})
export class RoleProjetEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService
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
            this.selectedRoleProjet.dateArchivage = DateUtils.toDate(this.selectedRoleProjet.dateArchivage);
            this.selectedRoleProjet.dateCreation = DateUtils.toDate(this.selectedRoleProjet.dateCreation);
    this.roleProjetService.edit().subscribe(roleProjet=>{
    const myIndex = this.roleProjets.findIndex(e => e.id === this.selectedRoleProjet.id);
    this.roleProjets[myIndex] = this.selectedRoleProjet;
    this.editRoleProjetDialog = false;
    this.selectedRoleProjet = new RoleProjetVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editRoleProjetDialog  = false;
}

// getters and setters

get roleProjets(): Array<RoleProjetVo> {
    return this.roleProjetService.roleProjets;
       }
set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

 get selectedRoleProjet(): RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }

   get editRoleProjetDialog(): boolean {
           return this.roleProjetService.editRoleProjetDialog;

       }
    set editRoleProjetDialog(value: boolean) {
        this.roleProjetService.editRoleProjetDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
