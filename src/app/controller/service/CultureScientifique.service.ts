import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CultureScientifiqueVo} from '../model/CultureScientifique.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {NatureActiviteGrandPubliqueVo} from '../model/NatureActiviteGrandPublique.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CultureScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/cultureScientifique/';
        })
    }
     private _cultureScientifiques: Array<CultureScientifiqueVo> ;
     private _selectedCultureScientifique: CultureScientifiqueVo;
     private _cultureScientifiqueSelections: Array<CultureScientifiqueVo>;
     private _createCultureScientifiqueDialog: boolean;
     private _editCultureScientifiqueDialog: boolean;
     private _viewCultureScientifiqueDialog: boolean;
     public editCultureScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCultureScientifique:CultureScientifiqueVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<CultureScientifiqueVo>{
        return this.http.get<CultureScientifiqueVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<CultureScientifiqueVo>>{
        return this.http.get<Array<CultureScientifiqueVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<CultureScientifiqueVo>>(this.API);
    }

    public save(): Observable<CultureScientifiqueVo> {
         return this.http.post<CultureScientifiqueVo>(this.API, this.selectedCultureScientifique);
    }

    delete(cultureScientifique: CultureScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + cultureScientifique.id);
    }


    public edit(): Observable<CultureScientifiqueVo> {
        return this.http.put<CultureScientifiqueVo>(this.API, this.selectedCultureScientifique);
    }


     public findByCriteria(cultureScientifique:CultureScientifiqueVo):Observable<Array<CultureScientifiqueVo>>{
           return this.http.post<Array<CultureScientifiqueVo>>(this.API +'search', cultureScientifique);
    }

   public findByIdWithAssociatedList(cultureScientifique:CultureScientifiqueVo):Observable<CultureScientifiqueVo>{
         return this.http.get<CultureScientifiqueVo>(this.API + 'detail/id/' +cultureScientifique.id);
    }

    // getters and setters


    get cultureScientifiques(): Array<CultureScientifiqueVo> {
    if(this._cultureScientifiques==null){
    this._cultureScientifiques=new Array<CultureScientifiqueVo>();
    }
return this._cultureScientifiques;
       }

    set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this._cultureScientifiques = value;
       }

    get selectedCultureScientifique(): CultureScientifiqueVo {
    if(this._selectedCultureScientifique==null){
    this._selectedCultureScientifique=new CultureScientifiqueVo();
    }
           return this._selectedCultureScientifique;
       }

    set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this._selectedCultureScientifique = value;
       }

    get cultureScientifiqueSelections(): Array<CultureScientifiqueVo> {
    if(this._cultureScientifiqueSelections==null){
    this._cultureScientifiqueSelections=new Array<CultureScientifiqueVo>();
    }
        return this._cultureScientifiqueSelections;
       }


    set cultureScientifiqueSelections(value: Array<CultureScientifiqueVo>) {
        this._cultureScientifiqueSelections = value;
       }

    get createCultureScientifiqueDialog(): boolean {
        return this._createCultureScientifiqueDialog;
       }

    set createCultureScientifiqueDialog(value: boolean) {
        this._createCultureScientifiqueDialog = value;
       }

    get editCultureScientifiqueDialog(): boolean {
        return this._editCultureScientifiqueDialog;
       }

    set editCultureScientifiqueDialog(value: boolean) {
        this._editCultureScientifiqueDialog = value;
       }

    get viewCultureScientifiqueDialog(): boolean {
        return this._viewCultureScientifiqueDialog;
       }

    set viewCultureScientifiqueDialog(value: boolean) {
        this._viewCultureScientifiqueDialog = value;
       }

     get searchCultureScientifique(): CultureScientifiqueVo {
     if(this._searchCultureScientifique==null){
    this._searchCultureScientifique=new CultureScientifiqueVo();
    }
        return this._searchCultureScientifique;
    }

    set searchCultureScientifique(value: CultureScientifiqueVo) {
        this._searchCultureScientifique = value;
       }

}
