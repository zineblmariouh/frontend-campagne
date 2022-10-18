import {Component, OnInit} from '@angular/core';
import {NiveauFormationService} from '../../../../../controller/service/NiveauFormation.service';
import {NiveauFormationVo} from '../../../../../controller/model/NiveauFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-formation-edit-chercheur',
  templateUrl: './niveau-formation-edit-chercheur.component.html',
  styleUrls: ['./niveau-formation-edit-chercheur.component.css']
})
export class NiveauFormationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauFormationService: NiveauFormationService
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
            this.selectedNiveauFormation.dateArchivage = DateUtils.toDate(this.selectedNiveauFormation.dateArchivage);
            this.selectedNiveauFormation.dateCreation = DateUtils.toDate(this.selectedNiveauFormation.dateCreation);
    this.niveauFormationService.edit().subscribe(niveauFormation=>{
    const myIndex = this.niveauFormations.findIndex(e => e.id === this.selectedNiveauFormation.id);
    this.niveauFormations[myIndex] = this.selectedNiveauFormation;
    this.editNiveauFormationDialog = false;
    this.selectedNiveauFormation = new NiveauFormationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNiveauFormationDialog  = false;
}

// getters and setters

get niveauFormations(): Array<NiveauFormationVo> {
    return this.niveauFormationService.niveauFormations;
       }
set niveauFormations(value: Array<NiveauFormationVo>) {
        this.niveauFormationService.niveauFormations = value;
       }

 get selectedNiveauFormation(): NiveauFormationVo {
           return this.niveauFormationService.selectedNiveauFormation;
       }
    set selectedNiveauFormation(value: NiveauFormationVo) {
        this.niveauFormationService.selectedNiveauFormation = value;
       }

   get editNiveauFormationDialog(): boolean {
           return this.niveauFormationService.editNiveauFormationDialog;

       }
    set editNiveauFormationDialog(value: boolean) {
        this.niveauFormationService.editNiveauFormationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
