import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecondaryButtonComponent } from './secondary-button.component';

export const secondaryButtonModuleImports = [...([CommonModule, FontAwesomeModule, FlexLayoutModule] as const)];

@NgModule({
    imports: secondaryButtonModuleImports,
    declarations: [SecondaryButtonComponent],
    exports: [SecondaryButtonComponent],
})
export class SecondaryButtonModule {}
