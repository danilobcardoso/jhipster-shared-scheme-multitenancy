import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DiscriminatorCustomerModule } from './customer/customer.module';
import { DiscriminatorContactModule } from './contact/contact.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DiscriminatorCustomerModule,
        DiscriminatorContactModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiscriminatorEntityModule {}
