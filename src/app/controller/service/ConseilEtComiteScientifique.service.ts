import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConseilEtComiteScientifiqueVo} from '../model/ConseilEtComiteScientifique.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from '../model/CommunauteSavoirConseilEtComiteScientifique.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {CampagneVo} from '../model/Campagne.model';
import {PaysVo} from '../model/Pays.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ConseilEtComiteScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/conseilEtComiteScientifique/';
        })
    }
     private _conseilEtComiteScientifiques: Array<ConseilEtComiteScientifiqueVo> ;
     private _selectedConseilEtComiteScientifique: ConseilEtComiteScientifiqueVo;
     private _conseilEtComiteScientifiqueSelections: Array<ConseilEtComiteScientifiqueVo>;
     private _createConseilEtComiteScientifiqueDialog: boolean;
     private _editConseilEtComiteScientifiqueDialog: boolean;
     private _viewConseilEtComiteScientifiqueDialog: boolean;
     public editConseilEtComiteScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConseilEtComiteScientifique:ConseilEtComiteScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ConseilEtComiteScientifiqueVo>>(this.API);
    }

    public save(): Observable<ConseilEtComiteScientifiqueVo> {
         return this.http.post<ConseilEtComiteScientifiqueVo>(this.API, this.selectedConseilEtComiteScientifique);
    }

    delete(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + conseilEtComiteScientifique.id);
    }


    public edit(): Observable<ConseilEtComiteScientifiqueVo> {
        return this.http.put<ConseilEtComiteScientifiqueVo>(this.API, this.selectedConseilEtComiteScientifique);
    }


     public findByCriteria(conseilEtComiteScientifique:ConseilEtComiteScientifiqueVo):Observable<Array<ConseilEtComiteScientifiqueVo>>{
           return this.http.post<Array<ConseilEtComiteScientifiqueVo>>(this.API +'search', conseilEtComiteScientifique);
    }

   public findByIdWithAssociatedList(conseilEtComiteScientifique:ConseilEtComiteScientifiqueVo):Observable<ConseilEtComiteScientifiqueVo>{
         return this.http.get<ConseilEtComiteScientifiqueVo>(this.API + 'detail/id/' +conseilEtComiteScientifique.id);
    }

    // getters and setters


    get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
    if(this._conseilEtComiteScientifiques==null){
    this._conseilEtComiteScientifiques=new Array<ConseilEtComiteScientifiqueVo>();
    }
return this._conseilEtComiteScientifiques;
       }

    set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this._conseilEtComiteScientifiques = value;
       }

    get selectedConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
    if(this._selectedConseilEtComiteScientifique==null){
    this._selectedConseilEtComiteScientifique=new ConseilEtComiteScientifiqueVo();
    }
           return this._selectedConseilEtComiteScientifique;
       }

    set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this._selectedConseilEtComiteScientifique = value;
       }

    get conseilEtComiteScientifiqueSelections(): Array<ConseilEtComiteScientifiqueVo> {
    if(this._conseilEtComiteScientifiqueSelections==null){
    this._conseilEtComiteScientifiqueSelections=new Array<ConseilEtComiteScientifiqueVo>();
    }
        return this._conseilEtComiteScientifiqueSelections;
       }


    set conseilEtComiteScientifiqueSelections(value: Array<ConseilEtComiteScientifiqueVo>) {
        this._conseilEtComiteScientifiqueSelections = value;
       }

    get createConseilEtComiteScientifiqueDialog(): boolean {
        return this._createConseilEtComiteScientifiqueDialog;
       }

    set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this._createConseilEtComiteScientifiqueDialog = value;
       }

    get editConseilEtComiteScientifiqueDialog(): boolean {
        return this._editConseilEtComiteScientifiqueDialog;
       }

    set editConseilEtComiteScientifiqueDialog(value: boolean) {
        this._editConseilEtComiteScientifiqueDialog = value;
       }

    get viewConseilEtComiteScientifiqueDialog(): boolean {
        return this._viewConseilEtComiteScientifiqueDialog;
       }

    set viewConseilEtComiteScientifiqueDialog(value: boolean) {
        this._viewConseilEtComiteScientifiqueDialog = value;
       }

     get searchConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
     if(this._searchConseilEtComiteScientifique==null){
    this._searchConseilEtComiteScientifique=new ConseilEtComiteScientifiqueVo();
    }
        return this._searchConseilEtComiteScientifique;
    }

    set searchConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this._searchConseilEtComiteScientifique = value;
       }

}
