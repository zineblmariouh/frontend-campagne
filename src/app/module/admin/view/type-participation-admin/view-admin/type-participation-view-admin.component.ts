import {Component, OnInit} from '@angular/core';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-participation-view-admin',
  templateUrl: './type-participation-view-admin.component.html',
  styleUrls: ['./type-participation-view-admin.component.css']
})
export class TypeParticipationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeParticipationDialog  = false;
}

// getters and setters

get typeParticipations(): Array<TypeParticipationVo> {
    return this.typeParticipationService.typeParticipations;
       }
set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }

 get selectedTypeParticipation():TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
    set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }

   get viewTypeParticipationDialog():boolean {
           return this.typeParticipationService.viewTypeParticipationDialog;

       }
    set viewTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.viewTypeParticipationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
