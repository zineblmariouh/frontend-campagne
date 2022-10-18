import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {VieInstitutionnelleDetailEtablissementVo} from '../model/VieInstitutionnelleDetailEtablissement.model';
import {VieInstitutionnelleDetailVo} from '../model/VieInstitutionnelleDetail.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class VieInstitutionnelleDetailEtablissementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/vieInstitutionnelleDetailEtablissement/';
        })
    }
     private _vieInstitutionnelleDetailEtablissements: Array<VieInstitutionnelleDetailEtablissementVo> ;
     private _selectedVieInstitutionnelleDetailEtablissement: VieInstitutionnelleDetailEtablissementVo;
     private _vieInstitutionnelleDetailEtablissementSelections: Array<VieInstitutionnelleDetailEtablissementVo>;
     private _createVieInstitutionnelleDetailEtablissementDialog: boolean;
     private _editVieInstitutionnelleDetailEtablissementDialog: boolean;
     private _viewVieInstitutionnelleDetailEtablissementDialog: boolean;
     public editVieInstitutionnelleDetailEtablissement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchVieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<VieInstitutionnelleDetailEtablissementVo>>(this.API);
    }

    public save(): Observable<VieInstitutionnelleDetailEtablissementVo> {
         return this.http.post<VieInstitutionnelleDetailEtablissementVo>(this.API, this.selectedVieInstitutionnelleDetailEtablissement);
    }

    delete(vieInstitutionnelleDetailEtablissement: VieInstitutionnelleDetailEtablissementVo) {
         return this.http.delete<number>(this.API + 'id/' + vieInstitutionnelleDetailEtablissement.id);
    }


    public edit(): Observable<VieInstitutionnelleDetailEtablissementVo> {
        return this.http.put<VieInstitutionnelleDetailEtablissementVo>(this.API, this.selectedVieInstitutionnelleDetailEtablissement);
    }


     public findByCriteria(vieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo):Observable<Array<VieInstitutionnelleDetailEtablissementVo>>{
           return this.http.post<Array<VieInstitutionnelleDetailEtablissementVo>>(this.API +'search', vieInstitutionnelleDetailEtablissement);
    }

   public findByIdWithAssociatedList(vieInstitutionnelleDetailEtablissement:VieInstitutionnelleDetailEtablissementVo):Observable<VieInstitutionnelleDetailEtablissementVo>{
         return this.http.get<VieInstitutionnelleDetailEtablissementVo>(this.API + 'detail/id/' +vieInstitutionnelleDetailEtablissement.id);
    }

    // getters and setters


    get vieInstitutionnelleDetailEtablissements(): Array<VieInstitutionnelleDetailEtablissementVo> {
    if(this._vieInstitutionnelleDetailEtablissements==null){
    this._vieInstitutionnelleDetailEtablissements=new Array<VieInstitutionnelleDetailEtablissementVo>();
    }
return this._vieInstitutionnelleDetailEtablissements;
       }

    set vieInstitutionnelleDetailEtablissements(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this._vieInstitutionnelleDetailEtablissements = value;
       }

    get selectedVieInstitutionnelleDetailEtablissement(): VieInstitutionnelleDetailEtablissementVo {
    if(this._selectedVieInstitutionnelleDetailEtablissement==null){
    this._selectedVieInstitutionnelleDetailEtablissement=new VieInstitutionnelleDetailEtablissementVo();
    }
           return this._selectedVieInstitutionnelleDetailEtablissement;
       }

    set selectedVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this._selectedVieInstitutionnelleDetailEtablissement = value;
       }

    get vieInstitutionnelleDetailEtablissementSelections(): Array<VieInstitutionnelleDetailEtablissementVo> {
    if(this._vieInstitutionnelleDetailEtablissementSelections==null){
    this._vieInstitutionnelleDetailEtablissementSelections=new Array<VieInstitutionnelleDetailEtablissementVo>();
    }
        return this._vieInstitutionnelleDetailEtablissementSelections;
       }


    set vieInstitutionnelleDetailEtablissementSelections(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this._vieInstitutionnelleDetailEtablissementSelections = value;
       }

    get createVieInstitutionnelleDetailEtablissementDialog(): boolean {
        return this._createVieInstitutionnelleDetailEtablissementDialog;
       }

    set createVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this._createVieInstitutionnelleDetailEtablissementDialog = value;
       }

    get editVieInstitutionnelleDetailEtablissementDialog(): boolean {
        return this._editVieInstitutionnelleDetailEtablissementDialog;
       }

    set editVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this._editVieInstitutionnelleDetailEtablissementDialog = value;
       }

    get viewVieInstitutionnelleDetailEtablissementDialog(): boolean {
        return this._viewVieInstitutionnelleDetailEtablissementDialog;
       }

    set viewVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this._viewVieInstitutionnelleDetailEtablissementDialog = value;
       }

     get searchVieInstitutionnelleDetailEtablissement(): VieInstitutionnelleDetailEtablissementVo {
     if(this._searchVieInstitutionnelleDetailEtablissement==null){
    this._searchVieInstitutionnelleDetailEtablissement=new VieInstitutionnelleDetailEtablissementVo();
    }
        return this._searchVieInstitutionnelleDetailEtablissement;
    }

    set searchVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this._searchVieInstitutionnelleDetailEtablissement = value;
       }

}
