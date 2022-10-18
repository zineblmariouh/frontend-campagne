import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetailInstrumentIrd/';
        })
    }
     private _projetActiviteRechercheDetailInstrumentIrds: Array<ProjetActiviteRechercheDetailInstrumentIrdVo> ;
     private _selectedProjetActiviteRechercheDetailInstrumentIrd: ProjetActiviteRechercheDetailInstrumentIrdVo;
     private _projetActiviteRechercheDetailInstrumentIrdSelections: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>;
     private _createProjetActiviteRechercheDetailInstrumentIrdDialog: boolean;
     private _editProjetActiviteRechercheDetailInstrumentIrdDialog: boolean;
     private _viewProjetActiviteRechercheDetailInstrumentIrdDialog: boolean;
     public editProjetActiviteRechercheDetailInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailInstrumentIrdVo> {
         return this.http.post<ProjetActiviteRechercheDetailInstrumentIrdVo>(this.API, this.selectedProjetActiviteRechercheDetailInstrumentIrd);
    }

    delete(projetActiviteRechercheDetailInstrumentIrd: ProjetActiviteRechercheDetailInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetailInstrumentIrd.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailInstrumentIrdVo> {
        return this.http.put<ProjetActiviteRechercheDetailInstrumentIrdVo>(this.API, this.selectedProjetActiviteRechercheDetailInstrumentIrd);
    }


     public findByCriteria(projetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo):Observable<Array<ProjetActiviteRechercheDetailInstrumentIrdVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailInstrumentIrdVo>>(this.API +'search', projetActiviteRechercheDetailInstrumentIrd);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo):Observable<ProjetActiviteRechercheDetailInstrumentIrdVo>{
         return this.http.get<ProjetActiviteRechercheDetailInstrumentIrdVo>(this.API + 'detail/id/' +projetActiviteRechercheDetailInstrumentIrd.id);
    }

    // getters and setters


    get projetActiviteRechercheDetailInstrumentIrds(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    if(this._projetActiviteRechercheDetailInstrumentIrds==null){
    this._projetActiviteRechercheDetailInstrumentIrds=new Array<ProjetActiviteRechercheDetailInstrumentIrdVo>();
    }
return this._projetActiviteRechercheDetailInstrumentIrds;
       }

    set projetActiviteRechercheDetailInstrumentIrds(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this._projetActiviteRechercheDetailInstrumentIrds = value;
       }

    get selectedProjetActiviteRechercheDetailInstrumentIrd(): ProjetActiviteRechercheDetailInstrumentIrdVo {
    if(this._selectedProjetActiviteRechercheDetailInstrumentIrd==null){
    this._selectedProjetActiviteRechercheDetailInstrumentIrd=new ProjetActiviteRechercheDetailInstrumentIrdVo();
    }
           return this._selectedProjetActiviteRechercheDetailInstrumentIrd;
       }

    set selectedProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this._selectedProjetActiviteRechercheDetailInstrumentIrd = value;
       }

    get projetActiviteRechercheDetailInstrumentIrdSelections(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    if(this._projetActiviteRechercheDetailInstrumentIrdSelections==null){
    this._projetActiviteRechercheDetailInstrumentIrdSelections=new Array<ProjetActiviteRechercheDetailInstrumentIrdVo>();
    }
        return this._projetActiviteRechercheDetailInstrumentIrdSelections;
       }


    set projetActiviteRechercheDetailInstrumentIrdSelections(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this._projetActiviteRechercheDetailInstrumentIrdSelections = value;
       }

    get createProjetActiviteRechercheDetailInstrumentIrdDialog(): boolean {
        return this._createProjetActiviteRechercheDetailInstrumentIrdDialog;
       }

    set createProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailInstrumentIrdDialog = value;
       }

    get editProjetActiviteRechercheDetailInstrumentIrdDialog(): boolean {
        return this._editProjetActiviteRechercheDetailInstrumentIrdDialog;
       }

    set editProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailInstrumentIrdDialog = value;
       }

    get viewProjetActiviteRechercheDetailInstrumentIrdDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailInstrumentIrdDialog;
       }

    set viewProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailInstrumentIrdDialog = value;
       }

     get searchProjetActiviteRechercheDetailInstrumentIrd(): ProjetActiviteRechercheDetailInstrumentIrdVo {
     if(this._searchProjetActiviteRechercheDetailInstrumentIrd==null){
    this._searchProjetActiviteRechercheDetailInstrumentIrd=new ProjetActiviteRechercheDetailInstrumentIrdVo();
    }
        return this._searchProjetActiviteRechercheDetailInstrumentIrd;
    }

    set searchProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this._searchProjetActiviteRechercheDetailInstrumentIrd = value;
       }

}
