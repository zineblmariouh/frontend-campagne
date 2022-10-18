import {Component, OnInit} from '@angular/core';
import {TypePubliqueCultureScientifiqueService} from '../../../../../controller/service/TypePubliqueCultureScientifique.service';
import {TypePubliqueCultureScientifiqueVo} from '../../../../../controller/model/TypePubliqueCultureScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-publique-culture-scientifique-view-admin',
  templateUrl: './type-publique-culture-scientifique-view-admin.component.html',
  styleUrls: ['./type-publique-culture-scientifique-view-admin.component.css']
})
export class TypePubliqueCultureScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueCultureScientifiqueService: TypePubliqueCultureScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypePubliqueCultureScientifiqueDialog  = false;
}

// getters and setters

get typePubliqueCultureScientifiques(): Array<TypePubliqueCultureScientifiqueVo> {
    return this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques;
       }
set typePubliqueCultureScientifiques(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques = value;
       }

 get selectedTypePubliqueCultureScientifique():TypePubliqueCultureScientifiqueVo {
           return this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique;
       }
    set selectedTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique = value;
       }

   get viewTypePubliqueCultureScientifiqueDialog():boolean {
           return this.typePubliqueCultureScientifiqueService.viewTypePubliqueCultureScientifiqueDialog;

       }
    set viewTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.viewTypePubliqueCultureScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
