import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ChercheurEmailVo} from '../model/ChercheurEmail.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ChercheurEmailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/chercheurEmail/';
        })
    }
     private _chercheurEmails: Array<ChercheurEmailVo> ;
     private _selectedChercheurEmail: ChercheurEmailVo;
     private _chercheurEmailSelections: Array<ChercheurEmailVo>;
     private _createChercheurEmailDialog: boolean;
     private _editChercheurEmailDialog: boolean;
     private _viewChercheurEmailDialog: boolean;
     public editChercheurEmail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchChercheurEmail:ChercheurEmailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ChercheurEmailVo>>(this.API);
    }

    public save(): Observable<ChercheurEmailVo> {
         return this.http.post<ChercheurEmailVo>(this.API, this.selectedChercheurEmail);
    }

    delete(chercheurEmail: ChercheurEmailVo) {
         return this.http.delete<number>(this.API + 'id/' + chercheurEmail.id);
    }


    public edit(): Observable<ChercheurEmailVo> {
        return this.http.put<ChercheurEmailVo>(this.API, this.selectedChercheurEmail);
    }


     public findByCriteria(chercheurEmail:ChercheurEmailVo):Observable<Array<ChercheurEmailVo>>{
           return this.http.post<Array<ChercheurEmailVo>>(this.API +'search', chercheurEmail);
    }

   public findByIdWithAssociatedList(chercheurEmail:ChercheurEmailVo):Observable<ChercheurEmailVo>{
         return this.http.get<ChercheurEmailVo>(this.API + 'detail/id/' +chercheurEmail.id);
    }

    // getters and setters


    get chercheurEmails(): Array<ChercheurEmailVo> {
    if(this._chercheurEmails==null){
    this._chercheurEmails=new Array<ChercheurEmailVo>();
    }
return this._chercheurEmails;
       }

    set chercheurEmails(value: Array<ChercheurEmailVo>) {
        this._chercheurEmails = value;
       }

    get selectedChercheurEmail(): ChercheurEmailVo {
    if(this._selectedChercheurEmail==null){
    this._selectedChercheurEmail=new ChercheurEmailVo();
    }
           return this._selectedChercheurEmail;
       }

    set selectedChercheurEmail(value: ChercheurEmailVo) {
        this._selectedChercheurEmail = value;
       }

    get chercheurEmailSelections(): Array<ChercheurEmailVo> {
    if(this._chercheurEmailSelections==null){
    this._chercheurEmailSelections=new Array<ChercheurEmailVo>();
    }
        return this._chercheurEmailSelections;
       }


    set chercheurEmailSelections(value: Array<ChercheurEmailVo>) {
        this._chercheurEmailSelections = value;
       }

    get createChercheurEmailDialog(): boolean {
        return this._createChercheurEmailDialog;
       }

    set createChercheurEmailDialog(value: boolean) {
        this._createChercheurEmailDialog = value;
       }

    get editChercheurEmailDialog(): boolean {
        return this._editChercheurEmailDialog;
       }

    set editChercheurEmailDialog(value: boolean) {
        this._editChercheurEmailDialog = value;
       }

    get viewChercheurEmailDialog(): boolean {
        return this._viewChercheurEmailDialog;
       }

    set viewChercheurEmailDialog(value: boolean) {
        this._viewChercheurEmailDialog = value;
       }

     get searchChercheurEmail(): ChercheurEmailVo {
     if(this._searchChercheurEmail==null){
    this._searchChercheurEmail=new ChercheurEmailVo();
    }
        return this._searchChercheurEmail;
    }

    set searchChercheurEmail(value: ChercheurEmailVo) {
        this._searchChercheurEmail = value;
       }

}
