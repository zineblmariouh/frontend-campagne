import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueLangueVo} from '../model/OutilPedagogiqueLangue.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {OutilPedagogiqueEnjeuxIrdVo} from '../model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiquePaysDiffusionVo} from '../model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePubliqueCibleVo} from '../model/OutilPedagogiquePubliqueCible.model';
import {TypeOutilPedagogiqueVo} from '../model/TypeOutilPedagogique.model';
import {OutilPedagogiquePaysConceptionVo} from '../model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiqueInstrumentIrdVo} from '../model/OutilPedagogiqueInstrumentIrd.model';
import {CultureScientifiqueVo} from '../model/CultureScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../model/OutilPedagogiqueDisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogique/';
        })
    }
     private _outilPedagogiques: Array<OutilPedagogiqueVo> ;
     private _selectedOutilPedagogique: OutilPedagogiqueVo;
     private _outilPedagogiqueSelections: Array<OutilPedagogiqueVo>;
     private _createOutilPedagogiqueDialog: boolean;
     private _editOutilPedagogiqueDialog: boolean;
     private _viewOutilPedagogiqueDialog: boolean;
     public editOutilPedagogique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogique:OutilPedagogiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueVo> {
           return this.http.post<OutilPedagogiqueVo>(this.API, {...this.selectedOutilPedagogique,dateDiffusion: moment(this.selectedOutilPedagogique.dateDiffusion).format("YYYY-MM-DD")});
    }

    delete(outilPedagogique: OutilPedagogiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogique.id);
    }


    public edit(): Observable<OutilPedagogiqueVo> {
        return this.http.put<OutilPedagogiqueVo>(this.API, this.selectedOutilPedagogique);
    }


     public findByCriteria(outilPedagogique:OutilPedagogiqueVo):Observable<Array<OutilPedagogiqueVo>>{
           return this.http.post<Array<OutilPedagogiqueVo>>(this.API +'search', outilPedagogique);
    }

   public findByIdWithAssociatedList(outilPedagogique:OutilPedagogiqueVo):Observable<OutilPedagogiqueVo>{
         return this.http.get<OutilPedagogiqueVo>(this.API + 'detail/id/' +outilPedagogique.id);
    }

    // getters and setters


    get outilPedagogiques(): Array<OutilPedagogiqueVo> {
    if(this._outilPedagogiques==null){
    this._outilPedagogiques=new Array<OutilPedagogiqueVo>();
    }
return this._outilPedagogiques;
       }

    set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this._outilPedagogiques = value;
       }

    get selectedOutilPedagogique(): OutilPedagogiqueVo {
    if(this._selectedOutilPedagogique==null){
    this._selectedOutilPedagogique=new OutilPedagogiqueVo();
    }
           return this._selectedOutilPedagogique;
       }

    set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this._selectedOutilPedagogique = value;
       }

    get outilPedagogiqueSelections(): Array<OutilPedagogiqueVo> {
    if(this._outilPedagogiqueSelections==null){
    this._outilPedagogiqueSelections=new Array<OutilPedagogiqueVo>();
    }
        return this._outilPedagogiqueSelections;
       }


    set outilPedagogiqueSelections(value: Array<OutilPedagogiqueVo>) {
        this._outilPedagogiqueSelections = value;
       }

    get createOutilPedagogiqueDialog(): boolean {
        return this._createOutilPedagogiqueDialog;
       }

    set createOutilPedagogiqueDialog(value: boolean) {
        this._createOutilPedagogiqueDialog = value;
       }

    get editOutilPedagogiqueDialog(): boolean {
        return this._editOutilPedagogiqueDialog;
       }

    set editOutilPedagogiqueDialog(value: boolean) {
        this._editOutilPedagogiqueDialog = value;
       }

    get viewOutilPedagogiqueDialog(): boolean {
        return this._viewOutilPedagogiqueDialog;
       }

    set viewOutilPedagogiqueDialog(value: boolean) {
        this._viewOutilPedagogiqueDialog = value;
       }

     get searchOutilPedagogique(): OutilPedagogiqueVo {
     if(this._searchOutilPedagogique==null){
    this._searchOutilPedagogique=new OutilPedagogiqueVo();
    }
        return this._searchOutilPedagogique;
    }

    set searchOutilPedagogique(value: OutilPedagogiqueVo) {
        this._searchOutilPedagogique = value;
       }

}
