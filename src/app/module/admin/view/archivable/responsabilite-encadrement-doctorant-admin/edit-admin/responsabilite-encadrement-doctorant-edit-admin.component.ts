import {Component, OnInit} from '@angular/core';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-responsabilite-encadrement-doctorant-edit-admin',
  templateUrl: './responsabilite-encadrement-doctorant-edit-admin.component.html',
  styleUrls: ['./responsabilite-encadrement-doctorant-edit-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
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
            this.selectedResponsabiliteEncadrementDoctorant.dateArchivage = DateUtils.toDate(this.selectedResponsabiliteEncadrementDoctorant.dateArchivage);
            this.selectedResponsabiliteEncadrementDoctorant.dateCreation = DateUtils.toDate(this.selectedResponsabiliteEncadrementDoctorant.dateCreation);
    this.responsabiliteEncadrementDoctorantService.edit().subscribe(responsabiliteEncadrementDoctorant=>{
    const myIndex = this.responsabiliteEncadrementDoctorants.findIndex(e => e.id === this.selectedResponsabiliteEncadrementDoctorant.id);
    this.responsabiliteEncadrementDoctorants[myIndex] = this.selectedResponsabiliteEncadrementDoctorant;
    this.editResponsabiliteEncadrementDoctorantDialog = false;
    this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editResponsabiliteEncadrementDoctorantDialog  = false;
}

// getters and setters

get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
    return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }

 get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }

   get editResponsabiliteEncadrementDoctorantDialog(): boolean {
           return this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog;

       }
    set editResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
