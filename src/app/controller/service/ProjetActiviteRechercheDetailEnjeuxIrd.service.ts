import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetailEnjeuxIrd/';
        })
    }
     private _projetActiviteRechercheDetailEnjeuxIrds: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> ;
     private _selectedProjetActiviteRechercheDetailEnjeuxIrd: ProjetActiviteRechercheDetailEnjeuxIrdVo;
     private _projetActiviteRechercheDetailEnjeuxIrdSelections: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>;
     private _createProjetActiviteRechercheDetailEnjeuxIrdDialog: boolean;
     private _editProjetActiviteRechercheDetailEnjeuxIrdDialog: boolean;
     private _viewProjetActiviteRechercheDetailEnjeuxIrdDialog: boolean;
     public editProjetActiviteRechercheDetailEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
         return this.http.post<ProjetActiviteRechercheDetailEnjeuxIrdVo>(this.API, this.selectedProjetActiviteRechercheDetailEnjeuxIrd);
    }

    delete(projetActiviteRechercheDetailEnjeuxIrd: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetailEnjeuxIrd.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
        return this.http.put<ProjetActiviteRechercheDetailEnjeuxIrdVo>(this.API, this.selectedProjetActiviteRechercheDetailEnjeuxIrd);
    }


     public findByCriteria(projetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo):Observable<Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>>(this.API +'search', projetActiviteRechercheDetailEnjeuxIrd);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo):Observable<ProjetActiviteRechercheDetailEnjeuxIrdVo>{
         return this.http.get<ProjetActiviteRechercheDetailEnjeuxIrdVo>(this.API + 'detail/id/' +projetActiviteRechercheDetailEnjeuxIrd.id);
    }

    // getters and setters


    get projetActiviteRechercheDetailEnjeuxIrds(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    if(this._projetActiviteRechercheDetailEnjeuxIrds==null){
    this._projetActiviteRechercheDetailEnjeuxIrds=new Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>();
    }
return this._projetActiviteRechercheDetailEnjeuxIrds;
       }

    set projetActiviteRechercheDetailEnjeuxIrds(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this._projetActiviteRechercheDetailEnjeuxIrds = value;
       }

    get selectedProjetActiviteRechercheDetailEnjeuxIrd(): ProjetActiviteRechercheDetailEnjeuxIrdVo {
    if(this._selectedProjetActiviteRechercheDetailEnjeuxIrd==null){
    this._selectedProjetActiviteRechercheDetailEnjeuxIrd=new ProjetActiviteRechercheDetailEnjeuxIrdVo();
    }
           return this._selectedProjetActiviteRechercheDetailEnjeuxIrd;
       }

    set selectedProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this._selectedProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

    get projetActiviteRechercheDetailEnjeuxIrdSelections(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    if(this._projetActiviteRechercheDetailEnjeuxIrdSelections==null){
    this._projetActiviteRechercheDetailEnjeuxIrdSelections=new Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>();
    }
        return this._projetActiviteRechercheDetailEnjeuxIrdSelections;
       }


    set projetActiviteRechercheDetailEnjeuxIrdSelections(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this._projetActiviteRechercheDetailEnjeuxIrdSelections = value;
       }

    get createProjetActiviteRechercheDetailEnjeuxIrdDialog(): boolean {
        return this._createProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }

    set createProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailEnjeuxIrdDialog = value;
       }

    get editProjetActiviteRechercheDetailEnjeuxIrdDialog(): boolean {
        return this._editProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }

    set editProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailEnjeuxIrdDialog = value;
       }

    get viewProjetActiviteRechercheDetailEnjeuxIrdDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }

    set viewProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailEnjeuxIrdDialog = value;
       }

     get searchProjetActiviteRechercheDetailEnjeuxIrd(): ProjetActiviteRechercheDetailEnjeuxIrdVo {
     if(this._searchProjetActiviteRechercheDetailEnjeuxIrd==null){
    this._searchProjetActiviteRechercheDetailEnjeuxIrd=new ProjetActiviteRechercheDetailEnjeuxIrdVo();
    }
        return this._searchProjetActiviteRechercheDetailEnjeuxIrd;
    }

    set searchProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this._searchProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

}
