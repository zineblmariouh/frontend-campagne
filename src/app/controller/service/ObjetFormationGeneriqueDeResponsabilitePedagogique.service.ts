import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo} from '../model/ObjetFormationGeneriqueDeResponsabilitePedagogique.model';
import {ObjetFormationGeneriqueVo} from '../model/ObjetFormationGenerique.model';
import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';


@Injectable({
  providedIn: 'root'
})
export class ObjetFormationGeneriqueDeResponsabilitePedagogiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/objetFormationGeneriqueDeResponsabilitePedagogique/';
        })
    }
     private _objetFormationGeneriqueDeResponsabilitePedagogiques: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> ;
     private _selectedObjetFormationGeneriqueDeResponsabilitePedagogique: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo;
     private _objetFormationGeneriqueDeResponsabilitePedagogiqueSelections: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>;
     private _createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog: boolean;
     private _editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog: boolean;
     private _viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog: boolean;
     public editObjetFormationGeneriqueDeResponsabilitePedagogique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchObjetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>>(this.API);
    }

    public save(): Observable<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
         return this.http.post<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>(this.API, this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique);
    }

    delete(objetFormationGeneriqueDeResponsabilitePedagogique: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + objetFormationGeneriqueDeResponsabilitePedagogique.id);
    }


    public edit(): Observable<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
        return this.http.put<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>(this.API, this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique);
    }


     public findByCriteria(objetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo):Observable<Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>>{
           return this.http.post<Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>>(this.API +'search', objetFormationGeneriqueDeResponsabilitePedagogique);
    }

   public findByIdWithAssociatedList(objetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo):Observable<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>{
         return this.http.get<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>(this.API + 'detail/id/' +objetFormationGeneriqueDeResponsabilitePedagogique.id);
    }

    // getters and setters


    get objetFormationGeneriqueDeResponsabilitePedagogiques(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
    if(this._objetFormationGeneriqueDeResponsabilitePedagogiques==null){
    this._objetFormationGeneriqueDeResponsabilitePedagogiques=new Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>();
    }
return this._objetFormationGeneriqueDeResponsabilitePedagogiques;
       }

    set objetFormationGeneriqueDeResponsabilitePedagogiques(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this._objetFormationGeneriqueDeResponsabilitePedagogiques = value;
       }

    get selectedObjetFormationGeneriqueDeResponsabilitePedagogique(): ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
    if(this._selectedObjetFormationGeneriqueDeResponsabilitePedagogique==null){
    this._selectedObjetFormationGeneriqueDeResponsabilitePedagogique=new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();
    }
           return this._selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
       }

    set selectedObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this._selectedObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

    get objetFormationGeneriqueDeResponsabilitePedagogiqueSelections(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
    if(this._objetFormationGeneriqueDeResponsabilitePedagogiqueSelections==null){
    this._objetFormationGeneriqueDeResponsabilitePedagogiqueSelections=new Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>();
    }
        return this._objetFormationGeneriqueDeResponsabilitePedagogiqueSelections;
       }


    set objetFormationGeneriqueDeResponsabilitePedagogiqueSelections(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this._objetFormationGeneriqueDeResponsabilitePedagogiqueSelections = value;
       }

    get createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(): boolean {
        return this._createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }

    set createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this._createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = value;
       }

    get editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(): boolean {
        return this._editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }

    set editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this._editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = value;
       }

    get viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(): boolean {
        return this._viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }

    set viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this._viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = value;
       }

     get searchObjetFormationGeneriqueDeResponsabilitePedagogique(): ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
     if(this._searchObjetFormationGeneriqueDeResponsabilitePedagogique==null){
    this._searchObjetFormationGeneriqueDeResponsabilitePedagogique=new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();
    }
        return this._searchObjetFormationGeneriqueDeResponsabilitePedagogique;
    }

    set searchObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this._searchObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

}
