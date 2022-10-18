import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {VieInstitutionnelleVo} from '../model/VieInstitutionnelle.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {VieInstitutionnelleDetailVo} from '../model/VieInstitutionnelleDetail.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class VieInstitutionnelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/vieInstitutionnelle/';
        })
    }
     private _vieInstitutionnelles: Array<VieInstitutionnelleVo> ;
     private _selectedVieInstitutionnelle: VieInstitutionnelleVo;
     private _vieInstitutionnelleSelections: Array<VieInstitutionnelleVo>;
     private _createVieInstitutionnelleDialog: boolean;
     private _editVieInstitutionnelleDialog: boolean;
     private _viewVieInstitutionnelleDialog: boolean;
     public editVieInstitutionnelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchVieInstitutionnelle:VieInstitutionnelleVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<VieInstitutionnelleVo>{
        return this.http.get<VieInstitutionnelleVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<VieInstitutionnelleVo>>{
        return this.http.get<Array<VieInstitutionnelleVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<VieInstitutionnelleVo>>(this.API);
    }

    public save(): Observable<VieInstitutionnelleVo> {
         return this.http.post<VieInstitutionnelleVo>(this.API, this.selectedVieInstitutionnelle);
    }

    delete(vieInstitutionnelle: VieInstitutionnelleVo) {
         return this.http.delete<number>(this.API + 'id/' + vieInstitutionnelle.id);
    }


    public edit(): Observable<VieInstitutionnelleVo> {
        return this.http.put<VieInstitutionnelleVo>(this.API, this.selectedVieInstitutionnelle);
    }


     public findByCriteria(vieInstitutionnelle:VieInstitutionnelleVo):Observable<Array<VieInstitutionnelleVo>>{
           return this.http.post<Array<VieInstitutionnelleVo>>(this.API +'search', vieInstitutionnelle);
    }

   public findByIdWithAssociatedList(vieInstitutionnelle:VieInstitutionnelleVo):Observable<VieInstitutionnelleVo>{
         return this.http.get<VieInstitutionnelleVo>(this.API + 'detail/id/' +vieInstitutionnelle.id);
    }

    // getters and setters


    get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
    if(this._vieInstitutionnelles==null){
    this._vieInstitutionnelles=new Array<VieInstitutionnelleVo>();
    }
return this._vieInstitutionnelles;
       }

    set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this._vieInstitutionnelles = value;
       }

    get selectedVieInstitutionnelle(): VieInstitutionnelleVo {
    if(this._selectedVieInstitutionnelle==null){
    this._selectedVieInstitutionnelle=new VieInstitutionnelleVo();
    }
           return this._selectedVieInstitutionnelle;
       }

    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this._selectedVieInstitutionnelle = value;
       }

    get vieInstitutionnelleSelections(): Array<VieInstitutionnelleVo> {
    if(this._vieInstitutionnelleSelections==null){
    this._vieInstitutionnelleSelections=new Array<VieInstitutionnelleVo>();
    }
        return this._vieInstitutionnelleSelections;
       }


    set vieInstitutionnelleSelections(value: Array<VieInstitutionnelleVo>) {
        this._vieInstitutionnelleSelections = value;
       }

    get createVieInstitutionnelleDialog(): boolean {
        return this._createVieInstitutionnelleDialog;
       }

    set createVieInstitutionnelleDialog(value: boolean) {
        this._createVieInstitutionnelleDialog = value;
       }

    get editVieInstitutionnelleDialog(): boolean {
        return this._editVieInstitutionnelleDialog;
       }

    set editVieInstitutionnelleDialog(value: boolean) {
        this._editVieInstitutionnelleDialog = value;
       }

    get viewVieInstitutionnelleDialog(): boolean {
        return this._viewVieInstitutionnelleDialog;
       }

    set viewVieInstitutionnelleDialog(value: boolean) {
        this._viewVieInstitutionnelleDialog = value;
       }

     get searchVieInstitutionnelle(): VieInstitutionnelleVo {
     if(this._searchVieInstitutionnelle==null){
    this._searchVieInstitutionnelle=new VieInstitutionnelleVo();
    }
        return this._searchVieInstitutionnelle;
    }

    set searchVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this._searchVieInstitutionnelle = value;
       }

}
