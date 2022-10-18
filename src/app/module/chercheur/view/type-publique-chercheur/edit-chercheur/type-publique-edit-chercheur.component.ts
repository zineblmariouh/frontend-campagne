import {Component, OnInit} from '@angular/core';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-publique-edit-chercheur',
  templateUrl: './type-publique-edit-chercheur.component.html',
  styleUrls: ['./type-publique-edit-chercheur.component.css']
})
export class TypePubliqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService
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
    this.typePubliqueService.edit().subscribe(typePublique=>{
    const myIndex = this.typePubliques.findIndex(e => e.id === this.selectedTypePublique.id);
    this.typePubliques[myIndex] = this.selectedTypePublique;
    this.editTypePubliqueDialog = false;
    this.selectedTypePublique = new TypePubliqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypePubliqueDialog  = false;
}

// getters and setters

get typePubliques(): Array<TypePubliqueVo> {
    return this.typePubliqueService.typePubliques;
       }
set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }

 get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }

   get editTypePubliqueDialog(): boolean {
           return this.typePubliqueService.editTypePubliqueDialog;

       }
    set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
