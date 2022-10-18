import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailPaysVo} from '../model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheVo} from '../model/ProjetActiviteRecherche.model';
import {RoleProjetVo} from '../model/RoleProjet.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {StatusProjetVo} from '../model/StatusProjet.model';
import {EtablissementVo} from '../model/Etablissement.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {PaysVo} from '../model/Pays.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../model/ProjetActiviteRechercheDetailInstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetail/';
        })
    }
     private _projetActiviteRechercheDetails: Array<ProjetActiviteRechercheDetailVo> ;
     private _selectedProjetActiviteRechercheDetail: ProjetActiviteRechercheDetailVo;
     private _projetActiviteRechercheDetailSelections: Array<ProjetActiviteRechercheDetailVo>;
     private _createProjetActiviteRechercheDetailDialog: boolean;
     private _editProjetActiviteRechercheDetailDialog: boolean;
     private _viewProjetActiviteRechercheDetailDialog: boolean;
     public editProjetActiviteRechercheDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailVo> {
         return this.http.post<ProjetActiviteRechercheDetailVo>(this.API, this.selectedProjetActiviteRechercheDetail);
    }

    delete(projetActiviteRechercheDetail: ProjetActiviteRechercheDetailVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetail.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailVo> {
        return this.http.put<ProjetActiviteRechercheDetailVo>(this.API, this.selectedProjetActiviteRechercheDetail);
    }


     public findByCriteria(projetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo):Observable<Array<ProjetActiviteRechercheDetailVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailVo>>(this.API +'search', projetActiviteRechercheDetail);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetail:ProjetActiviteRechercheDetailVo):Observable<ProjetActiviteRechercheDetailVo>{
         return this.http.get<ProjetActiviteRechercheDetailVo>(this.API + 'detail/id/' +projetActiviteRechercheDetail.id);
    }

    // getters and setters


    get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
    if(this._projetActiviteRechercheDetails==null){
    this._projetActiviteRechercheDetails=new Array<ProjetActiviteRechercheDetailVo>();
    }
return this._projetActiviteRechercheDetails;
       }

    set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this._projetActiviteRechercheDetails = value;
       }

    get selectedProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
    if(this._selectedProjetActiviteRechercheDetail==null){
    this._selectedProjetActiviteRechercheDetail=new ProjetActiviteRechercheDetailVo();
    }
           return this._selectedProjetActiviteRechercheDetail;
       }

    set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this._selectedProjetActiviteRechercheDetail = value;
       }

    get projetActiviteRechercheDetailSelections(): Array<ProjetActiviteRechercheDetailVo> {
    if(this._projetActiviteRechercheDetailSelections==null){
    this._projetActiviteRechercheDetailSelections=new Array<ProjetActiviteRechercheDetailVo>();
    }
        return this._projetActiviteRechercheDetailSelections;
       }


    set projetActiviteRechercheDetailSelections(value: Array<ProjetActiviteRechercheDetailVo>) {
        this._projetActiviteRechercheDetailSelections = value;
       }

    get createProjetActiviteRechercheDetailDialog(): boolean {
        return this._createProjetActiviteRechercheDetailDialog;
       }

    set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailDialog = value;
       }

    get editProjetActiviteRechercheDetailDialog(): boolean {
        return this._editProjetActiviteRechercheDetailDialog;
       }

    set editProjetActiviteRechercheDetailDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailDialog = value;
       }

    get viewProjetActiviteRechercheDetailDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailDialog;
       }

    set viewProjetActiviteRechercheDetailDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailDialog = value;
       }

     get searchProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
     if(this._searchProjetActiviteRechercheDetail==null){
    this._searchProjetActiviteRechercheDetail=new ProjetActiviteRechercheDetailVo();
    }
        return this._searchProjetActiviteRechercheDetail;
    }

    set searchProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this._searchProjetActiviteRechercheDetail = value;
       }

}
