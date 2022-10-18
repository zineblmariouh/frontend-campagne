import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DistinctionEtablissementPaysVo} from '../model/DistinctionEtablissementPays.model';
import {DistinctionVo} from '../model/Distinction.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class DistinctionEtablissementPaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/distinctionEtablissementPays/';
        })
    }
     private _distinctionEtablissementPayss: Array<DistinctionEtablissementPaysVo> ;
     private _selectedDistinctionEtablissementPays: DistinctionEtablissementPaysVo;
     private _distinctionEtablissementPaysSelections: Array<DistinctionEtablissementPaysVo>;
     private _createDistinctionEtablissementPaysDialog: boolean;
     private _editDistinctionEtablissementPaysDialog: boolean;
     private _viewDistinctionEtablissementPaysDialog: boolean;
     public editDistinctionEtablissementPays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDistinctionEtablissementPays:DistinctionEtablissementPaysVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DistinctionEtablissementPaysVo>>(this.API);
    }

    public save(): Observable<DistinctionEtablissementPaysVo> {
         return this.http.post<DistinctionEtablissementPaysVo>(this.API, this.selectedDistinctionEtablissementPays);
    }

    delete(distinctionEtablissementPays: DistinctionEtablissementPaysVo) {
         return this.http.delete<number>(this.API + 'id/' + distinctionEtablissementPays.id);
    }


    public edit(): Observable<DistinctionEtablissementPaysVo> {
        return this.http.put<DistinctionEtablissementPaysVo>(this.API, this.selectedDistinctionEtablissementPays);
    }


     public findByCriteria(distinctionEtablissementPays:DistinctionEtablissementPaysVo):Observable<Array<DistinctionEtablissementPaysVo>>{
           return this.http.post<Array<DistinctionEtablissementPaysVo>>(this.API +'search', distinctionEtablissementPays);
    }

   public findByIdWithAssociatedList(distinctionEtablissementPays:DistinctionEtablissementPaysVo):Observable<DistinctionEtablissementPaysVo>{
         return this.http.get<DistinctionEtablissementPaysVo>(this.API + 'detail/id/' +distinctionEtablissementPays.id);
    }

    // getters and setters


    get distinctionEtablissementPayss(): Array<DistinctionEtablissementPaysVo> {
    if(this._distinctionEtablissementPayss==null){
    this._distinctionEtablissementPayss=new Array<DistinctionEtablissementPaysVo>();
    }
return this._distinctionEtablissementPayss;
       }

    set distinctionEtablissementPayss(value: Array<DistinctionEtablissementPaysVo>) {
        this._distinctionEtablissementPayss = value;
       }

    get selectedDistinctionEtablissementPays(): DistinctionEtablissementPaysVo {
    if(this._selectedDistinctionEtablissementPays==null){
    this._selectedDistinctionEtablissementPays=new DistinctionEtablissementPaysVo();
    }
           return this._selectedDistinctionEtablissementPays;
       }

    set selectedDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this._selectedDistinctionEtablissementPays = value;
       }

    get distinctionEtablissementPaysSelections(): Array<DistinctionEtablissementPaysVo> {
    if(this._distinctionEtablissementPaysSelections==null){
    this._distinctionEtablissementPaysSelections=new Array<DistinctionEtablissementPaysVo>();
    }
        return this._distinctionEtablissementPaysSelections;
       }


    set distinctionEtablissementPaysSelections(value: Array<DistinctionEtablissementPaysVo>) {
        this._distinctionEtablissementPaysSelections = value;
       }

    get createDistinctionEtablissementPaysDialog(): boolean {
        return this._createDistinctionEtablissementPaysDialog;
       }

    set createDistinctionEtablissementPaysDialog(value: boolean) {
        this._createDistinctionEtablissementPaysDialog = value;
       }

    get editDistinctionEtablissementPaysDialog(): boolean {
        return this._editDistinctionEtablissementPaysDialog;
       }

    set editDistinctionEtablissementPaysDialog(value: boolean) {
        this._editDistinctionEtablissementPaysDialog = value;
       }

    get viewDistinctionEtablissementPaysDialog(): boolean {
        return this._viewDistinctionEtablissementPaysDialog;
       }

    set viewDistinctionEtablissementPaysDialog(value: boolean) {
        this._viewDistinctionEtablissementPaysDialog = value;
       }

     get searchDistinctionEtablissementPays(): DistinctionEtablissementPaysVo {
     if(this._searchDistinctionEtablissementPays==null){
    this._searchDistinctionEtablissementPays=new DistinctionEtablissementPaysVo();
    }
        return this._searchDistinctionEtablissementPays;
    }

    set searchDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this._searchDistinctionEtablissementPays = value;
       }

}
