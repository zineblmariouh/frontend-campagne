import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';
import {ModaliteVo} from '../model/Modalite.model';
import {SavoirEtInnovationVo} from '../model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {ModaliteInterventionVo} from '../model/ModaliteIntervention.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {EvenementColloqueScienntifiquePaysVo} from '../model/EvenementColloqueScienntifiquePays.model';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../model/CommunauteSavoirEvenementColloqueScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class EvenementColloqueScienntifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/evenementColloqueScienntifique/';
        })
    }
     private _evenementColloqueScienntifiques: Array<EvenementColloqueScienntifiqueVo> ;
     private _selectedEvenementColloqueScienntifique: EvenementColloqueScienntifiqueVo;
     private _evenementColloqueScienntifiqueSelections: Array<EvenementColloqueScienntifiqueVo>;
     private _createEvenementColloqueScienntifiqueDialog: boolean;
     private _editEvenementColloqueScienntifiqueDialog: boolean;
     private _viewEvenementColloqueScienntifiqueDialog: boolean;
     public editEvenementColloqueScienntifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEvenementColloqueScienntifique:EvenementColloqueScienntifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EvenementColloqueScienntifiqueVo>>(this.API);
    }

    public save(): Observable<EvenementColloqueScienntifiqueVo> {
           return this.http.post<EvenementColloqueScienntifiqueVo>(this.API, {...this.selectedEvenementColloqueScienntifique,dateEvenement: moment(this.selectedEvenementColloqueScienntifique.dateEvenement).format("YYYY-MM-DD")});
    }

    delete(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + evenementColloqueScienntifique.id);
    }


    public edit(): Observable<EvenementColloqueScienntifiqueVo> {
        return this.http.put<EvenementColloqueScienntifiqueVo>(this.API, this.selectedEvenementColloqueScienntifique);
    }


     public findByCriteria(evenementColloqueScienntifique:EvenementColloqueScienntifiqueVo):Observable<Array<EvenementColloqueScienntifiqueVo>>{
           return this.http.post<Array<EvenementColloqueScienntifiqueVo>>(this.API +'search', evenementColloqueScienntifique);
    }

   public findByIdWithAssociatedList(evenementColloqueScienntifique:EvenementColloqueScienntifiqueVo):Observable<EvenementColloqueScienntifiqueVo>{
         return this.http.get<EvenementColloqueScienntifiqueVo>(this.API + 'detail/id/' +evenementColloqueScienntifique.id);
    }

    // getters and setters


    get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
    if(this._evenementColloqueScienntifiques==null){
    this._evenementColloqueScienntifiques=new Array<EvenementColloqueScienntifiqueVo>();
    }
return this._evenementColloqueScienntifiques;
       }

    set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this._evenementColloqueScienntifiques = value;
       }

    get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
    if(this._selectedEvenementColloqueScienntifique==null){
    this._selectedEvenementColloqueScienntifique=new EvenementColloqueScienntifiqueVo();
    }
           return this._selectedEvenementColloqueScienntifique;
       }

    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this._selectedEvenementColloqueScienntifique = value;
       }

    get evenementColloqueScienntifiqueSelections(): Array<EvenementColloqueScienntifiqueVo> {
    if(this._evenementColloqueScienntifiqueSelections==null){
    this._evenementColloqueScienntifiqueSelections=new Array<EvenementColloqueScienntifiqueVo>();
    }
        return this._evenementColloqueScienntifiqueSelections;
       }


    set evenementColloqueScienntifiqueSelections(value: Array<EvenementColloqueScienntifiqueVo>) {
        this._evenementColloqueScienntifiqueSelections = value;
       }

    get createEvenementColloqueScienntifiqueDialog(): boolean {
        return this._createEvenementColloqueScienntifiqueDialog;
       }

    set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this._createEvenementColloqueScienntifiqueDialog = value;
       }

    get editEvenementColloqueScienntifiqueDialog(): boolean {
        return this._editEvenementColloqueScienntifiqueDialog;
       }

    set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this._editEvenementColloqueScienntifiqueDialog = value;
       }

    get viewEvenementColloqueScienntifiqueDialog(): boolean {
        return this._viewEvenementColloqueScienntifiqueDialog;
       }

    set viewEvenementColloqueScienntifiqueDialog(value: boolean) {
        this._viewEvenementColloqueScienntifiqueDialog = value;
       }

     get searchEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
     if(this._searchEvenementColloqueScienntifique==null){
    this._searchEvenementColloqueScienntifique=new EvenementColloqueScienntifiqueVo();
    }
        return this._searchEvenementColloqueScienntifique;
    }

    set searchEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this._searchEvenementColloqueScienntifique = value;
       }

}
