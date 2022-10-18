import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from '../../../../../controller/service/TypeExpert.service';
import {TypeExpertVo} from '../../../../../controller/model/TypeExpert.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-expert-edit-chercheur',
  templateUrl: './type-expert-edit-chercheur.component.html',
  styleUrls: ['./type-expert-edit-chercheur.component.css']
})
export class TypeExpertEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService
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
            this.selectedTypeExpert.dateArchivage = DateUtils.toDate(this.selectedTypeExpert.dateArchivage);
            this.selectedTypeExpert.dateCreation = DateUtils.toDate(this.selectedTypeExpert.dateCreation);
    this.typeExpertService.edit().subscribe(typeExpert=>{
    const myIndex = this.typeExperts.findIndex(e => e.id === this.selectedTypeExpert.id);
    this.typeExperts[myIndex] = this.selectedTypeExpert;
    this.editTypeExpertDialog = false;
    this.selectedTypeExpert = new TypeExpertVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeExpertDialog  = false;
}

// getters and setters

get typeExperts(): Array<TypeExpertVo> {
    return this.typeExpertService.typeExperts;
       }
set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

 get selectedTypeExpert(): TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }

   get editTypeExpertDialog(): boolean {
           return this.typeExpertService.editTypeExpertDialog;

       }
    set editTypeExpertDialog(value: boolean) {
        this.typeExpertService.editTypeExpertDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
