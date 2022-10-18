import {Component, OnInit} from '@angular/core';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-savoir-edit-chercheur',
  templateUrl: './type-savoir-edit-chercheur.component.html',
  styleUrls: ['./type-savoir-edit-chercheur.component.css']
})
export class TypeSavoirEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService
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
            this.selectedTypeSavoir.dateArchivage = DateUtils.toDate(this.selectedTypeSavoir.dateArchivage);
            this.selectedTypeSavoir.dateCreation = DateUtils.toDate(this.selectedTypeSavoir.dateCreation);
    this.typeSavoirService.edit().subscribe(typeSavoir=>{
    const myIndex = this.typeSavoirs.findIndex(e => e.id === this.selectedTypeSavoir.id);
    this.typeSavoirs[myIndex] = this.selectedTypeSavoir;
    this.editTypeSavoirDialog = false;
    this.selectedTypeSavoir = new TypeSavoirVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeSavoirDialog  = false;
}

// getters and setters

get typeSavoirs(): Array<TypeSavoirVo> {
    return this.typeSavoirService.typeSavoirs;
       }
set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

 get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }

   get editTypeSavoirDialog(): boolean {
           return this.typeSavoirService.editTypeSavoirDialog;

       }
    set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
