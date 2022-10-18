import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from '../../../../../controller/service/Caracterisation.service';
import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-caracterisation-edit-chercheur',
  templateUrl: './caracterisation-edit-chercheur.component.html',
  styleUrls: ['./caracterisation-edit-chercheur.component.css']
})
export class CaracterisationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService
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
            this.selectedCaracterisation.dateArchivage = DateUtils.toDate(this.selectedCaracterisation.dateArchivage);
            this.selectedCaracterisation.dateCreation = DateUtils.toDate(this.selectedCaracterisation.dateCreation);
    this.caracterisationService.edit().subscribe(caracterisation=>{
    const myIndex = this.caracterisations.findIndex(e => e.id === this.selectedCaracterisation.id);
    this.caracterisations[myIndex] = this.selectedCaracterisation;
    this.editCaracterisationDialog = false;
    this.selectedCaracterisation = new CaracterisationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCaracterisationDialog  = false;
}

// getters and setters

get caracterisations(): Array<CaracterisationVo> {
    return this.caracterisationService.caracterisations;
       }
set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }

 get selectedCaracterisation(): CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }

   get editCaracterisationDialog(): boolean {
           return this.caracterisationService.editCaracterisationDialog;

       }
    set editCaracterisationDialog(value: boolean) {
        this.caracterisationService.editCaracterisationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
