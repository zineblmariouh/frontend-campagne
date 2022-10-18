import {Component, OnInit} from '@angular/core';
import {EtatReclamationService} from '../../../../../controller/service/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../controller/model/EtatReclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-reclamation-edit-chercheur',
  templateUrl: './etat-reclamation-edit-chercheur.component.html',
  styleUrls: ['./etat-reclamation-edit-chercheur.component.css']
})
export class EtatReclamationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatReclamationService: EtatReclamationService
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
    this.etatReclamationService.edit().subscribe(etatReclamation=>{
    const myIndex = this.etatReclamations.findIndex(e => e.id === this.selectedEtatReclamation.id);
    this.etatReclamations[myIndex] = this.selectedEtatReclamation;
    this.editEtatReclamationDialog = false;
    this.selectedEtatReclamation = new EtatReclamationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatReclamationDialog  = false;
}

// getters and setters

get etatReclamations(): Array<EtatReclamationVo> {
    return this.etatReclamationService.etatReclamations;
       }
set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

 get selectedEtatReclamation(): EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }

   get editEtatReclamationDialog(): boolean {
           return this.etatReclamationService.editEtatReclamationDialog;

       }
    set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
