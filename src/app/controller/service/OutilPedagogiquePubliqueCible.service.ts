import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiquePubliqueCibleVo} from '../model/OutilPedagogiquePubliqueCible.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {PubliqueCibleVo} from '../model/PubliqueCible.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiquePubliqueCibleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiquePubliqueCible/';
        })
    }
     private _outilPedagogiquePubliqueCibles: Array<OutilPedagogiquePubliqueCibleVo> ;
     private _selectedOutilPedagogiquePubliqueCible: OutilPedagogiquePubliqueCibleVo;
     private _outilPedagogiquePubliqueCibleSelections: Array<OutilPedagogiquePubliqueCibleVo>;
     private _createOutilPedagogiquePubliqueCibleDialog: boolean;
     private _editOutilPedagogiquePubliqueCibleDialog: boolean;
     private _viewOutilPedagogiquePubliqueCibleDialog: boolean;
     public editOutilPedagogiquePubliqueCible$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiquePubliqueCibleVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiquePubliqueCibleVo> {
         return this.http.post<OutilPedagogiquePubliqueCibleVo>(this.API, this.selectedOutilPedagogiquePubliqueCible);
    }

    delete(outilPedagogiquePubliqueCible: OutilPedagogiquePubliqueCibleVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiquePubliqueCible.id);
    }


    public edit(): Observable<OutilPedagogiquePubliqueCibleVo> {
        return this.http.put<OutilPedagogiquePubliqueCibleVo>(this.API, this.selectedOutilPedagogiquePubliqueCible);
    }


     public findByCriteria(outilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo):Observable<Array<OutilPedagogiquePubliqueCibleVo>>{
           return this.http.post<Array<OutilPedagogiquePubliqueCibleVo>>(this.API +'search', outilPedagogiquePubliqueCible);
    }

   public findByIdWithAssociatedList(outilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo):Observable<OutilPedagogiquePubliqueCibleVo>{
         return this.http.get<OutilPedagogiquePubliqueCibleVo>(this.API + 'detail/id/' +outilPedagogiquePubliqueCible.id);
    }

    // getters and setters


    get outilPedagogiquePubliqueCibles(): Array<OutilPedagogiquePubliqueCibleVo> {
    if(this._outilPedagogiquePubliqueCibles==null){
    this._outilPedagogiquePubliqueCibles=new Array<OutilPedagogiquePubliqueCibleVo>();
    }
return this._outilPedagogiquePubliqueCibles;
       }

    set outilPedagogiquePubliqueCibles(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this._outilPedagogiquePubliqueCibles = value;
       }

    get selectedOutilPedagogiquePubliqueCible(): OutilPedagogiquePubliqueCibleVo {
    if(this._selectedOutilPedagogiquePubliqueCible==null){
    this._selectedOutilPedagogiquePubliqueCible=new OutilPedagogiquePubliqueCibleVo();
    }
           return this._selectedOutilPedagogiquePubliqueCible;
       }

    set selectedOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this._selectedOutilPedagogiquePubliqueCible = value;
       }

    get outilPedagogiquePubliqueCibleSelections(): Array<OutilPedagogiquePubliqueCibleVo> {
    if(this._outilPedagogiquePubliqueCibleSelections==null){
    this._outilPedagogiquePubliqueCibleSelections=new Array<OutilPedagogiquePubliqueCibleVo>();
    }
        return this._outilPedagogiquePubliqueCibleSelections;
       }


    set outilPedagogiquePubliqueCibleSelections(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this._outilPedagogiquePubliqueCibleSelections = value;
       }

    get createOutilPedagogiquePubliqueCibleDialog(): boolean {
        return this._createOutilPedagogiquePubliqueCibleDialog;
       }

    set createOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this._createOutilPedagogiquePubliqueCibleDialog = value;
       }

    get editOutilPedagogiquePubliqueCibleDialog(): boolean {
        return this._editOutilPedagogiquePubliqueCibleDialog;
       }

    set editOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this._editOutilPedagogiquePubliqueCibleDialog = value;
       }

    get viewOutilPedagogiquePubliqueCibleDialog(): boolean {
        return this._viewOutilPedagogiquePubliqueCibleDialog;
       }

    set viewOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this._viewOutilPedagogiquePubliqueCibleDialog = value;
       }

     get searchOutilPedagogiquePubliqueCible(): OutilPedagogiquePubliqueCibleVo {
     if(this._searchOutilPedagogiquePubliqueCible==null){
    this._searchOutilPedagogiquePubliqueCible=new OutilPedagogiquePubliqueCibleVo();
    }
        return this._searchOutilPedagogiquePubliqueCible;
    }

    set searchOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this._searchOutilPedagogiquePubliqueCible = value;
       }

}
