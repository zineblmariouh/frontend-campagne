import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from '../../../../../controller/service/TypeExpert.service';
import {TypeExpertVo} from '../../../../../controller/model/TypeExpert.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-expert-view-chercheur',
  templateUrl: './type-expert-view-chercheur.component.html',
  styleUrls: ['./type-expert-view-chercheur.component.css']
})
export class TypeExpertViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeExpertDialog  = false;
}

// getters and setters

get typeExperts(): Array<TypeExpertVo> {
    return this.typeExpertService.typeExperts;
       }
set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

 get selectedTypeExpert():TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }

   get viewTypeExpertDialog():boolean {
           return this.typeExpertService.viewTypeExpertDialog;

       }
    set viewTypeExpertDialog(value: boolean) {
        this.typeExpertService.viewTypeExpertDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
