import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailPaysVo} from '../model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailPaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetailPays/';
        })
    }
     private _projetActiviteRechercheDetailPayss: Array<ProjetActiviteRechercheDetailPaysVo> ;
     private _selectedProjetActiviteRechercheDetailPays: ProjetActiviteRechercheDetailPaysVo;
     private _projetActiviteRechercheDetailPaysSelections: Array<ProjetActiviteRechercheDetailPaysVo>;
     private _createProjetActiviteRechercheDetailPaysDialog: boolean;
     private _editProjetActiviteRechercheDetailPaysDialog: boolean;
     private _viewProjetActiviteRechercheDetailPaysDialog: boolean;
     public editProjetActiviteRechercheDetailPays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailPaysVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailPaysVo> {
         return this.http.post<ProjetActiviteRechercheDetailPaysVo>(this.API, this.selectedProjetActiviteRechercheDetailPays);
    }

    delete(projetActiviteRechercheDetailPays: ProjetActiviteRechercheDetailPaysVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetailPays.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailPaysVo> {
        return this.http.put<ProjetActiviteRechercheDetailPaysVo>(this.API, this.selectedProjetActiviteRechercheDetailPays);
    }


     public findByCriteria(projetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo):Observable<Array<ProjetActiviteRechercheDetailPaysVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailPaysVo>>(this.API +'search', projetActiviteRechercheDetailPays);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo):Observable<ProjetActiviteRechercheDetailPaysVo>{
         return this.http.get<ProjetActiviteRechercheDetailPaysVo>(this.API + 'detail/id/' +projetActiviteRechercheDetailPays.id);
    }

    // getters and setters


    get projetActiviteRechercheDetailPayss(): Array<ProjetActiviteRechercheDetailPaysVo> {
    if(this._projetActiviteRechercheDetailPayss==null){
    this._projetActiviteRechercheDetailPayss=new Array<ProjetActiviteRechercheDetailPaysVo>();
    }
return this._projetActiviteRechercheDetailPayss;
       }

    set projetActiviteRechercheDetailPayss(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this._projetActiviteRechercheDetailPayss = value;
       }

    get selectedProjetActiviteRechercheDetailPays(): ProjetActiviteRechercheDetailPaysVo {
    if(this._selectedProjetActiviteRechercheDetailPays==null){
    this._selectedProjetActiviteRechercheDetailPays=new ProjetActiviteRechercheDetailPaysVo();
    }
           return this._selectedProjetActiviteRechercheDetailPays;
       }

    set selectedProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this._selectedProjetActiviteRechercheDetailPays = value;
       }

    get projetActiviteRechercheDetailPaysSelections(): Array<ProjetActiviteRechercheDetailPaysVo> {
    if(this._projetActiviteRechercheDetailPaysSelections==null){
    this._projetActiviteRechercheDetailPaysSelections=new Array<ProjetActiviteRechercheDetailPaysVo>();
    }
        return this._projetActiviteRechercheDetailPaysSelections;
       }


    set projetActiviteRechercheDetailPaysSelections(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this._projetActiviteRechercheDetailPaysSelections = value;
       }

    get createProjetActiviteRechercheDetailPaysDialog(): boolean {
        return this._createProjetActiviteRechercheDetailPaysDialog;
       }

    set createProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailPaysDialog = value;
       }

    get editProjetActiviteRechercheDetailPaysDialog(): boolean {
        return this._editProjetActiviteRechercheDetailPaysDialog;
       }

    set editProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailPaysDialog = value;
       }

    get viewProjetActiviteRechercheDetailPaysDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailPaysDialog;
       }

    set viewProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailPaysDialog = value;
       }

     get searchProjetActiviteRechercheDetailPays(): ProjetActiviteRechercheDetailPaysVo {
     if(this._searchProjetActiviteRechercheDetailPays==null){
    this._searchProjetActiviteRechercheDetailPays=new ProjetActiviteRechercheDetailPaysVo();
    }
        return this._searchProjetActiviteRechercheDetailPays;
    }

    set searchProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this._searchProjetActiviteRechercheDetailPays = value;
       }

}
