import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabilitePedagogiqueEtablissementVo} from '../model/ResponsabilitePedagogiqueEtablissement.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabilitePedagogiqueEtablissementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabilitePedagogiqueEtablissement/';
        })
    }
     private _responsabilitePedagogiqueEtablissements: Array<ResponsabilitePedagogiqueEtablissementVo> ;
     private _selectedResponsabilitePedagogiqueEtablissement: ResponsabilitePedagogiqueEtablissementVo;
     private _responsabilitePedagogiqueEtablissementSelections: Array<ResponsabilitePedagogiqueEtablissementVo>;
     private _createResponsabilitePedagogiqueEtablissementDialog: boolean;
     private _editResponsabilitePedagogiqueEtablissementDialog: boolean;
     private _viewResponsabilitePedagogiqueEtablissementDialog: boolean;
     public editResponsabilitePedagogiqueEtablissement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ResponsabilitePedagogiqueEtablissementVo>>(this.API);
    }

    public save(): Observable<ResponsabilitePedagogiqueEtablissementVo> {
         return this.http.post<ResponsabilitePedagogiqueEtablissementVo>(this.API, this.selectedResponsabilitePedagogiqueEtablissement);
    }

    delete(responsabilitePedagogiqueEtablissement: ResponsabilitePedagogiqueEtablissementVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabilitePedagogiqueEtablissement.id);
    }


    public edit(): Observable<ResponsabilitePedagogiqueEtablissementVo> {
        return this.http.put<ResponsabilitePedagogiqueEtablissementVo>(this.API, this.selectedResponsabilitePedagogiqueEtablissement);
    }


     public findByCriteria(responsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo):Observable<Array<ResponsabilitePedagogiqueEtablissementVo>>{
           return this.http.post<Array<ResponsabilitePedagogiqueEtablissementVo>>(this.API +'search', responsabilitePedagogiqueEtablissement);
    }

   public findByIdWithAssociatedList(responsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo):Observable<ResponsabilitePedagogiqueEtablissementVo>{
         return this.http.get<ResponsabilitePedagogiqueEtablissementVo>(this.API + 'detail/id/' +responsabilitePedagogiqueEtablissement.id);
    }

    // getters and setters


    get responsabilitePedagogiqueEtablissements(): Array<ResponsabilitePedagogiqueEtablissementVo> {
    if(this._responsabilitePedagogiqueEtablissements==null){
    this._responsabilitePedagogiqueEtablissements=new Array<ResponsabilitePedagogiqueEtablissementVo>();
    }
return this._responsabilitePedagogiqueEtablissements;
       }

    set responsabilitePedagogiqueEtablissements(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this._responsabilitePedagogiqueEtablissements = value;
       }

    get selectedResponsabilitePedagogiqueEtablissement(): ResponsabilitePedagogiqueEtablissementVo {
    if(this._selectedResponsabilitePedagogiqueEtablissement==null){
    this._selectedResponsabilitePedagogiqueEtablissement=new ResponsabilitePedagogiqueEtablissementVo();
    }
           return this._selectedResponsabilitePedagogiqueEtablissement;
       }

    set selectedResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this._selectedResponsabilitePedagogiqueEtablissement = value;
       }

    get responsabilitePedagogiqueEtablissementSelections(): Array<ResponsabilitePedagogiqueEtablissementVo> {
    if(this._responsabilitePedagogiqueEtablissementSelections==null){
    this._responsabilitePedagogiqueEtablissementSelections=new Array<ResponsabilitePedagogiqueEtablissementVo>();
    }
        return this._responsabilitePedagogiqueEtablissementSelections;
       }


    set responsabilitePedagogiqueEtablissementSelections(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this._responsabilitePedagogiqueEtablissementSelections = value;
       }

    get createResponsabilitePedagogiqueEtablissementDialog(): boolean {
        return this._createResponsabilitePedagogiqueEtablissementDialog;
       }

    set createResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this._createResponsabilitePedagogiqueEtablissementDialog = value;
       }

    get editResponsabilitePedagogiqueEtablissementDialog(): boolean {
        return this._editResponsabilitePedagogiqueEtablissementDialog;
       }

    set editResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this._editResponsabilitePedagogiqueEtablissementDialog = value;
       }

    get viewResponsabilitePedagogiqueEtablissementDialog(): boolean {
        return this._viewResponsabilitePedagogiqueEtablissementDialog;
       }

    set viewResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this._viewResponsabilitePedagogiqueEtablissementDialog = value;
       }

     get searchResponsabilitePedagogiqueEtablissement(): ResponsabilitePedagogiqueEtablissementVo {
     if(this._searchResponsabilitePedagogiqueEtablissement==null){
    this._searchResponsabilitePedagogiqueEtablissement=new ResponsabilitePedagogiqueEtablissementVo();
    }
        return this._searchResponsabilitePedagogiqueEtablissement;
    }

    set searchResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this._searchResponsabilitePedagogiqueEtablissement = value;
       }

}
