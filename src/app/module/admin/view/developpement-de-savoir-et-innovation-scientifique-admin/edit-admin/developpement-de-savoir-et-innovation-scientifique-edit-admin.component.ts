import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-edit-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-edit-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-edit-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent implements OnInit {

        selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesListe: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> = [];

        myTypeSavoirs: Array<TypeSavoirVo> = [];

        selectedTypeUtilisateurSavoirConcus: TypeUtilisateurSavoirConcuVo = new TypeUtilisateurSavoirConcuVo();
        typeUtilisateurSavoirConcusListe: Array<TypeUtilisateurSavoirConcuVo> = [];

        myTypeUtilisateurs: Array<TypeUtilisateurVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        developpementDeSavoirEtInnovationScientifiqueModeDiffusionsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> = [];

        myModeDiffusions: Array<ModeDiffusionVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> = [];


        selectedDeveloppementDeSavoirEtInnovationScientifiquePayss: DeveloppementDeSavoirEtInnovationScientifiquePaysVo = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        developpementDeSavoirEtInnovationScientifiquePayssListe: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        developpementDeSavoirEtInnovationScientifiqueEtablissementsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeSavoirService: TypeSavoirService
 ,       private typeUtilisateurService: TypeUtilisateurService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private developpementDeSavoirEtInnovationScientifiquePaysService: DeveloppementDeSavoirEtInnovationScientifiquePaysService
 ,       private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
 ,       private developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService
 ,       private typeUtilisateurSavoirConcuService: TypeUtilisateurSavoirConcuService
 ,       private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
 ,       private etablissementService: EtablissementService
 ,       private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
 ,       private savoirEtInnovationService: SavoirEtInnovationService
 ,       private developpementDeSavoirEtInnovationScientifiqueEtablissementService: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
 ,       private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private modeDiffusionService: ModeDiffusionService
 ,       private communauteSavoirService: CommunauteSavoirService
 ,       private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.typeSavoirVo = new TypeSavoirVo();
                this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
                this.selectedTypeUtilisateurSavoirConcus.typeUtilisateurVo = new TypeUtilisateurVo();
                this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.modeDiffusionVo = new ModeDiffusionVo();
                this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
    this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = new Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.push(this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques);
        this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        }

       deleteTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(p: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.splice(index, 1); }
        });
    }
        addTypeUtilisateurSavoirConcus() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo = new Array<TypeUtilisateurSavoirConcuVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo.push(this.selectedTypeUtilisateurSavoirConcus);
        this.selectedTypeUtilisateurSavoirConcus = new TypeUtilisateurSavoirConcuVo();
        }

       deleteTypeUtilisateurSavoirConcus(p: TypeUtilisateurSavoirConcuVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.typeUtilisateurSavoirConcusVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(p: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(p: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(p: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(p: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiquePayss() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo = new Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiquePayss(p: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiquePayssVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiqueEtablissements() {
        if( this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo == null ){
            this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>();
        }
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(p: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.forEach((element, index) => {
            if (element === p) { this.selectedDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiqueService.edit().subscribe(developpementDeSavoirEtInnovationScientifique=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiques.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifique.id);
    this.developpementDeSavoirEtInnovationScientifiques[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifique;
    this.editDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();


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
              public async openCreatetypeSavoir(typeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
                       if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
        this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesavoirEtInnovation(savoirEtInnovation: string) {
                      const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
                       if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.createSavoirEtInnovationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemodeDiffusion(modeDiffusion: string) {
                      const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'add');
                       if(isPermistted){
         this.selectedModeDiffusion = new ModeDiffusionVo();
        this.createModeDiffusionDialog = true;
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
              public async openCreateroleDeveloppementDeSavoir(roleDeveloppementDeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'add');
                       if(isPermistted){
         this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.createRoleDeveloppementDeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeUtilisateur(typeUtilisateur: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'add');
                       if(isPermistted){
         this.selectedTypeUtilisateur = new TypeUtilisateurVo();
        this.createTypeUtilisateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
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
       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
      set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
       }
       get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;
       }
      set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
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
       get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get createRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
       }
      set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
       }
       get selectedTypeUtilisateur(): TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
      set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }
       get typeUtilisateurs(): Array<TypeUtilisateurVo> {
           return this.typeUtilisateurService.typeUtilisateurs;
       }
       set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }
       get createTypeUtilisateurDialog(): boolean {
           return this.typeUtilisateurService.createTypeUtilisateurDialog;
       }
      set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
