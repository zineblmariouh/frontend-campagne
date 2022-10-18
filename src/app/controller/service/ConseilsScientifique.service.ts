import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EnjeuxIrdConseilsScientifiqueVo} from '../model/EnjeuxIrdConseilsScientifique.model';
import {NatureExpertiseVo} from '../model/NatureExpertise.model';
import {TypeExpertiseVo} from '../model/TypeExpertise.model';
import {EtablissementConseilsScientifiqueVo} from '../model/EtablissementConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../model/DisciplineScientifiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../model/ZoneGeographiqueConseilsScientifique.model';
import {ExpertiseVo} from '../model/Expertise.model';


@Injectable({
  providedIn: 'root'
})
export class ConseilsScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/conseilsScientifique/';
        })
    }
     private _conseilsScientifiques: Array<ConseilsScientifiqueVo> ;
     private _selectedConseilsScientifique: ConseilsScientifiqueVo;
     private _conseilsScientifiqueSelections: Array<ConseilsScientifiqueVo>;
     private _createConseilsScientifiqueDialog: boolean;
     private _editConseilsScientifiqueDialog: boolean;
     private _viewConseilsScientifiqueDialog: boolean;
     public editConseilsScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConseilsScientifique:ConseilsScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ConseilsScientifiqueVo>>(this.API);
    }

    public save(): Observable<ConseilsScientifiqueVo> {
         return this.http.post<ConseilsScientifiqueVo>(this.API, this.selectedConseilsScientifique);
    }

    delete(conseilsScientifique: ConseilsScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + conseilsScientifique.id);
    }


    public edit(): Observable<ConseilsScientifiqueVo> {
        return this.http.put<ConseilsScientifiqueVo>(this.API, this.selectedConseilsScientifique);
    }


     public findByCriteria(conseilsScientifique:ConseilsScientifiqueVo):Observable<Array<ConseilsScientifiqueVo>>{
           return this.http.post<Array<ConseilsScientifiqueVo>>(this.API +'search', conseilsScientifique);
    }

   public findByIdWithAssociatedList(conseilsScientifique:ConseilsScientifiqueVo):Observable<ConseilsScientifiqueVo>{
         return this.http.get<ConseilsScientifiqueVo>(this.API + 'detail/id/' +conseilsScientifique.id);
    }

    // getters and setters


    get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
    if(this._conseilsScientifiques==null){
    this._conseilsScientifiques=new Array<ConseilsScientifiqueVo>();
    }
return this._conseilsScientifiques;
       }

    set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this._conseilsScientifiques = value;
       }

    get selectedConseilsScientifique(): ConseilsScientifiqueVo {
    if(this._selectedConseilsScientifique==null){
    this._selectedConseilsScientifique=new ConseilsScientifiqueVo();
    }
           return this._selectedConseilsScientifique;
       }

    set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this._selectedConseilsScientifique = value;
       }

    get conseilsScientifiqueSelections(): Array<ConseilsScientifiqueVo> {
    if(this._conseilsScientifiqueSelections==null){
    this._conseilsScientifiqueSelections=new Array<ConseilsScientifiqueVo>();
    }
        return this._conseilsScientifiqueSelections;
       }


    set conseilsScientifiqueSelections(value: Array<ConseilsScientifiqueVo>) {
        this._conseilsScientifiqueSelections = value;
       }

    get createConseilsScientifiqueDialog(): boolean {
        return this._createConseilsScientifiqueDialog;
       }

    set createConseilsScientifiqueDialog(value: boolean) {
        this._createConseilsScientifiqueDialog = value;
       }

    get editConseilsScientifiqueDialog(): boolean {
        return this._editConseilsScientifiqueDialog;
       }

    set editConseilsScientifiqueDialog(value: boolean) {
        this._editConseilsScientifiqueDialog = value;
       }

    get viewConseilsScientifiqueDialog(): boolean {
        return this._viewConseilsScientifiqueDialog;
       }

    set viewConseilsScientifiqueDialog(value: boolean) {
        this._viewConseilsScientifiqueDialog = value;
       }

     get searchConseilsScientifique(): ConseilsScientifiqueVo {
     if(this._searchConseilsScientifique==null){
    this._searchConseilsScientifique=new ConseilsScientifiqueVo();
    }
        return this._searchConseilsScientifique;
    }

    set searchConseilsScientifique(value: ConseilsScientifiqueVo) {
        this._searchConseilsScientifique = value;
       }

}
