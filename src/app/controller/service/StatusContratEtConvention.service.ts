import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StatusContratEtConventionVo} from '../model/StatusContratEtConvention.model';


@Injectable({
  providedIn: 'root'
})
export class StatusContratEtConventionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/statusContratEtConvention/';
        })
    }
     private _statusContratEtConventions: Array<StatusContratEtConventionVo> ;
     private _selectedStatusContratEtConvention: StatusContratEtConventionVo;
     private _statusContratEtConventionSelections: Array<StatusContratEtConventionVo>;
     private _createStatusContratEtConventionDialog: boolean;
     private _editStatusContratEtConventionDialog: boolean;
     private _viewStatusContratEtConventionDialog: boolean;
     public editStatusContratEtConvention$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStatusContratEtConvention:StatusContratEtConventionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<StatusContratEtConventionVo>>(this.API);
    }

    public save(): Observable<StatusContratEtConventionVo> {
         return this.http.post<StatusContratEtConventionVo>(this.API, this.selectedStatusContratEtConvention);
    }

    delete(statusContratEtConvention: StatusContratEtConventionVo) {
         return this.http.delete<number>(this.API + 'id/' + statusContratEtConvention.id);
    }


    public edit(): Observable<StatusContratEtConventionVo> {
        return this.http.put<StatusContratEtConventionVo>(this.API, this.selectedStatusContratEtConvention);
    }


     public findByCriteria(statusContratEtConvention:StatusContratEtConventionVo):Observable<Array<StatusContratEtConventionVo>>{
           return this.http.post<Array<StatusContratEtConventionVo>>(this.API +'search', statusContratEtConvention);
    }

   public findByIdWithAssociatedList(statusContratEtConvention:StatusContratEtConventionVo):Observable<StatusContratEtConventionVo>{
         return this.http.get<StatusContratEtConventionVo>(this.API + 'detail/id/' +statusContratEtConvention.id);
    }

    // getters and setters


    get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
    if(this._statusContratEtConventions==null){
    this._statusContratEtConventions=new Array<StatusContratEtConventionVo>();
    }
return this._statusContratEtConventions;
       }

    set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this._statusContratEtConventions = value;
       }

    get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
    if(this._selectedStatusContratEtConvention==null){
    this._selectedStatusContratEtConvention=new StatusContratEtConventionVo();
    }
           return this._selectedStatusContratEtConvention;
       }

    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this._selectedStatusContratEtConvention = value;
       }

    get statusContratEtConventionSelections(): Array<StatusContratEtConventionVo> {
    if(this._statusContratEtConventionSelections==null){
    this._statusContratEtConventionSelections=new Array<StatusContratEtConventionVo>();
    }
        return this._statusContratEtConventionSelections;
       }


    set statusContratEtConventionSelections(value: Array<StatusContratEtConventionVo>) {
        this._statusContratEtConventionSelections = value;
       }

    get createStatusContratEtConventionDialog(): boolean {
        return this._createStatusContratEtConventionDialog;
       }

    set createStatusContratEtConventionDialog(value: boolean) {
        this._createStatusContratEtConventionDialog = value;
       }

    get editStatusContratEtConventionDialog(): boolean {
        return this._editStatusContratEtConventionDialog;
       }

    set editStatusContratEtConventionDialog(value: boolean) {
        this._editStatusContratEtConventionDialog = value;
       }

    get viewStatusContratEtConventionDialog(): boolean {
        return this._viewStatusContratEtConventionDialog;
       }

    set viewStatusContratEtConventionDialog(value: boolean) {
        this._viewStatusContratEtConventionDialog = value;
       }

     get searchStatusContratEtConvention(): StatusContratEtConventionVo {
     if(this._searchStatusContratEtConvention==null){
    this._searchStatusContratEtConvention=new StatusContratEtConventionVo();
    }
        return this._searchStatusContratEtConvention;
    }

    set searchStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this._searchStatusContratEtConvention = value;
       }

}
