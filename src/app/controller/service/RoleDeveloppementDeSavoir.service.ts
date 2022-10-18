import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RoleDeveloppementDeSavoirVo} from '../model/RoleDeveloppementDeSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class RoleDeveloppementDeSavoirService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/roleDeveloppementDeSavoir/';
        })
    }
     private _roleDeveloppementDeSavoirs: Array<RoleDeveloppementDeSavoirVo> ;
     private _selectedRoleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo;
     private _roleDeveloppementDeSavoirSelections: Array<RoleDeveloppementDeSavoirVo>;
     private _createRoleDeveloppementDeSavoirDialog: boolean;
     private _editRoleDeveloppementDeSavoirDialog: boolean;
     private _viewRoleDeveloppementDeSavoirDialog: boolean;
     public editRoleDeveloppementDeSavoir$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRoleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RoleDeveloppementDeSavoirVo>>(this.API);
    }

    public save(): Observable<RoleDeveloppementDeSavoirVo> {
         return this.http.post<RoleDeveloppementDeSavoirVo>(this.API, this.selectedRoleDeveloppementDeSavoir);
    }

    delete(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {
         return this.http.delete<number>(this.API + 'id/' + roleDeveloppementDeSavoir.id);
    }


    public edit(): Observable<RoleDeveloppementDeSavoirVo> {
        return this.http.put<RoleDeveloppementDeSavoirVo>(this.API, this.selectedRoleDeveloppementDeSavoir);
    }


     public findByCriteria(roleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo):Observable<Array<RoleDeveloppementDeSavoirVo>>{
           return this.http.post<Array<RoleDeveloppementDeSavoirVo>>(this.API +'search', roleDeveloppementDeSavoir);
    }

   public findByIdWithAssociatedList(roleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo):Observable<RoleDeveloppementDeSavoirVo>{
         return this.http.get<RoleDeveloppementDeSavoirVo>(this.API + 'detail/id/' +roleDeveloppementDeSavoir.id);
    }

    // getters and setters


    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
    if(this._roleDeveloppementDeSavoirs==null){
    this._roleDeveloppementDeSavoirs=new Array<RoleDeveloppementDeSavoirVo>();
    }
return this._roleDeveloppementDeSavoirs;
       }

    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this._roleDeveloppementDeSavoirs = value;
       }

    get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
    if(this._selectedRoleDeveloppementDeSavoir==null){
    this._selectedRoleDeveloppementDeSavoir=new RoleDeveloppementDeSavoirVo();
    }
           return this._selectedRoleDeveloppementDeSavoir;
       }

    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this._selectedRoleDeveloppementDeSavoir = value;
       }

    get roleDeveloppementDeSavoirSelections(): Array<RoleDeveloppementDeSavoirVo> {
    if(this._roleDeveloppementDeSavoirSelections==null){
    this._roleDeveloppementDeSavoirSelections=new Array<RoleDeveloppementDeSavoirVo>();
    }
        return this._roleDeveloppementDeSavoirSelections;
       }


    set roleDeveloppementDeSavoirSelections(value: Array<RoleDeveloppementDeSavoirVo>) {
        this._roleDeveloppementDeSavoirSelections = value;
       }

    get createRoleDeveloppementDeSavoirDialog(): boolean {
        return this._createRoleDeveloppementDeSavoirDialog;
       }

    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this._createRoleDeveloppementDeSavoirDialog = value;
       }

    get editRoleDeveloppementDeSavoirDialog(): boolean {
        return this._editRoleDeveloppementDeSavoirDialog;
       }

    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this._editRoleDeveloppementDeSavoirDialog = value;
       }

    get viewRoleDeveloppementDeSavoirDialog(): boolean {
        return this._viewRoleDeveloppementDeSavoirDialog;
       }

    set viewRoleDeveloppementDeSavoirDialog(value: boolean) {
        this._viewRoleDeveloppementDeSavoirDialog = value;
       }

     get searchRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
     if(this._searchRoleDeveloppementDeSavoir==null){
    this._searchRoleDeveloppementDeSavoir=new RoleDeveloppementDeSavoirVo();
    }
        return this._searchRoleDeveloppementDeSavoir;
    }

    set searchRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this._searchRoleDeveloppementDeSavoir = value;
       }

}
