import {Component, OnInit} from '@angular/core';
import {InstitutionService} from '../../../../../controller/service/Institution.service';
import {InstitutionVo} from '../../../../../controller/model/Institution.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-institution-view-chercheur',
  templateUrl: './institution-view-chercheur.component.html',
  styleUrls: ['./institution-view-chercheur.component.css']
})
export class InstitutionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private institutionService: InstitutionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewInstitutionDialog  = false;
}

// getters and setters

get institutions(): Array<InstitutionVo> {
    return this.institutionService.institutions;
       }
set institutions(value: Array<InstitutionVo>) {
        this.institutionService.institutions = value;
       }

 get selectedInstitution():InstitutionVo {
           return this.institutionService.selectedInstitution;
       }
    set selectedInstitution(value: InstitutionVo) {
        this.institutionService.selectedInstitution = value;
       }

   get viewInstitutionDialog():boolean {
           return this.institutionService.viewInstitutionDialog;

       }
    set viewInstitutionDialog(value: boolean) {
        this.institutionService.viewInstitutionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
