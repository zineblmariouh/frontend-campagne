import {Component, OnInit} from '@angular/core';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-publique-view-admin',
  templateUrl: './type-publique-view-admin.component.html',
  styleUrls: ['./type-publique-view-admin.component.css']
})
export class TypePubliqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypePubliqueDialog  = false;
}

// getters and setters

get typePubliques(): Array<TypePubliqueVo> {
    return this.typePubliqueService.typePubliques;
       }
set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }

 get selectedTypePublique():TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }

   get viewTypePubliqueDialog():boolean {
           return this.typePubliqueService.viewTypePubliqueDialog;

       }
    set viewTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.viewTypePubliqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
