import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {FormatRencontreVo} from '../model/FormatRencontre.model';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../model/PaysRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {PaysVo} from '../model/Pays.model';
import {CultureScientifiqueVo} from '../model/CultureScientifique.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {StructureOganisatriceVo} from '../model/StructureOganisatrice.model';
import {ContexteVo} from '../model/Contexte.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePublique/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliques: Array<RencontreGrandPubliqueJeunePubliqueVo> ;
     private _selectedRencontreGrandPubliqueJeunePublique: RencontreGrandPubliqueJeunePubliqueVo;
     private _rencontreGrandPubliqueJeunePubliqueSelections: Array<RencontreGrandPubliqueJeunePubliqueVo>;
     private _createRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     public editRencontreGrandPubliqueJeunePublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliqueVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliqueVo> {
         return this.http.post<RencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedRencontreGrandPubliqueJeunePublique);
    }

    delete(rencontreGrandPubliqueJeunePublique: RencontreGrandPubliqueJeunePubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePublique.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliqueVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedRencontreGrandPubliqueJeunePublique);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo):Observable<Array<RencontreGrandPubliqueJeunePubliqueVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliqueVo>>(this.API +'search', rencontreGrandPubliqueJeunePublique);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo):Observable<RencontreGrandPubliqueJeunePubliqueVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliqueVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePublique.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
    if(this._rencontreGrandPubliqueJeunePubliques==null){
    this._rencontreGrandPubliqueJeunePubliques=new Array<RencontreGrandPubliqueJeunePubliqueVo>();
    }
return this._rencontreGrandPubliqueJeunePubliques;
       }

    set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this._rencontreGrandPubliqueJeunePubliques = value;
       }

    get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
    if(this._selectedRencontreGrandPubliqueJeunePublique==null){
    this._selectedRencontreGrandPubliqueJeunePublique=new RencontreGrandPubliqueJeunePubliqueVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePublique;
       }

    set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this._selectedRencontreGrandPubliqueJeunePublique = value;
       }

    get rencontreGrandPubliqueJeunePubliqueSelections(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueSelections==null){
    this._rencontreGrandPubliqueJeunePubliqueSelections=new Array<RencontreGrandPubliqueJeunePubliqueVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliqueSelections;
       }


    set rencontreGrandPubliqueJeunePubliqueSelections(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this._rencontreGrandPubliqueJeunePubliqueSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
     if(this._searchRencontreGrandPubliqueJeunePublique==null){
    this._searchRencontreGrandPubliqueJeunePublique=new RencontreGrandPubliqueJeunePubliqueVo();
    }
        return this._searchRencontreGrandPubliqueJeunePublique;
    }

    set searchRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this._searchRencontreGrandPubliqueJeunePublique = value;
       }

}
