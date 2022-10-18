import {Component, OnInit} from '@angular/core';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-status-cursus-edit-admin',
  templateUrl: './status-cursus-edit-admin.component.html',
  styleUrls: ['./status-cursus-edit-admin.component.css']
})
export class StatusCursusEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusCursusService: StatusCursusService
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
            this.selectedStatusCursus.dateArchivage = DateUtils.toDate(this.selectedStatusCursus.dateArchivage);
            this.selectedStatusCursus.dateCreation = DateUtils.toDate(this.selectedStatusCursus.dateCreation);
    this.statusCursusService.edit().subscribe(statusCursus=>{
    const myIndex = this.statusCursuss.findIndex(e => e.id === this.selectedStatusCursus.id);
    this.statusCursuss[myIndex] = this.selectedStatusCursus;
    this.editStatusCursusDialog = false;
    this.selectedStatusCursus = new StatusCursusVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStatusCursusDialog  = false;
}

// getters and setters

get statusCursuss(): Array<StatusCursusVo> {
    return this.statusCursusService.statusCursuss;
       }
set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }

 get selectedStatusCursus(): StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
    set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }

   get editStatusCursusDialog(): boolean {
           return this.statusCursusService.editStatusCursusDialog;

       }
    set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
