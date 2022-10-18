import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementEnjeuxIrdVo} from '../model/EnseignementEnjeuxIrd.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignementEnjeuxIrd/';
        })
    }
     private _enseignementEnjeuxIrds: Array<EnseignementEnjeuxIrdVo> ;
     private _selectedEnseignementEnjeuxIrd: EnseignementEnjeuxIrdVo;
     private _enseignementEnjeuxIrdSelections: Array<EnseignementEnjeuxIrdVo>;
     private _createEnseignementEnjeuxIrdDialog: boolean;
     private _editEnseignementEnjeuxIrdDialog: boolean;
     private _viewEnseignementEnjeuxIrdDialog: boolean;
     public editEnseignementEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignementEnjeuxIrd:EnseignementEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnseignementEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<EnseignementEnjeuxIrdVo> {
         return this.http.post<EnseignementEnjeuxIrdVo>(this.API, this.selectedEnseignementEnjeuxIrd);
    }

    delete(enseignementEnjeuxIrd: EnseignementEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignementEnjeuxIrd.id);
    }


    public edit(): Observable<EnseignementEnjeuxIrdVo> {
        return this.http.put<EnseignementEnjeuxIrdVo>(this.API, this.selectedEnseignementEnjeuxIrd);
    }


     public findByCriteria(enseignementEnjeuxIrd:EnseignementEnjeuxIrdVo):Observable<Array<EnseignementEnjeuxIrdVo>>{
           return this.http.post<Array<EnseignementEnjeuxIrdVo>>(this.API +'search', enseignementEnjeuxIrd);
    }

   public findByIdWithAssociatedList(enseignementEnjeuxIrd:EnseignementEnjeuxIrdVo):Observable<EnseignementEnjeuxIrdVo>{
         return this.http.get<EnseignementEnjeuxIrdVo>(this.API + 'detail/id/' +enseignementEnjeuxIrd.id);
    }

    // getters and setters


    get enseignementEnjeuxIrds(): Array<EnseignementEnjeuxIrdVo> {
    if(this._enseignementEnjeuxIrds==null){
    this._enseignementEnjeuxIrds=new Array<EnseignementEnjeuxIrdVo>();
    }
return this._enseignementEnjeuxIrds;
       }

    set enseignementEnjeuxIrds(value: Array<EnseignementEnjeuxIrdVo>) {
        this._enseignementEnjeuxIrds = value;
       }

    get selectedEnseignementEnjeuxIrd(): EnseignementEnjeuxIrdVo {
    if(this._selectedEnseignementEnjeuxIrd==null){
    this._selectedEnseignementEnjeuxIrd=new EnseignementEnjeuxIrdVo();
    }
           return this._selectedEnseignementEnjeuxIrd;
       }

    set selectedEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this._selectedEnseignementEnjeuxIrd = value;
       }

    get enseignementEnjeuxIrdSelections(): Array<EnseignementEnjeuxIrdVo> {
    if(this._enseignementEnjeuxIrdSelections==null){
    this._enseignementEnjeuxIrdSelections=new Array<EnseignementEnjeuxIrdVo>();
    }
        return this._enseignementEnjeuxIrdSelections;
       }


    set enseignementEnjeuxIrdSelections(value: Array<EnseignementEnjeuxIrdVo>) {
        this._enseignementEnjeuxIrdSelections = value;
       }

    get createEnseignementEnjeuxIrdDialog(): boolean {
        return this._createEnseignementEnjeuxIrdDialog;
       }

    set createEnseignementEnjeuxIrdDialog(value: boolean) {
        this._createEnseignementEnjeuxIrdDialog = value;
       }

    get editEnseignementEnjeuxIrdDialog(): boolean {
        return this._editEnseignementEnjeuxIrdDialog;
       }

    set editEnseignementEnjeuxIrdDialog(value: boolean) {
        this._editEnseignementEnjeuxIrdDialog = value;
       }

    get viewEnseignementEnjeuxIrdDialog(): boolean {
        return this._viewEnseignementEnjeuxIrdDialog;
       }

    set viewEnseignementEnjeuxIrdDialog(value: boolean) {
        this._viewEnseignementEnjeuxIrdDialog = value;
       }

     get searchEnseignementEnjeuxIrd(): EnseignementEnjeuxIrdVo {
     if(this._searchEnseignementEnjeuxIrd==null){
    this._searchEnseignementEnjeuxIrd=new EnseignementEnjeuxIrdVo();
    }
        return this._searchEnseignementEnjeuxIrd;
    }

    set searchEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this._searchEnseignementEnjeuxIrd = value;
       }

}
