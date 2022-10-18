import {Component, OnInit} from '@angular/core';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-affectation-structurelle-view-chercheur',
  templateUrl: './affectation-structurelle-view-chercheur.component.html',
  styleUrls: ['./affectation-structurelle-view-chercheur.component.css']
})
export class AffectationStructurelleViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewAffectationStructurelleDialog  = false;
}

// getters and setters

get affectationStructurelles(): Array<AffectationStructurelleVo> {
    return this.affectationStructurelleService.affectationStructurelles;
       }
set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }

 get selectedAffectationStructurelle():AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }

   get viewAffectationStructurelleDialog():boolean {
           return this.affectationStructurelleService.viewAffectationStructurelleDialog;

       }
    set viewAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.viewAffectationStructurelleDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
