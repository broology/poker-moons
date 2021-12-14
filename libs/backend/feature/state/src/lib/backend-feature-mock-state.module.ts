import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockStateService } from './mock-state/mock-state.service';

@NgModule({
    imports: [CommonModule],
    providers: [MockStateService],
})
export class BackendFeatureMockStateModule {}
