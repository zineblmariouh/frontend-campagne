import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtudiantVo} from '../model/Etudiant.model';
import {SexeVo} from '../model/Sexe.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etudiant/';
        })
    }
     private _etudiants: Array<EtudiantVo> ;
     private _selectedEtudiant: EtudiantVo;
     private _etudiantSelections: Array<EtudiantVo>;
     private _createEtudiantDialog: boolean;
     private _editEtudiantDialog: boolean;
     private _viewEtudiantDialog: boolean;
     public editEtudiant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtudiant:EtudiantVo ;

    // methods
    public archiver(etudiant: EtudiantVo): Observable<EtudiantVo> {
        return this.http.put<EtudiantVo>(this.API + 'archiver/' ,etudiant);
    }
    public desarchiver(etudiant: EtudiantVo): Observable<EtudiantVo> {
    return this.http.put<EtudiantVo>(this.API + 'desarchiver/' ,etudiant);
    }

    public findAll(){
     return this.http.get<Array<EtudiantVo>>(this.API);
    }

    public save(): Observable<EtudiantVo> {
           return this.http.post<EtudiantVo>(this.API, {...this.selectedEtudiant,dateCreation: moment(this.selectedEtudiant.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etudiant: EtudiantVo) {
         return this.http.delete<number>(this.API + 'id/' + etudiant.id);
    }


    public edit(): Observable<EtudiantVo> {
        return this.http.put<EtudiantVo>(this.API, this.selectedEtudiant);
    }


     public findByCriteria(etudiant:EtudiantVo):Observable<Array<EtudiantVo>>{
           return this.http.post<Array<EtudiantVo>>(this.API +'search', etudiant);
    }

   public findByIdWithAssociatedList(etudiant:EtudiantVo):Observable<EtudiantVo>{
         return this.http.get<EtudiantVo>(this.API + 'detail/id/' +etudiant.id);
    }

    // getters and setters


    get etudiants(): Array<EtudiantVo> {
    if(this._etudiants==null){
    this._etudiants=new Array<EtudiantVo>();
    }
return this._etudiants;
       }

    set etudiants(value: Array<EtudiantVo>) {
        this._etudiants = value;
       }

    get selectedEtudiant(): EtudiantVo {
    if(this._selectedEtudiant==null){
    this._selectedEtudiant=new EtudiantVo();
    }
           return this._selectedEtudiant;
       }

    set selectedEtudiant(value: EtudiantVo) {
        this._selectedEtudiant = value;
       }

    get etudiantSelections(): Array<EtudiantVo> {
    if(this._etudiantSelections==null){
    this._etudiantSelections=new Array<EtudiantVo>();
    }
        return this._etudiantSelections;
       }


    set etudiantSelections(value: Array<EtudiantVo>) {
        this._etudiantSelections = value;
       }

    get createEtudiantDialog(): boolean {
        return this._createEtudiantDialog;
       }

    set createEtudiantDialog(value: boolean) {
        this._createEtudiantDialog = value;
       }

    get editEtudiantDialog(): boolean {
        return this._editEtudiantDialog;
       }

    set editEtudiantDialog(value: boolean) {
        this._editEtudiantDialog = value;
       }

    get viewEtudiantDialog(): boolean {
        return this._viewEtudiantDialog;
       }

    set viewEtudiantDialog(value: boolean) {
        this._viewEtudiantDialog = value;
       }

     get searchEtudiant(): EtudiantVo {
     if(this._searchEtudiant==null){
    this._searchEtudiant=new EtudiantVo();
    }
        return this._searchEtudiant;
    }

    set searchEtudiant(value: EtudiantVo) {
        this._searchEtudiant = value;
       }

}
