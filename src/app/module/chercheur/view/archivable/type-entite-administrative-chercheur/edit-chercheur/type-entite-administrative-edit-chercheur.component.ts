import {Component, OnInit} from '@angular/core';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-entite-administrative-edit-chercheur',
  templateUrl: './type-entite-administrative-edit-chercheur.component.html',
  styleUrls: ['./type-entite-administrative-edit-chercheur.component.css']
})
export class TypeEntiteAdministrativeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
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
            this.selectedTypeEntiteAdministrative.dateArchivage = DateUtils.toDate(this.selectedTypeEntiteAdministrative.dateArchivage);
            this.selectedTypeEntiteAdministrative.dateCreation = DateUtils.toDate(this.selectedTypeEntiteAdministrative.dateCreation);
    this.typeEntiteAdministrativeService.edit().subscribe(typeEntiteAdministrative=>{
    const myIndex = this.typeEntiteAdministratives.findIndex(e => e.id === this.selectedTypeEntiteAdministrative.id);
    this.typeEntiteAdministratives[myIndex] = this.selectedTypeEntiteAdministrative;
    this.editTypeEntiteAdministrativeDialog = false;
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeEntiteAdministrativeDialog  = false;
}

// getters and setters

get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
    return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }

 get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }

   get editTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;

       }
    set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
