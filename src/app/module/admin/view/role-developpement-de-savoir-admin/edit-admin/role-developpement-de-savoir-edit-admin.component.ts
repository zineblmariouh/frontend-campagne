import {Component, OnInit} from '@angular/core';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-role-developpement-de-savoir-edit-admin',
  templateUrl: './role-developpement-de-savoir-edit-admin.component.html',
  styleUrls: ['./role-developpement-de-savoir-edit-admin.component.css']
})
export class RoleDeveloppementDeSavoirEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
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
    this.roleDeveloppementDeSavoirService.edit().subscribe(roleDeveloppementDeSavoir=>{
    const myIndex = this.roleDeveloppementDeSavoirs.findIndex(e => e.id === this.selectedRoleDeveloppementDeSavoir.id);
    this.roleDeveloppementDeSavoirs[myIndex] = this.selectedRoleDeveloppementDeSavoir;
    this.editRoleDeveloppementDeSavoirDialog = false;
    this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editRoleDeveloppementDeSavoirDialog  = false;
}

// getters and setters

get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
    return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }

 get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }

   get editRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;

       }
    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
