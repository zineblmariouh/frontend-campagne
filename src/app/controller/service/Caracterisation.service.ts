import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CaracterisationVo} from '../model/Caracterisation.model';


@Injectable({
  providedIn: 'root'
})
export class CaracterisationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/caracterisation/';
        })
    }
     private _caracterisations: Array<CaracterisationVo> ;
     private _selectedCaracterisation: CaracterisationVo;
     private _caracterisationSelections: Array<CaracterisationVo>;
     private _createCaracterisationDialog: boolean;
     private _editCaracterisationDialog: boolean;
     private _viewCaracterisationDialog: boolean;
     public editCaracterisation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCaracterisation:CaracterisationVo ;

    // methods
    public archiver(caracterisation: CaracterisationVo): Observable<CaracterisationVo> {
        return this.http.put<CaracterisationVo>(this.API + 'archiver/' ,caracterisation);
    }
    public desarchiver(caracterisation: CaracterisationVo): Observable<CaracterisationVo> {
    return this.http.put<CaracterisationVo>(this.API + 'desarchiver/' ,caracterisation);
    }

    public findAll(){
     return this.http.get<Array<CaracterisationVo>>(this.API);
    }

    public save(): Observable<CaracterisationVo> {
           return this.http.post<CaracterisationVo>(this.API, {...this.selectedCaracterisation,dateCreation: moment(this.selectedCaracterisation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(caracterisation: CaracterisationVo) {
         return this.http.delete<number>(this.API + 'id/' + caracterisation.id);
    }


    public edit(): Observable<CaracterisationVo> {
        return this.http.put<CaracterisationVo>(this.API, this.selectedCaracterisation);
    }


     public findByCriteria(caracterisation:CaracterisationVo):Observable<Array<CaracterisationVo>>{
           return this.http.post<Array<CaracterisationVo>>(this.API +'search', caracterisation);
    }

   public findByIdWithAssociatedList(caracterisation:CaracterisationVo):Observable<CaracterisationVo>{
         return this.http.get<CaracterisationVo>(this.API + 'detail/id/' +caracterisation.id);
    }

    // getters and setters


    get caracterisations(): Array<CaracterisationVo> {
    if(this._caracterisations==null){
    this._caracterisations=new Array<CaracterisationVo>();
    }
return this._caracterisations;
       }

    set caracterisations(value: Array<CaracterisationVo>) {
        this._caracterisations = value;
       }

    get selectedCaracterisation(): CaracterisationVo {
    if(this._selectedCaracterisation==null){
    this._selectedCaracterisation=new CaracterisationVo();
    }
           return this._selectedCaracterisation;
       }

    set selectedCaracterisation(value: CaracterisationVo) {
        this._selectedCaracterisation = value;
       }

    get caracterisationSelections(): Array<CaracterisationVo> {
    if(this._caracterisationSelections==null){
    this._caracterisationSelections=new Array<CaracterisationVo>();
    }
        return this._caracterisationSelections;
       }


    set caracterisationSelections(value: Array<CaracterisationVo>) {
        this._caracterisationSelections = value;
       }

    get createCaracterisationDialog(): boolean {
        return this._createCaracterisationDialog;
       }

    set createCaracterisationDialog(value: boolean) {
        this._createCaracterisationDialog = value;
       }

    get editCaracterisationDialog(): boolean {
        return this._editCaracterisationDialog;
       }

    set editCaracterisationDialog(value: boolean) {
        this._editCaracterisationDialog = value;
       }

    get viewCaracterisationDialog(): boolean {
        return this._viewCaracterisationDialog;
       }

    set viewCaracterisationDialog(value: boolean) {
        this._viewCaracterisationDialog = value;
       }

     get searchCaracterisation(): CaracterisationVo {
     if(this._searchCaracterisation==null){
    this._searchCaracterisation=new CaracterisationVo();
    }
        return this._searchCaracterisation;
    }

    set searchCaracterisation(value: CaracterisationVo) {
        this._searchCaracterisation = value;
       }

}
