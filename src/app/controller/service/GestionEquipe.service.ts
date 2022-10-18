import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GestionEquipeVo} from '../model/GestionEquipe.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {GestionEquipeDetailVo} from '../model/GestionEquipeDetail.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class GestionEquipeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/gestionEquipe/';
        })
    }
     private _gestionEquipes: Array<GestionEquipeVo> ;
     private _selectedGestionEquipe: GestionEquipeVo;
     private _gestionEquipeSelections: Array<GestionEquipeVo>;
     private _createGestionEquipeDialog: boolean;
     private _editGestionEquipeDialog: boolean;
     private _viewGestionEquipeDialog: boolean;
     public editGestionEquipe$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchGestionEquipe:GestionEquipeVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<GestionEquipeVo>{
        return this.http.get<GestionEquipeVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<GestionEquipeVo>>{
        return this.http.get<Array<GestionEquipeVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<GestionEquipeVo>>(this.API);
    }

    public save(): Observable<GestionEquipeVo> {
         return this.http.post<GestionEquipeVo>(this.API, this.selectedGestionEquipe);
    }

    delete(gestionEquipe: GestionEquipeVo) {
         return this.http.delete<number>(this.API + 'id/' + gestionEquipe.id);
    }


    public edit(): Observable<GestionEquipeVo> {
        return this.http.put<GestionEquipeVo>(this.API, this.selectedGestionEquipe);
    }


     public findByCriteria(gestionEquipe:GestionEquipeVo):Observable<Array<GestionEquipeVo>>{
           return this.http.post<Array<GestionEquipeVo>>(this.API +'search', gestionEquipe);
    }

   public findByIdWithAssociatedList(gestionEquipe:GestionEquipeVo):Observable<GestionEquipeVo>{
         return this.http.get<GestionEquipeVo>(this.API + 'detail/id/' +gestionEquipe.id);
    }

    // getters and setters


    get gestionEquipes(): Array<GestionEquipeVo> {
    if(this._gestionEquipes==null){
    this._gestionEquipes=new Array<GestionEquipeVo>();
    }
return this._gestionEquipes;
       }

    set gestionEquipes(value: Array<GestionEquipeVo>) {
        this._gestionEquipes = value;
       }

    get selectedGestionEquipe(): GestionEquipeVo {
    if(this._selectedGestionEquipe==null){
    this._selectedGestionEquipe=new GestionEquipeVo();
    }
           return this._selectedGestionEquipe;
       }

    set selectedGestionEquipe(value: GestionEquipeVo) {
        this._selectedGestionEquipe = value;
       }

    get gestionEquipeSelections(): Array<GestionEquipeVo> {
    if(this._gestionEquipeSelections==null){
    this._gestionEquipeSelections=new Array<GestionEquipeVo>();
    }
        return this._gestionEquipeSelections;
       }


    set gestionEquipeSelections(value: Array<GestionEquipeVo>) {
        this._gestionEquipeSelections = value;
       }

    get createGestionEquipeDialog(): boolean {
        return this._createGestionEquipeDialog;
       }

    set createGestionEquipeDialog(value: boolean) {
        this._createGestionEquipeDialog = value;
       }

    get editGestionEquipeDialog(): boolean {
        return this._editGestionEquipeDialog;
       }

    set editGestionEquipeDialog(value: boolean) {
        this._editGestionEquipeDialog = value;
       }

    get viewGestionEquipeDialog(): boolean {
        return this._viewGestionEquipeDialog;
       }

    set viewGestionEquipeDialog(value: boolean) {
        this._viewGestionEquipeDialog = value;
       }

     get searchGestionEquipe(): GestionEquipeVo {
     if(this._searchGestionEquipe==null){
    this._searchGestionEquipe=new GestionEquipeVo();
    }
        return this._searchGestionEquipe;
    }

    set searchGestionEquipe(value: GestionEquipeVo) {
        this._searchGestionEquipe = value;
       }

}
