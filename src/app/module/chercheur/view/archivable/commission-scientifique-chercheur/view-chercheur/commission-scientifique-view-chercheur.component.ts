import {Component, OnInit} from '@angular/core';
import {CommissionScientifiqueService} from '../../../../../controller/service/CommissionScientifique.service';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-commission-scientifique-view-chercheur',
  templateUrl: './commission-scientifique-view-chercheur.component.html',
  styleUrls: ['./commission-scientifique-view-chercheur.component.css']
})
export class CommissionScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private commissionScientifiqueService: CommissionScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCommissionScientifiqueDialog  = false;
}

// getters and setters

get commissionScientifiques(): Array<CommissionScientifiqueVo> {
    return this.commissionScientifiqueService.commissionScientifiques;
       }
set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }

 get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }

   get viewCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.viewCommissionScientifiqueDialog;

       }
    set viewCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.viewCommissionScientifiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
