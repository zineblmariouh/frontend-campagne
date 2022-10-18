import {Component, OnInit} from '@angular/core';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-departement-scientifique-view-admin',
  templateUrl: './departement-scientifique-view-admin.component.html',
  styleUrls: ['./departement-scientifique-view-admin.component.css']
})
export class DepartementScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private departementScientifiqueService: DepartementScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewDepartementScientifiqueDialog  = false;
}

// getters and setters

get departementScientifiques(): Array<DepartementScientifiqueVo> {
    return this.departementScientifiqueService.departementScientifiques;
       }
set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

 get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }

   get viewDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.viewDepartementScientifiqueDialog;

       }
    set viewDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.viewDepartementScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
