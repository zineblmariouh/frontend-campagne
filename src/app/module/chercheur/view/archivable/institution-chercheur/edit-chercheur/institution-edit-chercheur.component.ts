import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../../controller/service/Institution.service';
import {InstitutionVo} from '../../../../../controller/model/Institution.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-institution-edit-chercheur',
  templateUrl: './institution-edit-chercheur.component.html',
  styleUrls: ['./institution-edit-chercheur.component.css']
})
export class InstitutionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private institutionService: InstitutionService
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
            this.selectedInstitution.dateArchivage = DateUtils.toDate(this.selectedInstitution.dateArchivage);
            this.selectedInstitution.dateCreation = DateUtils.toDate(this.selectedInstitution.dateCreation);
    this.institutionService.edit().subscribe(institution=>{
    const myIndex = this.institutions.findIndex(e => e.id === this.selectedInstitution.id);
    this.institutions[myIndex] = this.selectedInstitution;
    this.editInstitutionDialog = false;
    this.selectedInstitution = new InstitutionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editInstitutionDialog  = false;
}

// getters and setters

get institutions(): Array<InstitutionVo> {
    return this.institutionService.institutions;
       }
set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

 get selectedInstitution(): InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }

   get editInstitutionDialog(): boolean {
           return this.institutionService.editInstitutionDialog;

       }
    set editInstitutionDialog(value: boolean) {
        this.institutionService.editInstitutionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
