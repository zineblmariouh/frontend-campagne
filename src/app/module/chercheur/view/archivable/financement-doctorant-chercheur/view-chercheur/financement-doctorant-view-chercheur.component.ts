import {Component, OnInit} from '@angular/core';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-financement-doctorant-view-chercheur',
  templateUrl: './financement-doctorant-view-chercheur.component.html',
  styleUrls: ['./financement-doctorant-view-chercheur.component.css']
})
export class FinancementDoctorantViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewFinancementDoctorantDialog  = false;
}

// getters and setters

get financementDoctorants(): Array<FinancementDoctorantVo> {
    return this.financementDoctorantService.financementDoctorants;
       }
set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

 get selectedFinancementDoctorant():FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }

   get viewFinancementDoctorantDialog():boolean {
           return this.financementDoctorantService.viewFinancementDoctorantDialog;

       }
    set viewFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.viewFinancementDoctorantDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
