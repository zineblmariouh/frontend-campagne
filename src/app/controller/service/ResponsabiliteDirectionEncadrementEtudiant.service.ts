import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../model/ResponsabiliteDirectionEncadrementEtudiant.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabiliteDirectionEncadrementEtudiantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabiliteDirectionEncadrementEtudiant/';
        })
    }
     private _responsabiliteDirectionEncadrementEtudiants: Array<ResponsabiliteDirectionEncadrementEtudiantVo> ;
     private _selectedResponsabiliteDirectionEncadrementEtudiant: ResponsabiliteDirectionEncadrementEtudiantVo;
     private _responsabiliteDirectionEncadrementEtudiantSelections: Array<ResponsabiliteDirectionEncadrementEtudiantVo>;
     private _createResponsabiliteDirectionEncadrementEtudiantDialog: boolean;
     private _editResponsabiliteDirectionEncadrementEtudiantDialog: boolean;
     private _viewResponsabiliteDirectionEncadrementEtudiantDialog: boolean;
     public editResponsabiliteDirectionEncadrementEtudiant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo ;

    // methods
    public archiver(responsabiliteDirectionEncadrementEtudiant: ResponsabiliteDirectionEncadrementEtudiantVo): Observable<ResponsabiliteDirectionEncadrementEtudiantVo> {
        return this.http.put<ResponsabiliteDirectionEncadrementEtudiantVo>(this.API + 'archiver/' ,responsabiliteDirectionEncadrementEtudiant);
    }
    public desarchiver(responsabiliteDirectionEncadrementEtudiant: ResponsabiliteDirectionEncadrementEtudiantVo): Observable<ResponsabiliteDirectionEncadrementEtudiantVo> {
    return this.http.put<ResponsabiliteDirectionEncadrementEtudiantVo>(this.API + 'desarchiver/' ,responsabiliteDirectionEncadrementEtudiant);
    }

    public findAll(){
     return this.http.get<Array<ResponsabiliteDirectionEncadrementEtudiantVo>>(this.API);
    }

    public save(): Observable<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.http.post<ResponsabiliteDirectionEncadrementEtudiantVo>(this.API, {...this.selectedResponsabiliteDirectionEncadrementEtudiant,dateCreation: moment(this.selectedResponsabiliteDirectionEncadrementEtudiant.dateCreation).format("YYYY-MM-DD")});
    }

    delete(responsabiliteDirectionEncadrementEtudiant: ResponsabiliteDirectionEncadrementEtudiantVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabiliteDirectionEncadrementEtudiant.id);
    }


    public edit(): Observable<ResponsabiliteDirectionEncadrementEtudiantVo> {
        return this.http.put<ResponsabiliteDirectionEncadrementEtudiantVo>(this.API, this.selectedResponsabiliteDirectionEncadrementEtudiant);
    }


     public findByCriteria(responsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo):Observable<Array<ResponsabiliteDirectionEncadrementEtudiantVo>>{
           return this.http.post<Array<ResponsabiliteDirectionEncadrementEtudiantVo>>(this.API +'search', responsabiliteDirectionEncadrementEtudiant);
    }

   public findByIdWithAssociatedList(responsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo):Observable<ResponsabiliteDirectionEncadrementEtudiantVo>{
         return this.http.get<ResponsabiliteDirectionEncadrementEtudiantVo>(this.API + 'detail/id/' +responsabiliteDirectionEncadrementEtudiant.id);
    }

    // getters and setters


    get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
    if(this._responsabiliteDirectionEncadrementEtudiants==null){
    this._responsabiliteDirectionEncadrementEtudiants=new Array<ResponsabiliteDirectionEncadrementEtudiantVo>();
    }
return this._responsabiliteDirectionEncadrementEtudiants;
       }

    set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this._responsabiliteDirectionEncadrementEtudiants = value;
       }

    get selectedResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
    if(this._selectedResponsabiliteDirectionEncadrementEtudiant==null){
    this._selectedResponsabiliteDirectionEncadrementEtudiant=new ResponsabiliteDirectionEncadrementEtudiantVo();
    }
           return this._selectedResponsabiliteDirectionEncadrementEtudiant;
       }

    set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this._selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }

    get responsabiliteDirectionEncadrementEtudiantSelections(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
    if(this._responsabiliteDirectionEncadrementEtudiantSelections==null){
    this._responsabiliteDirectionEncadrementEtudiantSelections=new Array<ResponsabiliteDirectionEncadrementEtudiantVo>();
    }
        return this._responsabiliteDirectionEncadrementEtudiantSelections;
       }


    set responsabiliteDirectionEncadrementEtudiantSelections(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this._responsabiliteDirectionEncadrementEtudiantSelections = value;
       }

    get createResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
        return this._createResponsabiliteDirectionEncadrementEtudiantDialog;
       }

    set createResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this._createResponsabiliteDirectionEncadrementEtudiantDialog = value;
       }

    get editResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
        return this._editResponsabiliteDirectionEncadrementEtudiantDialog;
       }

    set editResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this._editResponsabiliteDirectionEncadrementEtudiantDialog = value;
       }

    get viewResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
        return this._viewResponsabiliteDirectionEncadrementEtudiantDialog;
       }

    set viewResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this._viewResponsabiliteDirectionEncadrementEtudiantDialog = value;
       }

     get searchResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
     if(this._searchResponsabiliteDirectionEncadrementEtudiant==null){
    this._searchResponsabiliteDirectionEncadrementEtudiant=new ResponsabiliteDirectionEncadrementEtudiantVo();
    }
        return this._searchResponsabiliteDirectionEncadrementEtudiant;
    }

    set searchResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this._searchResponsabiliteDirectionEncadrementEtudiant = value;
       }

}
