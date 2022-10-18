import {Component, OnInit} from '@angular/core';
import {NatureActiviteGrandPubliqueService} from '../../../../../controller/service/NatureActiviteGrandPublique.service';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-activite-grand-publique-view-admin',
  templateUrl: './nature-activite-grand-publique-view-admin.component.html',
  styleUrls: ['./nature-activite-grand-publique-view-admin.component.css']
})
export class NatureActiviteGrandPubliqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNatureActiviteGrandPubliqueDialog  = false;
}

// getters and setters

get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
    return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
       }
set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
       }

 get selectedNatureActiviteGrandPublique():NatureActiviteGrandPubliqueVo {
           return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
       }
    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
       }

   get viewNatureActiviteGrandPubliqueDialog():boolean {
           return this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog;

       }
    set viewNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.viewNatureActiviteGrandPubliqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
