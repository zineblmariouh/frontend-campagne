import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirChercheurVo} from '../model/CommunauteSavoirChercheur.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirChercheur/';
        })
    }
     private _communauteSavoirChercheurs: Array<CommunauteSavoirChercheurVo> ;
     private _selectedCommunauteSavoirChercheur: CommunauteSavoirChercheurVo;
     private _communauteSavoirChercheurSelections: Array<CommunauteSavoirChercheurVo>;
     private _createCommunauteSavoirChercheurDialog: boolean;
     private _editCommunauteSavoirChercheurDialog: boolean;
     private _viewCommunauteSavoirChercheurDialog: boolean;
     public editCommunauteSavoirChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirChercheur:CommunauteSavoirChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirChercheurVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirChercheurVo> {
         return this.http.post<CommunauteSavoirChercheurVo>(this.API, this.selectedCommunauteSavoirChercheur);
    }

    delete(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirChercheur.id);
    }


    public edit(): Observable<CommunauteSavoirChercheurVo> {
        return this.http.put<CommunauteSavoirChercheurVo>(this.API, this.selectedCommunauteSavoirChercheur);
    }


     public findByCriteria(communauteSavoirChercheur:CommunauteSavoirChercheurVo):Observable<Array<CommunauteSavoirChercheurVo>>{
           return this.http.post<Array<CommunauteSavoirChercheurVo>>(this.API +'search', communauteSavoirChercheur);
    }

   public findByIdWithAssociatedList(communauteSavoirChercheur:CommunauteSavoirChercheurVo):Observable<CommunauteSavoirChercheurVo>{
         return this.http.get<CommunauteSavoirChercheurVo>(this.API + 'detail/id/' +communauteSavoirChercheur.id);
    }

    // getters and setters


    get communauteSavoirChercheurs(): Array<CommunauteSavoirChercheurVo> {
    if(this._communauteSavoirChercheurs==null){
    this._communauteSavoirChercheurs=new Array<CommunauteSavoirChercheurVo>();
    }
return this._communauteSavoirChercheurs;
       }

    set communauteSavoirChercheurs(value: Array<CommunauteSavoirChercheurVo>) {
        this._communauteSavoirChercheurs = value;
       }

    get selectedCommunauteSavoirChercheur(): CommunauteSavoirChercheurVo {
    if(this._selectedCommunauteSavoirChercheur==null){
    this._selectedCommunauteSavoirChercheur=new CommunauteSavoirChercheurVo();
    }
           return this._selectedCommunauteSavoirChercheur;
       }

    set selectedCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this._selectedCommunauteSavoirChercheur = value;
       }

    get communauteSavoirChercheurSelections(): Array<CommunauteSavoirChercheurVo> {
    if(this._communauteSavoirChercheurSelections==null){
    this._communauteSavoirChercheurSelections=new Array<CommunauteSavoirChercheurVo>();
    }
        return this._communauteSavoirChercheurSelections;
       }


    set communauteSavoirChercheurSelections(value: Array<CommunauteSavoirChercheurVo>) {
        this._communauteSavoirChercheurSelections = value;
       }

    get createCommunauteSavoirChercheurDialog(): boolean {
        return this._createCommunauteSavoirChercheurDialog;
       }

    set createCommunauteSavoirChercheurDialog(value: boolean) {
        this._createCommunauteSavoirChercheurDialog = value;
       }

    get editCommunauteSavoirChercheurDialog(): boolean {
        return this._editCommunauteSavoirChercheurDialog;
       }

    set editCommunauteSavoirChercheurDialog(value: boolean) {
        this._editCommunauteSavoirChercheurDialog = value;
       }

    get viewCommunauteSavoirChercheurDialog(): boolean {
        return this._viewCommunauteSavoirChercheurDialog;
       }

    set viewCommunauteSavoirChercheurDialog(value: boolean) {
        this._viewCommunauteSavoirChercheurDialog = value;
       }

     get searchCommunauteSavoirChercheur(): CommunauteSavoirChercheurVo {
     if(this._searchCommunauteSavoirChercheur==null){
    this._searchCommunauteSavoirChercheur=new CommunauteSavoirChercheurVo();
    }
        return this._searchCommunauteSavoirChercheur;
    }

    set searchCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this._searchCommunauteSavoirChercheur = value;
       }

}
