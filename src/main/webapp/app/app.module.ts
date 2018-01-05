import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { DiscriminatorSharedModule, UserRouteAccessService } from './shared';
import { DiscriminatorAppRoutingModule} from './app-routing.module';
import { DiscriminatorHomeModule } from './home/home.module';
import { DiscriminatorAdminModule } from './admin/admin.module';
import { DiscriminatorAccountModule } from './account/account.module';
import { DiscriminatorEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        DiscriminatorAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        DiscriminatorSharedModule,
        DiscriminatorHomeModule,
        DiscriminatorAdminModule,
        DiscriminatorAccountModule,
        DiscriminatorEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DiscriminatorAppModule {}
