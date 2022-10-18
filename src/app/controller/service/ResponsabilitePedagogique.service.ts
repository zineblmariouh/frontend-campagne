import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';
import {EnseignementEtFormationVo} from '../model/EnseignementEtFormation.model';
import {StatusCursusVo} from '../model/StatusCursus.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {NiveauResponsabilitePedagogiqueVo} from '../model/NiveauResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueEtablissementVo} from '../model/ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiquePaysVo} from '../model/ResponsabilitePedagogiquePays.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabilitePedagogiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabilitePedagogique/';
        })
    }
     private _responsabilitePedagogiques: Array<ResponsabilitePedagogiqueVo> ;
     private _selectedResponsabilitePedagogique: ResponsabilitePedagogiqueVo;
     private _responsabilitePedagogiqueSelections: Array<ResponsabilitePedagogiqueVo>;
     private _createResponsabilitePedagogiqueDialog: boolean;
     private _editResponsabilitePedagogiqueDialog: boolean;
     private _viewResponsabilitePedagogiqueDialog: boolean;
     public editResponsabilitePedagogique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabilitePedagogique:ResponsabilitePedagogiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ResponsabilitePedagogiqueVo>>(this.API);
    }

    public save(): Observable<ResponsabilitePedagogiqueVo> {
         return this.http.post<ResponsabilitePedagogiqueVo>(this.API, this.selectedResponsabilitePedagogique);
    }

    delete(responsabilitePedagogique: ResponsabilitePedagogiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabilitePedagogique.id);
    }


    public edit(): Observable<ResponsabilitePedagogiqueVo> {
        return this.http.put<ResponsabilitePedagogiqueVo>(this.API, this.selectedResponsabilitePedagogique);
    }


     public findByCriteria(responsabilitePedagogique:ResponsabilitePedagogiqueVo):Observable<Array<ResponsabilitePedagogiqueVo>>{
           return this.http.post<Array<ResponsabilitePedagogiqueVo>>(this.API +'search', responsabilitePedagogique);
    }

   public findByIdWithAssociatedList(responsabilitePedagogique:ResponsabilitePedagogiqueVo):Observable<ResponsabilitePedagogiqueVo>{
         return this.http.get<ResponsabilitePedagogiqueVo>(this.API + 'detail/id/' +responsabilitePedagogique.id);
    }

    // getters and setters


    get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
    if(this._responsabilitePedagogiques==null){
    this._responsabilitePedagogiques=new Array<ResponsabilitePedagogiqueVo>();
    }
return this._responsabilitePedagogiques;
       }

    set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this._responsabilitePedagogiques = value;
       }

    get selectedResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
    if(this._selectedResponsabilitePedagogique==null){
    this._selectedResponsabilitePedagogique=new ResponsabilitePedagogiqueVo();
    }
           return this._selectedResponsabilitePedagogique;
       }

    set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this._selectedResponsabilitePedagogique = value;
       }

    get responsabilitePedagogiqueSelections(): Array<ResponsabilitePedagogiqueVo> {
    if(this._responsabilitePedagogiqueSelections==null){
    this._responsabilitePedagogiqueSelections=new Array<ResponsabilitePedagogiqueVo>();
    }
        return this._responsabilitePedagogiqueSelections;
       }


    set responsabilitePedagogiqueSelections(value: Array<ResponsabilitePedagogiqueVo>) {
        this._responsabilitePedagogiqueSelections = value;
       }

    get createResponsabilitePedagogiqueDialog(): boolean {
        return this._createResponsabilitePedagogiqueDialog;
       }

    set createResponsabilitePedagogiqueDialog(value: boolean) {
        this._createResponsabilitePedagogiqueDialog = value;
       }

    get editResponsabilitePedagogiqueDialog(): boolean {
        return this._editResponsabilitePedagogiqueDialog;
       }

    set editResponsabilitePedagogiqueDialog(value: boolean) {
        this._editResponsabilitePedagogiqueDialog = value;
       }

    get viewResponsabilitePedagogiqueDialog(): boolean {
        return this._viewResponsabilitePedagogiqueDialog;
       }

    set viewResponsabilitePedagogiqueDialog(value: boolean) {
        this._viewResponsabilitePedagogiqueDialog = value;
       }

     get searchResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
     if(this._searchResponsabilitePedagogique==null){
    this._searchResponsabilitePedagogique=new ResponsabilitePedagogiqueVo();
    }
        return this._searchResponsabilitePedagogique;
    }

    set searchResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this._searchResponsabilitePedagogique = value;
       }

}
