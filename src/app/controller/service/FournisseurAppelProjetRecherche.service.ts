import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FournisseurAppelProjetRechercheVo} from '../model/FournisseurAppelProjetRecherche.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class FournisseurAppelProjetRechercheService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/fournisseurAppelProjetRecherche/';
        })
    }
     private _fournisseurAppelProjetRecherches: Array<FournisseurAppelProjetRechercheVo> ;
     private _selectedFournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo;
     private _fournisseurAppelProjetRechercheSelections: Array<FournisseurAppelProjetRechercheVo>;
     private _createFournisseurAppelProjetRechercheDialog: boolean;
     private _editFournisseurAppelProjetRechercheDialog: boolean;
     private _viewFournisseurAppelProjetRechercheDialog: boolean;
     public editFournisseurAppelProjetRecherche$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo ;

    // methods
    public archiver(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo): Observable<FournisseurAppelProjetRechercheVo> {
        return this.http.put<FournisseurAppelProjetRechercheVo>(this.API + 'archiver/' ,fournisseurAppelProjetRecherche);
    }
    public desarchiver(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo): Observable<FournisseurAppelProjetRechercheVo> {
    return this.http.put<FournisseurAppelProjetRechercheVo>(this.API + 'desarchiver/' ,fournisseurAppelProjetRecherche);
    }

    public findAll(){
     return this.http.get<Array<FournisseurAppelProjetRechercheVo>>(this.API);
    }

    public save(): Observable<FournisseurAppelProjetRechercheVo> {
           return this.http.post<FournisseurAppelProjetRechercheVo>(this.API, {...this.selectedFournisseurAppelProjetRecherche,dateCreation: moment(this.selectedFournisseurAppelProjetRecherche.dateCreation).format("YYYY-MM-DD")});
    }

    delete(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {
         return this.http.delete<number>(this.API + 'id/' + fournisseurAppelProjetRecherche.id);
    }


    public edit(): Observable<FournisseurAppelProjetRechercheVo> {
        return this.http.put<FournisseurAppelProjetRechercheVo>(this.API, this.selectedFournisseurAppelProjetRecherche);
    }


     public findByCriteria(fournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo):Observable<Array<FournisseurAppelProjetRechercheVo>>{
           return this.http.post<Array<FournisseurAppelProjetRechercheVo>>(this.API +'search', fournisseurAppelProjetRecherche);
    }

   public findByIdWithAssociatedList(fournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo):Observable<FournisseurAppelProjetRechercheVo>{
         return this.http.get<FournisseurAppelProjetRechercheVo>(this.API + 'detail/id/' +fournisseurAppelProjetRecherche.id);
    }

    // getters and setters


    get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    if(this._fournisseurAppelProjetRecherches==null){
    this._fournisseurAppelProjetRecherches=new Array<FournisseurAppelProjetRechercheVo>();
    }
return this._fournisseurAppelProjetRecherches;
       }

    set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this._fournisseurAppelProjetRecherches = value;
       }

    get selectedFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
    if(this._selectedFournisseurAppelProjetRecherche==null){
    this._selectedFournisseurAppelProjetRecherche=new FournisseurAppelProjetRechercheVo();
    }
           return this._selectedFournisseurAppelProjetRecherche;
       }

    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this._selectedFournisseurAppelProjetRecherche = value;
       }

    get fournisseurAppelProjetRechercheSelections(): Array<FournisseurAppelProjetRechercheVo> {
    if(this._fournisseurAppelProjetRechercheSelections==null){
    this._fournisseurAppelProjetRechercheSelections=new Array<FournisseurAppelProjetRechercheVo>();
    }
        return this._fournisseurAppelProjetRechercheSelections;
       }


    set fournisseurAppelProjetRechercheSelections(value: Array<FournisseurAppelProjetRechercheVo>) {
        this._fournisseurAppelProjetRechercheSelections = value;
       }

    get createFournisseurAppelProjetRechercheDialog(): boolean {
        return this._createFournisseurAppelProjetRechercheDialog;
       }

    set createFournisseurAppelProjetRechercheDialog(value: boolean) {
        this._createFournisseurAppelProjetRechercheDialog = value;
       }

    get editFournisseurAppelProjetRechercheDialog(): boolean {
        return this._editFournisseurAppelProjetRechercheDialog;
       }

    set editFournisseurAppelProjetRechercheDialog(value: boolean) {
        this._editFournisseurAppelProjetRechercheDialog = value;
       }

    get viewFournisseurAppelProjetRechercheDialog(): boolean {
        return this._viewFournisseurAppelProjetRechercheDialog;
       }

    set viewFournisseurAppelProjetRechercheDialog(value: boolean) {
        this._viewFournisseurAppelProjetRechercheDialog = value;
       }

     get searchFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
     if(this._searchFournisseurAppelProjetRecherche==null){
    this._searchFournisseurAppelProjetRecherche=new FournisseurAppelProjetRechercheVo();
    }
        return this._searchFournisseurAppelProjetRecherche;
    }

    set searchFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this._searchFournisseurAppelProjetRecherche = value;
       }

}
