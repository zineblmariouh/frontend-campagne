import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheVo} from '../model/ProjetActiviteRecherche.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRecherche/';
        })
    }
     private _projetActiviteRecherches: Array<ProjetActiviteRechercheVo> ;
     private _selectedProjetActiviteRecherche: ProjetActiviteRechercheVo;
     private _projetActiviteRechercheSelections: Array<ProjetActiviteRechercheVo>;
     private _createProjetActiviteRechercheDialog: boolean;
     private _editProjetActiviteRechercheDialog: boolean;
     private _viewProjetActiviteRechercheDialog: boolean;
     public editProjetActiviteRecherche$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRecherche:ProjetActiviteRechercheVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<ProjetActiviteRechercheVo>{
        return this.http.get<ProjetActiviteRechercheVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<ProjetActiviteRechercheVo>>{
        return this.http.get<Array<ProjetActiviteRechercheVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheVo> {
         return this.http.post<ProjetActiviteRechercheVo>(this.API, this.selectedProjetActiviteRecherche);
    }

    delete(projetActiviteRecherche: ProjetActiviteRechercheVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRecherche.id);
    }


    public edit(): Observable<ProjetActiviteRechercheVo> {
        return this.http.put<ProjetActiviteRechercheVo>(this.API, this.selectedProjetActiviteRecherche);
    }


     public findByCriteria(projetActiviteRecherche:ProjetActiviteRechercheVo):Observable<Array<ProjetActiviteRechercheVo>>{
           return this.http.post<Array<ProjetActiviteRechercheVo>>(this.API +'search', projetActiviteRecherche);
    }

   public findByIdWithAssociatedList(projetActiviteRecherche:ProjetActiviteRechercheVo):Observable<ProjetActiviteRechercheVo>{
         return this.http.get<ProjetActiviteRechercheVo>(this.API + 'detail/id/' +projetActiviteRecherche.id);
    }

    // getters and setters


    get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
    if(this._projetActiviteRecherches==null){
    this._projetActiviteRecherches=new Array<ProjetActiviteRechercheVo>();
    }
return this._projetActiviteRecherches;
       }

    set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this._projetActiviteRecherches = value;
       }

    get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
    if(this._selectedProjetActiviteRecherche==null){
    this._selectedProjetActiviteRecherche=new ProjetActiviteRechercheVo();
    }
           return this._selectedProjetActiviteRecherche;
       }

    set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this._selectedProjetActiviteRecherche = value;
       }

    get projetActiviteRechercheSelections(): Array<ProjetActiviteRechercheVo> {
    if(this._projetActiviteRechercheSelections==null){
    this._projetActiviteRechercheSelections=new Array<ProjetActiviteRechercheVo>();
    }
        return this._projetActiviteRechercheSelections;
       }


    set projetActiviteRechercheSelections(value: Array<ProjetActiviteRechercheVo>) {
        this._projetActiviteRechercheSelections = value;
       }

    get createProjetActiviteRechercheDialog(): boolean {
        return this._createProjetActiviteRechercheDialog;
       }

    set createProjetActiviteRechercheDialog(value: boolean) {
        this._createProjetActiviteRechercheDialog = value;
       }

    get editProjetActiviteRechercheDialog(): boolean {
        return this._editProjetActiviteRechercheDialog;
       }

    set editProjetActiviteRechercheDialog(value: boolean) {
        this._editProjetActiviteRechercheDialog = value;
       }

    get viewProjetActiviteRechercheDialog(): boolean {
        return this._viewProjetActiviteRechercheDialog;
       }

    set viewProjetActiviteRechercheDialog(value: boolean) {
        this._viewProjetActiviteRechercheDialog = value;
       }

     get searchProjetActiviteRecherche(): ProjetActiviteRechercheVo {
     if(this._searchProjetActiviteRecherche==null){
    this._searchProjetActiviteRecherche=new ProjetActiviteRechercheVo();
    }
        return this._searchProjetActiviteRecherche;
    }

    set searchProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this._searchProjetActiviteRecherche = value;
       }

}
