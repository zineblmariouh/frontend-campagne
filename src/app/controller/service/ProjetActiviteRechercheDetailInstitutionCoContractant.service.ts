import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {ProjetActiviteRechercheDetailVo} from '../model/ProjetActiviteRechercheDetail.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetActiviteRechercheDetailInstitutionCoContractantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projetActiviteRechercheDetailInstitutionCoContractant/';
        })
    }
     private _projetActiviteRechercheDetailInstitutionCoContractants: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> ;
     private _selectedProjetActiviteRechercheDetailInstitutionCoContractant: ProjetActiviteRechercheDetailInstitutionCoContractantVo;
     private _projetActiviteRechercheDetailInstitutionCoContractantSelections: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>;
     private _createProjetActiviteRechercheDetailInstitutionCoContractantDialog: boolean;
     private _editProjetActiviteRechercheDetailInstitutionCoContractantDialog: boolean;
     private _viewProjetActiviteRechercheDetailInstitutionCoContractantDialog: boolean;
     public editProjetActiviteRechercheDetailInstitutionCoContractant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>>(this.API);
    }

    public save(): Observable<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
         return this.http.post<ProjetActiviteRechercheDetailInstitutionCoContractantVo>(this.API, this.selectedProjetActiviteRechercheDetailInstitutionCoContractant);
    }

    delete(projetActiviteRechercheDetailInstitutionCoContractant: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
         return this.http.delete<number>(this.API + 'id/' + projetActiviteRechercheDetailInstitutionCoContractant.id);
    }


    public edit(): Observable<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
        return this.http.put<ProjetActiviteRechercheDetailInstitutionCoContractantVo>(this.API, this.selectedProjetActiviteRechercheDetailInstitutionCoContractant);
    }


     public findByCriteria(projetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo):Observable<Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>>{
           return this.http.post<Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>>(this.API +'search', projetActiviteRechercheDetailInstitutionCoContractant);
    }

   public findByIdWithAssociatedList(projetActiviteRechercheDetailInstitutionCoContractant:ProjetActiviteRechercheDetailInstitutionCoContractantVo):Observable<ProjetActiviteRechercheDetailInstitutionCoContractantVo>{
         return this.http.get<ProjetActiviteRechercheDetailInstitutionCoContractantVo>(this.API + 'detail/id/' +projetActiviteRechercheDetailInstitutionCoContractant.id);
    }

    // getters and setters


    get projetActiviteRechercheDetailInstitutionCoContractants(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
    if(this._projetActiviteRechercheDetailInstitutionCoContractants==null){
    this._projetActiviteRechercheDetailInstitutionCoContractants=new Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>();
    }
return this._projetActiviteRechercheDetailInstitutionCoContractants;
       }

    set projetActiviteRechercheDetailInstitutionCoContractants(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
        this._projetActiviteRechercheDetailInstitutionCoContractants = value;
       }

    get selectedProjetActiviteRechercheDetailInstitutionCoContractant(): ProjetActiviteRechercheDetailInstitutionCoContractantVo {
    if(this._selectedProjetActiviteRechercheDetailInstitutionCoContractant==null){
    this._selectedProjetActiviteRechercheDetailInstitutionCoContractant=new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
    }
           return this._selectedProjetActiviteRechercheDetailInstitutionCoContractant;
       }

    set selectedProjetActiviteRechercheDetailInstitutionCoContractant(value: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this._selectedProjetActiviteRechercheDetailInstitutionCoContractant = value;
       }

    get projetActiviteRechercheDetailInstitutionCoContractantSelections(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
    if(this._projetActiviteRechercheDetailInstitutionCoContractantSelections==null){
    this._projetActiviteRechercheDetailInstitutionCoContractantSelections=new Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>();
    }
        return this._projetActiviteRechercheDetailInstitutionCoContractantSelections;
       }


    set projetActiviteRechercheDetailInstitutionCoContractantSelections(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
        this._projetActiviteRechercheDetailInstitutionCoContractantSelections = value;
       }

    get createProjetActiviteRechercheDetailInstitutionCoContractantDialog(): boolean {
        return this._createProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }

    set createProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this._createProjetActiviteRechercheDetailInstitutionCoContractantDialog = value;
       }

    get editProjetActiviteRechercheDetailInstitutionCoContractantDialog(): boolean {
        return this._editProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }

    set editProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this._editProjetActiviteRechercheDetailInstitutionCoContractantDialog = value;
       }

    get viewProjetActiviteRechercheDetailInstitutionCoContractantDialog(): boolean {
        return this._viewProjetActiviteRechercheDetailInstitutionCoContractantDialog;
       }

    set viewProjetActiviteRechercheDetailInstitutionCoContractantDialog(value: boolean) {
        this._viewProjetActiviteRechercheDetailInstitutionCoContractantDialog = value;
       }

     get searchProjetActiviteRechercheDetailInstitutionCoContractant(): ProjetActiviteRechercheDetailInstitutionCoContractantVo {
     if(this._searchProjetActiviteRechercheDetailInstitutionCoContractant==null){
    this._searchProjetActiviteRechercheDetailInstitutionCoContractant=new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
    }
        return this._searchProjetActiviteRechercheDetailInstitutionCoContractant;
    }

    set searchProjetActiviteRechercheDetailInstitutionCoContractant(value: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this._searchProjetActiviteRechercheDetailInstitutionCoContractant = value;
       }

}
