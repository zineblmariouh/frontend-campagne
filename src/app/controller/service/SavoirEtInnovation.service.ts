import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SavoirEtInnovationVo} from '../model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {ContratEtConventionIrdVo} from '../model/ContratEtConventionIrd.model';
import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class SavoirEtInnovationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/savoirEtInnovation/';
        })
    }
     private _savoirEtInnovations: Array<SavoirEtInnovationVo> ;
     private _selectedSavoirEtInnovation: SavoirEtInnovationVo;
     private _savoirEtInnovationSelections: Array<SavoirEtInnovationVo>;
     private _createSavoirEtInnovationDialog: boolean;
     private _editSavoirEtInnovationDialog: boolean;
     private _viewSavoirEtInnovationDialog: boolean;
     public editSavoirEtInnovation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchSavoirEtInnovation:SavoirEtInnovationVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<SavoirEtInnovationVo>{
        return this.http.get<SavoirEtInnovationVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<SavoirEtInnovationVo>>{
        return this.http.get<Array<SavoirEtInnovationVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<SavoirEtInnovationVo>>(this.API);
    }

    public save(): Observable<SavoirEtInnovationVo> {
         return this.http.post<SavoirEtInnovationVo>(this.API, this.selectedSavoirEtInnovation);
    }

    delete(savoirEtInnovation: SavoirEtInnovationVo) {
         return this.http.delete<number>(this.API + 'id/' + savoirEtInnovation.id);
    }


    public edit(): Observable<SavoirEtInnovationVo> {
        return this.http.put<SavoirEtInnovationVo>(this.API, this.selectedSavoirEtInnovation);
    }


     public findByCriteria(savoirEtInnovation:SavoirEtInnovationVo):Observable<Array<SavoirEtInnovationVo>>{
           return this.http.post<Array<SavoirEtInnovationVo>>(this.API +'search', savoirEtInnovation);
    }

   public findByIdWithAssociatedList(savoirEtInnovation:SavoirEtInnovationVo):Observable<SavoirEtInnovationVo>{
         return this.http.get<SavoirEtInnovationVo>(this.API + 'detail/id/' +savoirEtInnovation.id);
    }

    // getters and setters


    get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
    if(this._savoirEtInnovations==null){
    this._savoirEtInnovations=new Array<SavoirEtInnovationVo>();
    }
return this._savoirEtInnovations;
       }

    set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this._savoirEtInnovations = value;
       }

    get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
    if(this._selectedSavoirEtInnovation==null){
    this._selectedSavoirEtInnovation=new SavoirEtInnovationVo();
    }
           return this._selectedSavoirEtInnovation;
       }

    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this._selectedSavoirEtInnovation = value;
       }

    get savoirEtInnovationSelections(): Array<SavoirEtInnovationVo> {
    if(this._savoirEtInnovationSelections==null){
    this._savoirEtInnovationSelections=new Array<SavoirEtInnovationVo>();
    }
        return this._savoirEtInnovationSelections;
       }


    set savoirEtInnovationSelections(value: Array<SavoirEtInnovationVo>) {
        this._savoirEtInnovationSelections = value;
       }

    get createSavoirEtInnovationDialog(): boolean {
        return this._createSavoirEtInnovationDialog;
       }

    set createSavoirEtInnovationDialog(value: boolean) {
        this._createSavoirEtInnovationDialog = value;
       }

    get editSavoirEtInnovationDialog(): boolean {
        return this._editSavoirEtInnovationDialog;
       }

    set editSavoirEtInnovationDialog(value: boolean) {
        this._editSavoirEtInnovationDialog = value;
       }

    get viewSavoirEtInnovationDialog(): boolean {
        return this._viewSavoirEtInnovationDialog;
       }

    set viewSavoirEtInnovationDialog(value: boolean) {
        this._viewSavoirEtInnovationDialog = value;
       }

     get searchSavoirEtInnovation(): SavoirEtInnovationVo {
     if(this._searchSavoirEtInnovation==null){
    this._searchSavoirEtInnovation=new SavoirEtInnovationVo();
    }
        return this._searchSavoirEtInnovation;
    }

    set searchSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this._searchSavoirEtInnovation = value;
       }

}
