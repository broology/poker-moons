import { NgModule } from '@angular/core';
import { AssetUrlPipe } from './asset-url.pipe';

@NgModule({
    declarations: [AssetUrlPipe],
    exports: [AssetUrlPipe],
})
export class AssetUrlModule {}
