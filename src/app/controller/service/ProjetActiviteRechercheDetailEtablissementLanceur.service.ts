import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailEtablissementLanceurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetailEtablissementLanceur/';
        })
    }
     private _projetActiviteRechercheDetailEtablissementLanceurs: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> ;
     private _selectedProjetActiviteRechercheDetailEtablissementLanceur: ProjetActiviteRechercheDetailEtablissementLanceurVo;
     private _projetActiviteRechercheDetailEtablissementLanceurSelections: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>;
     private _createProjetActiviteRechercheDetailEtablissementLanceurDialog: boolean;
     private _editProjetActiviteRechercheDetailEtablissementLanceurDialog: boolean;
     private _viewProjetActiviteRechercheDetailEtablissementLanceurDialog: boolean;
     public editProjetActiviteRechercheDetailEtablissementLanceur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
         return this.http.post<ProjetActiviteRechercheDetailEtablissementLanceurVo>(this.API, this.selectedProjetActiviteRechercheDetailEtablissementLanceur);
    }

    delete(projetActiviteRechercheDetailEtablissementLanceur: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetailEtablissementLanceur.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
        return this.http.put<ProjetActiviteRechercheDetailEtablissementLanceurVo>(this.API, this.selectedProjetActiviteRechercheDetailEtablissementLanceur);
    }


     public findByCriteria(projetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo):Observable<Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>>(this.API +'search', projetActiviteRechercheDetailEtablissementLanceur);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetailEtablissementLanceur:ProjetActiviteRechercheDetailEtablissementLanceurVo):Observable<ProjetActiviteRechercheDetailEtablissementLanceurVo>{
         return this.http.get<ProjetActiviteRechercheDetailEtablissementLanceurVo>(this.API + 'detail/id/' +projetActiviteRechercheDetailEtablissementLanceur.id);
    }

    // getters and setters


    get projetActiviteRechercheDetailEtablissementLanceurs(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    if(this._projetActiviteRechercheDetailEtablissementLanceurs==null){
    this._projetActiviteRechercheDetailEtablissementLanceurs=new Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>();
    }
return this._projetActiviteRechercheDetailEtablissementLanceurs;
       }

    set projetActiviteRechercheDetailEtablissementLanceurs(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this._projetActiviteRechercheDetailEtablissementLanceurs = value;
       }

    get selectedProjetActiviteRechercheDetailEtablissementLanceur(): ProjetActiviteRechercheDetailEtablissementLanceurVo {
    if(this._selectedProjetActiviteRechercheDetailEtablissementLanceur==null){
    this._selectedProjetActiviteRechercheDetailEtablissementLanceur=new ProjetActiviteRechercheDetailEtablissementLanceurVo();
    }
           return this._selectedProjetActiviteRechercheDetailEtablissementLanceur;
       }

    set selectedProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this._selectedProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

    get projetActiviteRechercheDetailEtablissementLanceurSelections(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    if(this._projetActiviteRechercheDetailEtablissementLanceurSelections==null){
    this._projetActiviteRechercheDetailEtablissementLanceurSelections=new Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>();
    }
        return this._projetActiviteRechercheDetailEtablissementLanceurSelections;
       }


    set projetActiviteRechercheDetailEtablissementLanceurSelections(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this._projetActiviteRechercheDetailEtablissementLanceurSelections = value;
       }

    get createProjetActiviteRechercheDetailEtablissementLanceurDialog(): boolean {
        return this._createProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }

    set createProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailEtablissementLanceurDialog = value;
       }

    get editProjetActiviteRechercheDetailEtablissementLanceurDialog(): boolean {
        return this._editProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }

    set editProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailEtablissementLanceurDialog = value;
       }

    get viewProjetActiviteRechercheDetailEtablissementLanceurDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailEtablissementLanceurDialog;
       }

    set viewProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailEtablissementLanceurDialog = value;
       }

     get searchProjetActiviteRechercheDetailEtablissementLanceur(): ProjetActiviteRechercheDetailEtablissementLanceurVo {
     if(this._searchProjetActiviteRechercheDetailEtablissementLanceur==null){
    this._searchProjetActiviteRechercheDetailEtablissementLanceur=new ProjetActiviteRechercheDetailEtablissementLanceurVo();
    }
        return this._searchProjetActiviteRechercheDetailEtablissementLanceur;
    }

    set searchProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this._searchProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

}
