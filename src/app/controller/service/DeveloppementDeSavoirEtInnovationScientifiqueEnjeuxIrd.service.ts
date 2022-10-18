import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo;
     private _developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
    }

    delete(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo):Observable<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds==null){
    this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds=new Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
       }

    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(): DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd=new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections==null){
    this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections;
       }


    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(): DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd=new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

}
