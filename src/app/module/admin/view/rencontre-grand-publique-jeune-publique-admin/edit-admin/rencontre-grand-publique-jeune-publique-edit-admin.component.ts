import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-edit-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-edit-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-edit-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueEditAdminComponent implements OnInit {

        selectedTypePubliqueRencontreGrandPubliqueJeunePubliques: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        typePubliqueRencontreGrandPubliqueJeunePubliquesListe: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> = [];

        myTypePubliques: Array<TypePubliqueVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesListe: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedRencontreGrandPubliqueJeunePubliquePeriodes: RencontreGrandPubliqueJeunePubliquePeriodeVo = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
        rencontreGrandPubliqueJeunePubliquePeriodesListe: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> = [];


        selectedStructureOganisatrices: StructureOganisatriceVo = new StructureOganisatriceVo();
        structureOganisatricesListe: Array<StructureOganisatriceVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedPaysRencontreGrandPubliqueJeunePubliques: PaysRencontreGrandPubliqueJeunePubliqueVo = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        paysRencontreGrandPubliqueJeunePubliquesListe: Array<PaysRencontreGrandPubliqueJeunePubliqueVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        paysOrganisateurRencontreGrandPubliqueJeunePubliquesListe: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> = [];


        selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueInstrumentIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> = [];

        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
 ,       private etablissementService: EtablissementService
 ,       private formatRencontreService: FormatRencontreService
 ,       private paysRencontreGrandPubliqueJeunePubliqueService: PaysRencontreGrandPubliqueJeunePubliqueService
 ,       private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
 ,       private typePubliqueService: TypePubliqueService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private paysService: PaysService
 ,       private cultureScientifiqueService: CultureScientifiqueService
 ,       private rencontreGrandPubliqueJeunePubliquePeriodeService: RencontreGrandPubliqueJeunePubliquePeriodeService
 ,       private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService
 ,       private typePubliqueRencontreGrandPubliqueJeunePubliqueService: TypePubliqueRencontreGrandPubliqueJeunePubliqueService
 ,       private structureOganisatriceService: StructureOganisatriceService
 ,       private contexteService: ContexteService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypePubliqueRencontreGrandPubliqueJeunePubliques.typePubliqueVo = new TypePubliqueVo();
                this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedStructureOganisatrices.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedPaysRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedFormatRencontre = new FormatRencontreVo();
    this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
    this.selectedContexte = new ContexteVo();
    this.contexteService.findAll().subscribe((data) => this.contextes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addTypePubliqueRencontreGrandPubliqueJeunePubliques() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.typePubliqueRencontreGrandPubliqueJeunePubliquesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.typePubliqueRencontreGrandPubliqueJeunePubliquesVo = new Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.typePubliqueRencontreGrandPubliqueJeunePubliquesVo.push(this.selectedTypePubliqueRencontreGrandPubliqueJeunePubliques);
        this.selectedTypePubliqueRencontreGrandPubliqueJeunePubliques = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        }

       deleteTypePubliqueRencontreGrandPubliqueJeunePubliques(p: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.typePubliqueRencontreGrandPubliqueJeunePubliquesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.typePubliqueRencontreGrandPubliqueJeunePubliquesVo.splice(index, 1); }
        });
    }
        addRencontreGrandPubliqueJeunePubliqueEnjeuxIrds() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo = new Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo.push(this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds);
        this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        }

       deleteRencontreGrandPubliqueJeunePubliqueEnjeuxIrds(p: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo = new Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo.push(this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques);
        this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        }

       deleteRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(p: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addRencontreGrandPubliqueJeunePubliquePeriodes() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo = new Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.push(this.selectedRencontreGrandPubliqueJeunePubliquePeriodes);
        this.selectedRencontreGrandPubliqueJeunePubliquePeriodes = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
        }

       deleteRencontreGrandPubliqueJeunePubliquePeriodes(p: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.splice(index, 1); }
        });
    }
        addStructureOganisatrices() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.structureOganisatricesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.structureOganisatricesVo = new Array<StructureOganisatriceVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.structureOganisatricesVo.push(this.selectedStructureOganisatrices);
        this.selectedStructureOganisatrices = new StructureOganisatriceVo();
        }

       deleteStructureOganisatrices(p: StructureOganisatriceVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.structureOganisatricesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.structureOganisatricesVo.splice(index, 1); }
        });
    }
        addPaysRencontreGrandPubliqueJeunePubliques() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.paysRencontreGrandPubliqueJeunePubliquesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.paysRencontreGrandPubliqueJeunePubliquesVo = new Array<PaysRencontreGrandPubliqueJeunePubliqueVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.paysRencontreGrandPubliqueJeunePubliquesVo.push(this.selectedPaysRencontreGrandPubliqueJeunePubliques);
        this.selectedPaysRencontreGrandPubliqueJeunePubliques = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        }

       deletePaysRencontreGrandPubliqueJeunePubliques(p: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.paysRencontreGrandPubliqueJeunePubliquesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.paysRencontreGrandPubliqueJeunePubliquesVo.splice(index, 1); }
        });
    }
        addPaysOrganisateurRencontreGrandPubliqueJeunePubliques() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo = new Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo.push(this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques);
        this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        }

       deletePaysOrganisateurRencontreGrandPubliqueJeunePubliques(p: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo.splice(index, 1); }
        });
    }
        addRencontreGrandPubliqueJeunePubliqueInstrumentIrds() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo = new Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo.push(this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds);
        this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        }

       deleteRencontreGrandPubliqueJeunePubliqueInstrumentIrds(p: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo.splice(index, 1); }
        });
    }
        addRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo = new Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>();
        }
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo.push(this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds);
        this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
        }

       deleteRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(p: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreGrandPubliqueJeunePubliqueService.edit().subscribe(rencontreGrandPubliqueJeunePublique=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliques.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePublique.id);
    this.rencontreGrandPubliqueJeunePubliques[myIndex] = this.selectedRencontreGrandPubliqueJeunePublique;
    this.editRencontreGrandPubliqueJeunePubliqueDialog = false;
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateformatRencontre(formatRencontre: string) {
                      const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'add');
                       if(isPermistted){
         this.selectedFormatRencontre = new FormatRencontreVo();
        this.createFormatRencontreDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecultureScientifique(cultureScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'add');
                       if(isPermistted){
         this.selectedCultureScientifique = new CultureScientifiqueVo();
        this.createCultureScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecontexte(contexte: string) {
                      const isPermistted = await this.roleService.isPermitted('Contexte', 'add');
                       if(isPermistted){
         this.selectedContexte = new ContexteVo();
        this.createContexteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypePublique(typePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePublique', 'add');
                       if(isPermistted){
         this.selectedTypePublique = new TypePubliqueVo();
        this.createTypePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
    return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
    set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }

   get editRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedFormatRencontre(): FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
      set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }
       get formatRencontres(): Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontres;
       }
       set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }
       get createFormatRencontreDialog(): boolean {
           return this.formatRencontreService.createFormatRencontreDialog;
       }
      set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
       }
       get selectedCultureScientifique(): CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
      set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
       get cultureScientifiques(): Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
       set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }
       get createCultureScientifiqueDialog(): boolean {
           return this.cultureScientifiqueService.createCultureScientifiqueDialog;
       }
      set createCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.createCultureScientifiqueDialog= value;
       }
       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
       get selectedContexte(): ContexteVo {
           return this.contexteService.selectedContexte;
       }
      set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }
       get contextes(): Array<ContexteVo> {
           return this.contexteService.contextes;
       }
       set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }
       get createContexteDialog(): boolean {
           return this.contexteService.createContexteDialog;
       }
      set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get createTypePubliqueDialog(): boolean {
           return this.typePubliqueService.createTypePubliqueDialog;
       }
      set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
       }
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
