import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ExpertiseScientifiqueVo} from '../model/ExpertiseScientifique.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from '../model/DisciplineScientifiqueExpertiseScientifique.model';
import {TypeExpertiseVo} from '../model/TypeExpertise.model';
import {CommunauteSavoirExpertiseScientifiqueVo} from '../model/CommunauteSavoirExpertiseScientifique.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {CampagneVo} from '../model/Campagne.model';
import {PaysVo} from '../model/Pays.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertiseScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/expertiseScientifique/';
        })
    }
     private _expertiseScientifiques: Array<ExpertiseScientifiqueVo> ;
     private _selectedExpertiseScientifique: ExpertiseScientifiqueVo;
     private _expertiseScientifiqueSelections: Array<ExpertiseScientifiqueVo>;
     private _createExpertiseScientifiqueDialog: boolean;
     private _editExpertiseScientifiqueDialog: boolean;
     private _viewExpertiseScientifiqueDialog: boolean;
     public editExpertiseScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchExpertiseScientifique:ExpertiseScientifiqueVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<ExpertiseScientifiqueVo>{
        return this.http.get<ExpertiseScientifiqueVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<ExpertiseScientifiqueVo>>{
        return this.http.get<Array<ExpertiseScientifiqueVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<ExpertiseScientifiqueVo>>(this.API);
    }

    public save(): Observable<ExpertiseScientifiqueVo> {
         return this.http.post<ExpertiseScientifiqueVo>(this.API, this.selectedExpertiseScientifique);
    }

    delete(expertiseScientifique: ExpertiseScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + expertiseScientifique.id);
    }


    public edit(): Observable<ExpertiseScientifiqueVo> {
        return this.http.put<ExpertiseScientifiqueVo>(this.API, this.selectedExpertiseScientifique);
    }


     public findByCriteria(expertiseScientifique:ExpertiseScientifiqueVo):Observable<Array<ExpertiseScientifiqueVo>>{
           return this.http.post<Array<ExpertiseScientifiqueVo>>(this.API +'search', expertiseScientifique);
    }

   public findByIdWithAssociatedList(expertiseScientifique:ExpertiseScientifiqueVo):Observable<ExpertiseScientifiqueVo>{
         return this.http.get<ExpertiseScientifiqueVo>(this.API + 'detail/id/' +expertiseScientifique.id);
    }

    // getters and setters


    get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
    if(this._expertiseScientifiques==null){
    this._expertiseScientifiques=new Array<ExpertiseScientifiqueVo>();
    }
return this._expertiseScientifiques;
       }

    set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this._expertiseScientifiques = value;
       }

    get selectedExpertiseScientifique(): ExpertiseScientifiqueVo {
    if(this._selectedExpertiseScientifique==null){
    this._selectedExpertiseScientifique=new ExpertiseScientifiqueVo();
    }
           return this._selectedExpertiseScientifique;
       }

    set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this._selectedExpertiseScientifique = value;
       }

    get expertiseScientifiqueSelections(): Array<ExpertiseScientifiqueVo> {
    if(this._expertiseScientifiqueSelections==null){
    this._expertiseScientifiqueSelections=new Array<ExpertiseScientifiqueVo>();
    }
        return this._expertiseScientifiqueSelections;
       }


    set expertiseScientifiqueSelections(value: Array<ExpertiseScientifiqueVo>) {
        this._expertiseScientifiqueSelections = value;
       }

    get createExpertiseScientifiqueDialog(): boolean {
        return this._createExpertiseScientifiqueDialog;
       }

    set createExpertiseScientifiqueDialog(value: boolean) {
        this._createExpertiseScientifiqueDialog = value;
       }

    get editExpertiseScientifiqueDialog(): boolean {
        return this._editExpertiseScientifiqueDialog;
       }

    set editExpertiseScientifiqueDialog(value: boolean) {
        this._editExpertiseScientifiqueDialog = value;
       }

    get viewExpertiseScientifiqueDialog(): boolean {
        return this._viewExpertiseScientifiqueDialog;
       }

    set viewExpertiseScientifiqueDialog(value: boolean) {
        this._viewExpertiseScientifiqueDialog = value;
       }

     get searchExpertiseScientifique(): ExpertiseScientifiqueVo {
     if(this._searchExpertiseScientifique==null){
    this._searchExpertiseScientifique=new ExpertiseScientifiqueVo();
    }
        return this._searchExpertiseScientifique;
    }

    set searchExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this._searchExpertiseScientifique = value;
       }

}
