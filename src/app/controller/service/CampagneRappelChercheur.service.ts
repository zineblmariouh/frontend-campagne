import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneRappelChercheurVo} from '../model/CampagneRappelChercheur.model';
import {CampagneRappelVo} from '../model/CampagneRappel.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneRappelChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneRappelChercheur/';
        })
    }
     private _campagneRappelChercheurs: Array<CampagneRappelChercheurVo> ;
     private _selectedCampagneRappelChercheur: CampagneRappelChercheurVo;
     private _campagneRappelChercheurSelections: Array<CampagneRappelChercheurVo>;
     private _createCampagneRappelChercheurDialog: boolean;
     private _editCampagneRappelChercheurDialog: boolean;
     private _viewCampagneRappelChercheurDialog: boolean;
     public editCampagneRappelChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneRappelChercheur:CampagneRappelChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneRappelChercheurVo>>(this.API);
    }

    public save(): Observable<CampagneRappelChercheurVo> {
           return this.http.post<CampagneRappelChercheurVo>(this.API, {...this.selectedCampagneRappelChercheur,dateEnvoi: moment(this.selectedCampagneRappelChercheur.dateEnvoi).format("YYYY-MM-DD")});
    }

    delete(campagneRappelChercheur: CampagneRappelChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneRappelChercheur.id);
    }


    public edit(): Observable<CampagneRappelChercheurVo> {
        return this.http.put<CampagneRappelChercheurVo>(this.API, this.selectedCampagneRappelChercheur);
    }


     public findByCriteria(campagneRappelChercheur:CampagneRappelChercheurVo):Observable<Array<CampagneRappelChercheurVo>>{
           return this.http.post<Array<CampagneRappelChercheurVo>>(this.API +'search', campagneRappelChercheur);
    }

   public findByIdWithAssociatedList(campagneRappelChercheur:CampagneRappelChercheurVo):Observable<CampagneRappelChercheurVo>{
         return this.http.get<CampagneRappelChercheurVo>(this.API + 'detail/id/' +campagneRappelChercheur.id);
    }

    // getters and setters


    get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    if(this._campagneRappelChercheurs==null){
    this._campagneRappelChercheurs=new Array<CampagneRappelChercheurVo>();
    }
return this._campagneRappelChercheurs;
       }

    set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
        this._campagneRappelChercheurs = value;
       }

    get selectedCampagneRappelChercheur(): CampagneRappelChercheurVo {
    if(this._selectedCampagneRappelChercheur==null){
    this._selectedCampagneRappelChercheur=new CampagneRappelChercheurVo();
    }
           return this._selectedCampagneRappelChercheur;
       }

    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this._selectedCampagneRappelChercheur = value;
       }

    get campagneRappelChercheurSelections(): Array<CampagneRappelChercheurVo> {
    if(this._campagneRappelChercheurSelections==null){
    this._campagneRappelChercheurSelections=new Array<CampagneRappelChercheurVo>();
    }
        return this._campagneRappelChercheurSelections;
       }


    set campagneRappelChercheurSelections(value: Array<CampagneRappelChercheurVo>) {
        this._campagneRappelChercheurSelections = value;
       }

    get createCampagneRappelChercheurDialog(): boolean {
        return this._createCampagneRappelChercheurDialog;
       }

    set createCampagneRappelChercheurDialog(value: boolean) {
        this._createCampagneRappelChercheurDialog = value;
       }

    get editCampagneRappelChercheurDialog(): boolean {
        return this._editCampagneRappelChercheurDialog;
       }

    set editCampagneRappelChercheurDialog(value: boolean) {
        this._editCampagneRappelChercheurDialog = value;
       }

    get viewCampagneRappelChercheurDialog(): boolean {
        return this._viewCampagneRappelChercheurDialog;
       }

    set viewCampagneRappelChercheurDialog(value: boolean) {
        this._viewCampagneRappelChercheurDialog = value;
       }

     get searchCampagneRappelChercheur(): CampagneRappelChercheurVo {
     if(this._searchCampagneRappelChercheur==null){
    this._searchCampagneRappelChercheur=new CampagneRappelChercheurVo();
    }
        return this._searchCampagneRappelChercheur;
    }

    set searchCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this._searchCampagneRappelChercheur = value;
       }

}
