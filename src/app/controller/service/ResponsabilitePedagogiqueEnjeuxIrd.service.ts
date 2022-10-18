import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';
import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabilitePedagogiqueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabilitePedagogiqueEnjeuxIrd/';
        })
    }
     private _responsabilitePedagogiqueEnjeuxIrds: Array<ResponsabilitePedagogiqueEnjeuxIrdVo> ;
     private _selectedResponsabilitePedagogiqueEnjeuxIrd: ResponsabilitePedagogiqueEnjeuxIrdVo;
     private _responsabilitePedagogiqueEnjeuxIrdSelections: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>;
     private _createResponsabilitePedagogiqueEnjeuxIrdDialog: boolean;
     private _editResponsabilitePedagogiqueEnjeuxIrdDialog: boolean;
     private _viewResponsabilitePedagogiqueEnjeuxIrdDialog: boolean;
     public editResponsabilitePedagogiqueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ResponsabilitePedagogiqueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<ResponsabilitePedagogiqueEnjeuxIrdVo> {
         return this.http.post<ResponsabilitePedagogiqueEnjeuxIrdVo>(this.API, this.selectedResponsabilitePedagogiqueEnjeuxIrd);
    }

    delete(responsabilitePedagogiqueEnjeuxIrd: ResponsabilitePedagogiqueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabilitePedagogiqueEnjeuxIrd.id);
    }


    public edit(): Observable<ResponsabilitePedagogiqueEnjeuxIrdVo> {
        return this.http.put<ResponsabilitePedagogiqueEnjeuxIrdVo>(this.API, this.selectedResponsabilitePedagogiqueEnjeuxIrd);
    }


     public findByCriteria(responsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo):Observable<Array<ResponsabilitePedagogiqueEnjeuxIrdVo>>{
           return this.http.post<Array<ResponsabilitePedagogiqueEnjeuxIrdVo>>(this.API +'search', responsabilitePedagogiqueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(responsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo):Observable<ResponsabilitePedagogiqueEnjeuxIrdVo>{
         return this.http.get<ResponsabilitePedagogiqueEnjeuxIrdVo>(this.API + 'detail/id/' +responsabilitePedagogiqueEnjeuxIrd.id);
    }

    // getters and setters


    get responsabilitePedagogiqueEnjeuxIrds(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    if(this._responsabilitePedagogiqueEnjeuxIrds==null){
    this._responsabilitePedagogiqueEnjeuxIrds=new Array<ResponsabilitePedagogiqueEnjeuxIrdVo>();
    }
return this._responsabilitePedagogiqueEnjeuxIrds;
       }

    set responsabilitePedagogiqueEnjeuxIrds(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this._responsabilitePedagogiqueEnjeuxIrds = value;
       }

    get selectedResponsabilitePedagogiqueEnjeuxIrd(): ResponsabilitePedagogiqueEnjeuxIrdVo {
    if(this._selectedResponsabilitePedagogiqueEnjeuxIrd==null){
    this._selectedResponsabilitePedagogiqueEnjeuxIrd=new ResponsabilitePedagogiqueEnjeuxIrdVo();
    }
           return this._selectedResponsabilitePedagogiqueEnjeuxIrd;
       }

    set selectedResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this._selectedResponsabilitePedagogiqueEnjeuxIrd = value;
       }

    get responsabilitePedagogiqueEnjeuxIrdSelections(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    if(this._responsabilitePedagogiqueEnjeuxIrdSelections==null){
    this._responsabilitePedagogiqueEnjeuxIrdSelections=new Array<ResponsabilitePedagogiqueEnjeuxIrdVo>();
    }
        return this._responsabilitePedagogiqueEnjeuxIrdSelections;
       }


    set responsabilitePedagogiqueEnjeuxIrdSelections(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this._responsabilitePedagogiqueEnjeuxIrdSelections = value;
       }

    get createResponsabilitePedagogiqueEnjeuxIrdDialog(): boolean {
        return this._createResponsabilitePedagogiqueEnjeuxIrdDialog;
       }

    set createResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._createResponsabilitePedagogiqueEnjeuxIrdDialog = value;
       }

    get editResponsabilitePedagogiqueEnjeuxIrdDialog(): boolean {
        return this._editResponsabilitePedagogiqueEnjeuxIrdDialog;
       }

    set editResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._editResponsabilitePedagogiqueEnjeuxIrdDialog = value;
       }

    get viewResponsabilitePedagogiqueEnjeuxIrdDialog(): boolean {
        return this._viewResponsabilitePedagogiqueEnjeuxIrdDialog;
       }

    set viewResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._viewResponsabilitePedagogiqueEnjeuxIrdDialog = value;
       }

     get searchResponsabilitePedagogiqueEnjeuxIrd(): ResponsabilitePedagogiqueEnjeuxIrdVo {
     if(this._searchResponsabilitePedagogiqueEnjeuxIrd==null){
    this._searchResponsabilitePedagogiqueEnjeuxIrd=new ResponsabilitePedagogiqueEnjeuxIrdVo();
    }
        return this._searchResponsabilitePedagogiqueEnjeuxIrd;
    }

    set searchResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this._searchResponsabilitePedagogiqueEnjeuxIrd = value;
       }

}
