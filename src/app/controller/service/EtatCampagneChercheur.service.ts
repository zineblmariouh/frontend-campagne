import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatCampagneChercheurVo} from '../model/EtatCampagneChercheur.model';


@Injectable({
  providedIn: 'root'
})
export class EtatCampagneChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatCampagneChercheur/';
        })
    }
     private _etatCampagneChercheurs: Array<EtatCampagneChercheurVo> ;
     private _selectedEtatCampagneChercheur: EtatCampagneChercheurVo;
     private _etatCampagneChercheurSelections: Array<EtatCampagneChercheurVo>;
     private _createEtatCampagneChercheurDialog: boolean;
     private _editEtatCampagneChercheurDialog: boolean;
     private _viewEtatCampagneChercheurDialog: boolean;
     public editEtatCampagneChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatCampagneChercheur:EtatCampagneChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatCampagneChercheurVo>>(this.API);
    }

    public save(): Observable<EtatCampagneChercheurVo> {
         return this.http.post<EtatCampagneChercheurVo>(this.API, this.selectedEtatCampagneChercheur);
    }

    delete(etatCampagneChercheur: EtatCampagneChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + etatCampagneChercheur.id);
    }


    public edit(): Observable<EtatCampagneChercheurVo> {
        return this.http.put<EtatCampagneChercheurVo>(this.API, this.selectedEtatCampagneChercheur);
    }


     public findByCriteria(etatCampagneChercheur:EtatCampagneChercheurVo):Observable<Array<EtatCampagneChercheurVo>>{
           return this.http.post<Array<EtatCampagneChercheurVo>>(this.API +'search', etatCampagneChercheur);
    }

   public findByIdWithAssociatedList(etatCampagneChercheur:EtatCampagneChercheurVo):Observable<EtatCampagneChercheurVo>{
         return this.http.get<EtatCampagneChercheurVo>(this.API + 'detail/id/' +etatCampagneChercheur.id);
    }

    // getters and setters


    get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
    if(this._etatCampagneChercheurs==null){
    this._etatCampagneChercheurs=new Array<EtatCampagneChercheurVo>();
    }
return this._etatCampagneChercheurs;
       }

    set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this._etatCampagneChercheurs = value;
       }

    get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
    if(this._selectedEtatCampagneChercheur==null){
    this._selectedEtatCampagneChercheur=new EtatCampagneChercheurVo();
    }
           return this._selectedEtatCampagneChercheur;
       }

    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this._selectedEtatCampagneChercheur = value;
       }

    get etatCampagneChercheurSelections(): Array<EtatCampagneChercheurVo> {
    if(this._etatCampagneChercheurSelections==null){
    this._etatCampagneChercheurSelections=new Array<EtatCampagneChercheurVo>();
    }
        return this._etatCampagneChercheurSelections;
       }


    set etatCampagneChercheurSelections(value: Array<EtatCampagneChercheurVo>) {
        this._etatCampagneChercheurSelections = value;
       }

    get createEtatCampagneChercheurDialog(): boolean {
        return this._createEtatCampagneChercheurDialog;
       }

    set createEtatCampagneChercheurDialog(value: boolean) {
        this._createEtatCampagneChercheurDialog = value;
       }

    get editEtatCampagneChercheurDialog(): boolean {
        return this._editEtatCampagneChercheurDialog;
       }

    set editEtatCampagneChercheurDialog(value: boolean) {
        this._editEtatCampagneChercheurDialog = value;
       }

    get viewEtatCampagneChercheurDialog(): boolean {
        return this._viewEtatCampagneChercheurDialog;
       }

    set viewEtatCampagneChercheurDialog(value: boolean) {
        this._viewEtatCampagneChercheurDialog = value;
       }

     get searchEtatCampagneChercheur(): EtatCampagneChercheurVo {
     if(this._searchEtatCampagneChercheur==null){
    this._searchEtatCampagneChercheur=new EtatCampagneChercheurVo();
    }
        return this._searchEtatCampagneChercheur;
    }

    set searchEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this._searchEtatCampagneChercheur = value;
       }

}
