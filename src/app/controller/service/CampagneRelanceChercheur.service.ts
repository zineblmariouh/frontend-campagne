import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneRelanceChercheurVo} from '../model/CampagneRelanceChercheur.model';
import {CampagneRelanceVo} from '../model/CampagneRelance.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneRelanceChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneRelanceChercheur/';
        })
    }
     private _campagneRelanceChercheurs: Array<CampagneRelanceChercheurVo> ;
     private _selectedCampagneRelanceChercheur: CampagneRelanceChercheurVo;
     private _campagneRelanceChercheurSelections: Array<CampagneRelanceChercheurVo>;
     private _createCampagneRelanceChercheurDialog: boolean;
     private _editCampagneRelanceChercheurDialog: boolean;
     private _viewCampagneRelanceChercheurDialog: boolean;
     public editCampagneRelanceChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneRelanceChercheur:CampagneRelanceChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneRelanceChercheurVo>>(this.API);
    }

    public save(): Observable<CampagneRelanceChercheurVo> {
           return this.http.post<CampagneRelanceChercheurVo>(this.API, {...this.selectedCampagneRelanceChercheur,dateEnvoi: moment(this.selectedCampagneRelanceChercheur.dateEnvoi).format("YYYY-MM-DD")});
    }

    delete(campagneRelanceChercheur: CampagneRelanceChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneRelanceChercheur.id);
    }


    public edit(): Observable<CampagneRelanceChercheurVo> {
        return this.http.put<CampagneRelanceChercheurVo>(this.API, this.selectedCampagneRelanceChercheur);
    }


     public findByCriteria(campagneRelanceChercheur:CampagneRelanceChercheurVo):Observable<Array<CampagneRelanceChercheurVo>>{
           return this.http.post<Array<CampagneRelanceChercheurVo>>(this.API +'search', campagneRelanceChercheur);
    }

   public findByIdWithAssociatedList(campagneRelanceChercheur:CampagneRelanceChercheurVo):Observable<CampagneRelanceChercheurVo>{
         return this.http.get<CampagneRelanceChercheurVo>(this.API + 'detail/id/' +campagneRelanceChercheur.id);
    }

    // getters and setters


    get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    if(this._campagneRelanceChercheurs==null){
    this._campagneRelanceChercheurs=new Array<CampagneRelanceChercheurVo>();
    }
return this._campagneRelanceChercheurs;
       }

    set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
        this._campagneRelanceChercheurs = value;
       }

    get selectedCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
    if(this._selectedCampagneRelanceChercheur==null){
    this._selectedCampagneRelanceChercheur=new CampagneRelanceChercheurVo();
    }
           return this._selectedCampagneRelanceChercheur;
       }

    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this._selectedCampagneRelanceChercheur = value;
       }

    get campagneRelanceChercheurSelections(): Array<CampagneRelanceChercheurVo> {
    if(this._campagneRelanceChercheurSelections==null){
    this._campagneRelanceChercheurSelections=new Array<CampagneRelanceChercheurVo>();
    }
        return this._campagneRelanceChercheurSelections;
       }


    set campagneRelanceChercheurSelections(value: Array<CampagneRelanceChercheurVo>) {
        this._campagneRelanceChercheurSelections = value;
       }

    get createCampagneRelanceChercheurDialog(): boolean {
        return this._createCampagneRelanceChercheurDialog;
       }

    set createCampagneRelanceChercheurDialog(value: boolean) {
        this._createCampagneRelanceChercheurDialog = value;
       }

    get editCampagneRelanceChercheurDialog(): boolean {
        return this._editCampagneRelanceChercheurDialog;
       }

    set editCampagneRelanceChercheurDialog(value: boolean) {
        this._editCampagneRelanceChercheurDialog = value;
       }

    get viewCampagneRelanceChercheurDialog(): boolean {
        return this._viewCampagneRelanceChercheurDialog;
       }

    set viewCampagneRelanceChercheurDialog(value: boolean) {
        this._viewCampagneRelanceChercheurDialog = value;
       }

     get searchCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
     if(this._searchCampagneRelanceChercheur==null){
    this._searchCampagneRelanceChercheur=new CampagneRelanceChercheurVo();
    }
        return this._searchCampagneRelanceChercheur;
    }

    set searchCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this._searchCampagneRelanceChercheur = value;
       }

}
