import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../model/EtablissementConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {PaysCommanditaireVo} from '../model/PaysCommanditaire.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {TypeExpertiseVo} from '../model/TypeExpertise.model';
import {NatureExpertiseVo} from '../model/NatureExpertise.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ExpertiseVo} from '../model/Expertise.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/consultanceScientifiquePonctuelle/';
        })
    }
     private _consultanceScientifiquePonctuelles: Array<ConsultanceScientifiquePonctuelleVo> ;
     private _selectedConsultanceScientifiquePonctuelle: ConsultanceScientifiquePonctuelleVo;
     private _consultanceScientifiquePonctuelleSelections: Array<ConsultanceScientifiquePonctuelleVo>;
     private _createConsultanceScientifiquePonctuelleDialog: boolean;
     private _editConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewConsultanceScientifiquePonctuelleDialog: boolean;
     public editConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConsultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<ConsultanceScientifiquePonctuelleVo> {
           return this.http.post<ConsultanceScientifiquePonctuelleVo>(this.API, {...this.selectedConsultanceScientifiquePonctuelle,dateFin: moment(this.selectedConsultanceScientifiquePonctuelle.dateFin).format("YYYY-MM-DD")});
    }

    delete(consultanceScientifiquePonctuelle: ConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + consultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<ConsultanceScientifiquePonctuelleVo> {
        return this.http.put<ConsultanceScientifiquePonctuelleVo>(this.API, this.selectedConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(consultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo):Observable<Array<ConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<ConsultanceScientifiquePonctuelleVo>>(this.API +'search', consultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(consultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo):Observable<ConsultanceScientifiquePonctuelleVo>{
         return this.http.get<ConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +consultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
    if(this._consultanceScientifiquePonctuelles==null){
    this._consultanceScientifiquePonctuelles=new Array<ConsultanceScientifiquePonctuelleVo>();
    }
return this._consultanceScientifiquePonctuelles;
       }

    set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this._consultanceScientifiquePonctuelles = value;
       }

    get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
    if(this._selectedConsultanceScientifiquePonctuelle==null){
    this._selectedConsultanceScientifiquePonctuelle=new ConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedConsultanceScientifiquePonctuelle;
       }

    set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this._selectedConsultanceScientifiquePonctuelle = value;
       }

    get consultanceScientifiquePonctuelleSelections(): Array<ConsultanceScientifiquePonctuelleVo> {
    if(this._consultanceScientifiquePonctuelleSelections==null){
    this._consultanceScientifiquePonctuelleSelections=new Array<ConsultanceScientifiquePonctuelleVo>();
    }
        return this._consultanceScientifiquePonctuelleSelections;
       }


    set consultanceScientifiquePonctuelleSelections(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this._consultanceScientifiquePonctuelleSelections = value;
       }

    get createConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createConsultanceScientifiquePonctuelleDialog;
       }

    set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createConsultanceScientifiquePonctuelleDialog = value;
       }

    get editConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editConsultanceScientifiquePonctuelleDialog;
       }

    set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewConsultanceScientifiquePonctuelleDialog;
       }

    set viewConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
     if(this._searchConsultanceScientifiquePonctuelle==null){
    this._searchConsultanceScientifiquePonctuelle=new ConsultanceScientifiquePonctuelleVo();
    }
        return this._searchConsultanceScientifiquePonctuelle;
    }

    set searchConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this._searchConsultanceScientifiquePonctuelle = value;
       }

}
