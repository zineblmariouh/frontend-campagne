import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementVo} from '../model/Enseignement.model';
import {EnseignementEtFormationVo} from '../model/EnseignementEtFormation.model';
import {EnseignementDisciplineScientifiqueVo} from '../model/EnseignementDisciplineScientifique.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EnseignementNatureVo} from '../model/EnseignementNature.model';
import {EnseignementEnjeuxIrdVo} from '../model/EnseignementEnjeuxIrd.model';
import {NiveauEtudeEnseignementVo} from '../model/NiveauEtudeEnseignement.model';
import {EtablissementEnseignementVo} from '../model/EtablissementEnseignement.model';
import {TypeEtudeEnseignementVo} from '../model/TypeEtudeEnseignement.model';
import {ModaliteEtudeVo} from '../model/ModaliteEtude.model';
import {EnseignementZoneGeographiqueVo} from '../model/EnseignementZoneGeographique.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignement/';
        })
    }
     private _enseignements: Array<EnseignementVo> ;
     private _selectedEnseignement: EnseignementVo;
     private _enseignementSelections: Array<EnseignementVo>;
     private _createEnseignementDialog: boolean;
     private _editEnseignementDialog: boolean;
     private _viewEnseignementDialog: boolean;
     public editEnseignement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignement:EnseignementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnseignementVo>>(this.API);
    }

    public save(): Observable<EnseignementVo> {
         return this.http.post<EnseignementVo>(this.API, this.selectedEnseignement);
    }

    delete(enseignement: EnseignementVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignement.id);
    }


    public edit(): Observable<EnseignementVo> {
        return this.http.put<EnseignementVo>(this.API, this.selectedEnseignement);
    }


     public findByCriteria(enseignement:EnseignementVo):Observable<Array<EnseignementVo>>{
           return this.http.post<Array<EnseignementVo>>(this.API +'search', enseignement);
    }

   public findByIdWithAssociatedList(enseignement:EnseignementVo):Observable<EnseignementVo>{
         return this.http.get<EnseignementVo>(this.API + 'detail/id/' +enseignement.id);
    }

    // getters and setters


    get enseignements(): Array<EnseignementVo> {
    if(this._enseignements==null){
    this._enseignements=new Array<EnseignementVo>();
    }
return this._enseignements;
       }

    set enseignements(value: Array<EnseignementVo>) {
        this._enseignements = value;
       }

    get selectedEnseignement(): EnseignementVo {
    if(this._selectedEnseignement==null){
    this._selectedEnseignement=new EnseignementVo();
    }
           return this._selectedEnseignement;
       }

    set selectedEnseignement(value: EnseignementVo) {
        this._selectedEnseignement = value;
       }

    get enseignementSelections(): Array<EnseignementVo> {
    if(this._enseignementSelections==null){
    this._enseignementSelections=new Array<EnseignementVo>();
    }
        return this._enseignementSelections;
       }


    set enseignementSelections(value: Array<EnseignementVo>) {
        this._enseignementSelections = value;
       }

    get createEnseignementDialog(): boolean {
        return this._createEnseignementDialog;
       }

    set createEnseignementDialog(value: boolean) {
        this._createEnseignementDialog = value;
       }

    get editEnseignementDialog(): boolean {
        return this._editEnseignementDialog;
       }

    set editEnseignementDialog(value: boolean) {
        this._editEnseignementDialog = value;
       }

    get viewEnseignementDialog(): boolean {
        return this._viewEnseignementDialog;
       }

    set viewEnseignementDialog(value: boolean) {
        this._viewEnseignementDialog = value;
       }

     get searchEnseignement(): EnseignementVo {
     if(this._searchEnseignement==null){
    this._searchEnseignement=new EnseignementVo();
    }
        return this._searchEnseignement;
    }

    set searchEnseignement(value: EnseignementVo) {
        this._searchEnseignement = value;
       }

}
