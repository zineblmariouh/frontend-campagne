import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.model';
import {CaracterisationVo} from '../model/Caracterisation.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/caracterisationDeveloppementDeSavoirEtInnovationScientifique/';
        })
    }
     private _caracterisationDeveloppementDeSavoirEtInnovationScientifiques: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> ;
     private _selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo;
     private _caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>;
     private _createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     private _editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     private _viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     public editCaracterisationDeveloppementDeSavoirEtInnovationScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>>(this.API);
    }

    public save(): Observable<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
         return this.http.post<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API, this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique);
    }

    delete(caracterisationDeveloppementDeSavoirEtInnovationScientifique: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + caracterisationDeveloppementDeSavoirEtInnovationScientifique.id);
    }


    public edit(): Observable<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
        return this.http.put<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API, this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique);
    }


     public findByCriteria(caracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo):Observable<Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>>{
           return this.http.post<Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>>(this.API +'search', caracterisationDeveloppementDeSavoirEtInnovationScientifique);
    }

   public findByIdWithAssociatedList(caracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo):Observable<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>{
         return this.http.get<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API + 'detail/id/' +caracterisationDeveloppementDeSavoirEtInnovationScientifique.id);
    }

    // getters and setters


    get caracterisationDeveloppementDeSavoirEtInnovationScientifiques(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if(this._caracterisationDeveloppementDeSavoirEtInnovationScientifiques==null){
    this._caracterisationDeveloppementDeSavoirEtInnovationScientifiques=new Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>();
    }
return this._caracterisationDeveloppementDeSavoirEtInnovationScientifiques;
       }

    set caracterisationDeveloppementDeSavoirEtInnovationScientifiques(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this._caracterisationDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

    get selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique(): CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
    if(this._selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique==null){
    this._selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique=new CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo();
    }
           return this._selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
       }

    set selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this._selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }

    get caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if(this._caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections==null){
    this._caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections=new Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>();
    }
        return this._caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections;
       }


    set caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this._caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections = value;
       }

    get createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

    get editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

    get viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

     get searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique(): CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
     if(this._searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique==null){
    this._searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique=new CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo();
    }
        return this._searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
    }

    set searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this._searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }

}
