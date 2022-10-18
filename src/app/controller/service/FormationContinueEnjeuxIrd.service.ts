import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinueEnjeuxIrdVo} from '../model/FormationContinueEnjeuxIrd.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinueEnjeuxIrd/';
        })
    }
     private _formationContinueEnjeuxIrds: Array<FormationContinueEnjeuxIrdVo> ;
     private _selectedFormationContinueEnjeuxIrd: FormationContinueEnjeuxIrdVo;
     private _formationContinueEnjeuxIrdSelections: Array<FormationContinueEnjeuxIrdVo>;
     private _createFormationContinueEnjeuxIrdDialog: boolean;
     private _editFormationContinueEnjeuxIrdDialog: boolean;
     private _viewFormationContinueEnjeuxIrdDialog: boolean;
     public editFormationContinueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<FormationContinueEnjeuxIrdVo> {
         return this.http.post<FormationContinueEnjeuxIrdVo>(this.API, this.selectedFormationContinueEnjeuxIrd);
    }

    delete(formationContinueEnjeuxIrd: FormationContinueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinueEnjeuxIrd.id);
    }


    public edit(): Observable<FormationContinueEnjeuxIrdVo> {
        return this.http.put<FormationContinueEnjeuxIrdVo>(this.API, this.selectedFormationContinueEnjeuxIrd);
    }


     public findByCriteria(formationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo):Observable<Array<FormationContinueEnjeuxIrdVo>>{
           return this.http.post<Array<FormationContinueEnjeuxIrdVo>>(this.API +'search', formationContinueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(formationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo):Observable<FormationContinueEnjeuxIrdVo>{
         return this.http.get<FormationContinueEnjeuxIrdVo>(this.API + 'detail/id/' +formationContinueEnjeuxIrd.id);
    }

    // getters and setters


    get formationContinueEnjeuxIrds(): Array<FormationContinueEnjeuxIrdVo> {
    if(this._formationContinueEnjeuxIrds==null){
    this._formationContinueEnjeuxIrds=new Array<FormationContinueEnjeuxIrdVo>();
    }
return this._formationContinueEnjeuxIrds;
       }

    set formationContinueEnjeuxIrds(value: Array<FormationContinueEnjeuxIrdVo>) {
        this._formationContinueEnjeuxIrds = value;
       }

    get selectedFormationContinueEnjeuxIrd(): FormationContinueEnjeuxIrdVo {
    if(this._selectedFormationContinueEnjeuxIrd==null){
    this._selectedFormationContinueEnjeuxIrd=new FormationContinueEnjeuxIrdVo();
    }
           return this._selectedFormationContinueEnjeuxIrd;
       }

    set selectedFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this._selectedFormationContinueEnjeuxIrd = value;
       }

    get formationContinueEnjeuxIrdSelections(): Array<FormationContinueEnjeuxIrdVo> {
    if(this._formationContinueEnjeuxIrdSelections==null){
    this._formationContinueEnjeuxIrdSelections=new Array<FormationContinueEnjeuxIrdVo>();
    }
        return this._formationContinueEnjeuxIrdSelections;
       }


    set formationContinueEnjeuxIrdSelections(value: Array<FormationContinueEnjeuxIrdVo>) {
        this._formationContinueEnjeuxIrdSelections = value;
       }

    get createFormationContinueEnjeuxIrdDialog(): boolean {
        return this._createFormationContinueEnjeuxIrdDialog;
       }

    set createFormationContinueEnjeuxIrdDialog(value: boolean) {
        this._createFormationContinueEnjeuxIrdDialog = value;
       }

    get editFormationContinueEnjeuxIrdDialog(): boolean {
        return this._editFormationContinueEnjeuxIrdDialog;
       }

    set editFormationContinueEnjeuxIrdDialog(value: boolean) {
        this._editFormationContinueEnjeuxIrdDialog = value;
       }

    get viewFormationContinueEnjeuxIrdDialog(): boolean {
        return this._viewFormationContinueEnjeuxIrdDialog;
       }

    set viewFormationContinueEnjeuxIrdDialog(value: boolean) {
        this._viewFormationContinueEnjeuxIrdDialog = value;
       }

     get searchFormationContinueEnjeuxIrd(): FormationContinueEnjeuxIrdVo {
     if(this._searchFormationContinueEnjeuxIrd==null){
    this._searchFormationContinueEnjeuxIrd=new FormationContinueEnjeuxIrdVo();
    }
        return this._searchFormationContinueEnjeuxIrd;
    }

    set searchFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this._searchFormationContinueEnjeuxIrd = value;
       }

}
