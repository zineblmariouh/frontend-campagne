import {Component, OnInit} from '@angular/core';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-status-contrat-et-convention-edit-chercheur',
  templateUrl: './status-contrat-et-convention-edit-chercheur.component.html',
  styleUrls: ['./status-contrat-et-convention-edit-chercheur.component.css']
})
export class StatusContratEtConventionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService
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
    this.statusContratEtConventionService.edit().subscribe(statusContratEtConvention=>{
    const myIndex = this.statusContratEtConventions.findIndex(e => e.id === this.selectedStatusContratEtConvention.id);
    this.statusContratEtConventions[myIndex] = this.selectedStatusContratEtConvention;
    this.editStatusContratEtConventionDialog = false;
    this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStatusContratEtConventionDialog  = false;
}

// getters and setters

get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
    return this.statusContratEtConventionService.statusContratEtConventions;
       }
set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }

 get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }

   get editStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.editStatusContratEtConventionDialog;

       }
    set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
