import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabilitePedagogiquePaysVo} from '../model/ResponsabilitePedagogiquePays.model';
import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabilitePedagogiquePaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabilitePedagogiquePays/';
        })
    }
     private _responsabilitePedagogiquePayss: Array<ResponsabilitePedagogiquePaysVo> ;
     private _selectedResponsabilitePedagogiquePays: ResponsabilitePedagogiquePaysVo;
     private _responsabilitePedagogiquePaysSelections: Array<ResponsabilitePedagogiquePaysVo>;
     private _createResponsabilitePedagogiquePaysDialog: boolean;
     private _editResponsabilitePedagogiquePaysDialog: boolean;
     private _viewResponsabilitePedagogiquePaysDialog: boolean;
     public editResponsabilitePedagogiquePays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ResponsabilitePedagogiquePaysVo>>(this.API);
    }

    public save(): Observable<ResponsabilitePedagogiquePaysVo> {
         return this.http.post<ResponsabilitePedagogiquePaysVo>(this.API, this.selectedResponsabilitePedagogiquePays);
    }

    delete(responsabilitePedagogiquePays: ResponsabilitePedagogiquePaysVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabilitePedagogiquePays.id);
    }


    public edit(): Observable<ResponsabilitePedagogiquePaysVo> {
        return this.http.put<ResponsabilitePedagogiquePaysVo>(this.API, this.selectedResponsabilitePedagogiquePays);
    }


     public findByCriteria(responsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo):Observable<Array<ResponsabilitePedagogiquePaysVo>>{
           return this.http.post<Array<ResponsabilitePedagogiquePaysVo>>(this.API +'search', responsabilitePedagogiquePays);
    }

   public findByIdWithAssociatedList(responsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo):Observable<ResponsabilitePedagogiquePaysVo>{
         return this.http.get<ResponsabilitePedagogiquePaysVo>(this.API + 'detail/id/' +responsabilitePedagogiquePays.id);
    }

    // getters and setters


    get responsabilitePedagogiquePayss(): Array<ResponsabilitePedagogiquePaysVo> {
    if(this._responsabilitePedagogiquePayss==null){
    this._responsabilitePedagogiquePayss=new Array<ResponsabilitePedagogiquePaysVo>();
    }
return this._responsabilitePedagogiquePayss;
       }

    set responsabilitePedagogiquePayss(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this._responsabilitePedagogiquePayss = value;
       }

    get selectedResponsabilitePedagogiquePays(): ResponsabilitePedagogiquePaysVo {
    if(this._selectedResponsabilitePedagogiquePays==null){
    this._selectedResponsabilitePedagogiquePays=new ResponsabilitePedagogiquePaysVo();
    }
           return this._selectedResponsabilitePedagogiquePays;
       }

    set selectedResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this._selectedResponsabilitePedagogiquePays = value;
       }

    get responsabilitePedagogiquePaysSelections(): Array<ResponsabilitePedagogiquePaysVo> {
    if(this._responsabilitePedagogiquePaysSelections==null){
    this._responsabilitePedagogiquePaysSelections=new Array<ResponsabilitePedagogiquePaysVo>();
    }
        return this._responsabilitePedagogiquePaysSelections;
       }


    set responsabilitePedagogiquePaysSelections(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this._responsabilitePedagogiquePaysSelections = value;
       }

    get createResponsabilitePedagogiquePaysDialog(): boolean {
        return this._createResponsabilitePedagogiquePaysDialog;
       }

    set createResponsabilitePedagogiquePaysDialog(value: boolean) {
        this._createResponsabilitePedagogiquePaysDialog = value;
       }

    get editResponsabilitePedagogiquePaysDialog(): boolean {
        return this._editResponsabilitePedagogiquePaysDialog;
       }

    set editResponsabilitePedagogiquePaysDialog(value: boolean) {
        this._editResponsabilitePedagogiquePaysDialog = value;
       }

    get viewResponsabilitePedagogiquePaysDialog(): boolean {
        return this._viewResponsabilitePedagogiquePaysDialog;
       }

    set viewResponsabilitePedagogiquePaysDialog(value: boolean) {
        this._viewResponsabilitePedagogiquePaysDialog = value;
       }

     get searchResponsabilitePedagogiquePays(): ResponsabilitePedagogiquePaysVo {
     if(this._searchResponsabilitePedagogiquePays==null){
    this._searchResponsabilitePedagogiquePays=new ResponsabilitePedagogiquePaysVo();
    }
        return this._searchResponsabilitePedagogiquePays;
    }

    set searchResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this._searchResponsabilitePedagogiquePays = value;
       }

}
