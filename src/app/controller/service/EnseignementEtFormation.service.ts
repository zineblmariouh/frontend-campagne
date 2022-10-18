import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementEtFormationVo} from '../model/EnseignementEtFormation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {CampagneVo} from '../model/Campagne.model';
import {ResponsabilitePedagogiqueVo} from '../model/ResponsabilitePedagogique.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementEtFormationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignementEtFormation/';
        })
    }
     private _enseignementEtFormations: Array<EnseignementEtFormationVo> ;
     private _selectedEnseignementEtFormation: EnseignementEtFormationVo;
     private _enseignementEtFormationSelections: Array<EnseignementEtFormationVo>;
     private _createEnseignementEtFormationDialog: boolean;
     private _editEnseignementEtFormationDialog: boolean;
     private _viewEnseignementEtFormationDialog: boolean;
     public editEnseignementEtFormation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignementEtFormation:EnseignementEtFormationVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<EnseignementEtFormationVo>{
        return this.http.get<EnseignementEtFormationVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<EnseignementEtFormationVo>>{
        return this.http.get<Array<EnseignementEtFormationVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<EnseignementEtFormationVo>>(this.API);
    }

    public save(): Observable<EnseignementEtFormationVo> {
         return this.http.post<EnseignementEtFormationVo>(this.API, this.selectedEnseignementEtFormation);
    }

    delete(enseignementEtFormation: EnseignementEtFormationVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignementEtFormation.id);
    }


    public edit(): Observable<EnseignementEtFormationVo> {
        return this.http.put<EnseignementEtFormationVo>(this.API, this.selectedEnseignementEtFormation);
    }


     public findByCriteria(enseignementEtFormation:EnseignementEtFormationVo):Observable<Array<EnseignementEtFormationVo>>{
           return this.http.post<Array<EnseignementEtFormationVo>>(this.API +'search', enseignementEtFormation);
    }

   public findByIdWithAssociatedList(enseignementEtFormation:EnseignementEtFormationVo):Observable<EnseignementEtFormationVo>{
         return this.http.get<EnseignementEtFormationVo>(this.API + 'detail/id/' +enseignementEtFormation.id);
    }

    // getters and setters


    get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
    if(this._enseignementEtFormations==null){
    this._enseignementEtFormations=new Array<EnseignementEtFormationVo>();
    }
return this._enseignementEtFormations;
       }

    set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this._enseignementEtFormations = value;
       }

    get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
    if(this._selectedEnseignementEtFormation==null){
    this._selectedEnseignementEtFormation=new EnseignementEtFormationVo();
    }
           return this._selectedEnseignementEtFormation;
       }

    set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this._selectedEnseignementEtFormation = value;
       }

    get enseignementEtFormationSelections(): Array<EnseignementEtFormationVo> {
    if(this._enseignementEtFormationSelections==null){
    this._enseignementEtFormationSelections=new Array<EnseignementEtFormationVo>();
    }
        return this._enseignementEtFormationSelections;
       }


    set enseignementEtFormationSelections(value: Array<EnseignementEtFormationVo>) {
        this._enseignementEtFormationSelections = value;
       }

    get createEnseignementEtFormationDialog(): boolean {
        return this._createEnseignementEtFormationDialog;
       }

    set createEnseignementEtFormationDialog(value: boolean) {
        this._createEnseignementEtFormationDialog = value;
       }

    get editEnseignementEtFormationDialog(): boolean {
        return this._editEnseignementEtFormationDialog;
       }

    set editEnseignementEtFormationDialog(value: boolean) {
        this._editEnseignementEtFormationDialog = value;
       }

    get viewEnseignementEtFormationDialog(): boolean {
        return this._viewEnseignementEtFormationDialog;
       }

    set viewEnseignementEtFormationDialog(value: boolean) {
        this._viewEnseignementEtFormationDialog = value;
       }

     get searchEnseignementEtFormation(): EnseignementEtFormationVo {
     if(this._searchEnseignementEtFormation==null){
    this._searchEnseignementEtFormation=new EnseignementEtFormationVo();
    }
        return this._searchEnseignementEtFormation;
    }

    set searchEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this._searchEnseignementEtFormation = value;
       }

}
