import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ExpertiseVo} from '../model/Expertise.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/expertise/';
        })
    }
     private _expertises: Array<ExpertiseVo> ;
     private _selectedExpertise: ExpertiseVo;
     private _expertiseSelections: Array<ExpertiseVo>;
     private _createExpertiseDialog: boolean;
     private _editExpertiseDialog: boolean;
     private _viewExpertiseDialog: boolean;
     public editExpertise$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchExpertise:ExpertiseVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<ExpertiseVo>{
        return this.http.get<ExpertiseVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<ExpertiseVo>>{
        return this.http.get<Array<ExpertiseVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<ExpertiseVo>>(this.API);
    }

    public save(): Observable<ExpertiseVo> {
         return this.http.post<ExpertiseVo>(this.API, this.selectedExpertise);
    }

    delete(expertise: ExpertiseVo) {
         return this.http.delete<number>(this.API + 'id/' + expertise.id);
    }


    public edit(): Observable<ExpertiseVo> {
        return this.http.put<ExpertiseVo>(this.API, this.selectedExpertise);
    }


     public findByCriteria(expertise:ExpertiseVo):Observable<Array<ExpertiseVo>>{
           return this.http.post<Array<ExpertiseVo>>(this.API +'search', expertise);
    }

   public findByIdWithAssociatedList(expertise:ExpertiseVo):Observable<ExpertiseVo>{
         return this.http.get<ExpertiseVo>(this.API + 'detail/id/' +expertise.id);
    }

    // getters and setters


    get expertises(): Array<ExpertiseVo> {
    if(this._expertises==null){
    this._expertises=new Array<ExpertiseVo>();
    }
return this._expertises;
       }

    set expertises(value: Array<ExpertiseVo>) {
        this._expertises = value;
       }

    get selectedExpertise(): ExpertiseVo {
    if(this._selectedExpertise==null){
    this._selectedExpertise=new ExpertiseVo();
    }
           return this._selectedExpertise;
       }

    set selectedExpertise(value: ExpertiseVo) {
        this._selectedExpertise = value;
       }

    get expertiseSelections(): Array<ExpertiseVo> {
    if(this._expertiseSelections==null){
    this._expertiseSelections=new Array<ExpertiseVo>();
    }
        return this._expertiseSelections;
       }


    set expertiseSelections(value: Array<ExpertiseVo>) {
        this._expertiseSelections = value;
       }

    get createExpertiseDialog(): boolean {
        return this._createExpertiseDialog;
       }

    set createExpertiseDialog(value: boolean) {
        this._createExpertiseDialog = value;
       }

    get editExpertiseDialog(): boolean {
        return this._editExpertiseDialog;
       }

    set editExpertiseDialog(value: boolean) {
        this._editExpertiseDialog = value;
       }

    get viewExpertiseDialog(): boolean {
        return this._viewExpertiseDialog;
       }

    set viewExpertiseDialog(value: boolean) {
        this._viewExpertiseDialog = value;
       }

     get searchExpertise(): ExpertiseVo {
     if(this._searchExpertise==null){
    this._searchExpertise=new ExpertiseVo();
    }
        return this._searchExpertise;
    }

    set searchExpertise(value: ExpertiseVo) {
        this._searchExpertise = value;
       }

}
