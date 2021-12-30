import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { JoinTableRequest, PlayerAction } from '@poker-moons/shared/type';
@Component({
    selector: 'poker-moons-action-panel-feature',
    templateUrl: './action-panel-feature.component.html',
    styleUrls: ['./action-panel-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionPanelFeatureComponent {
    readonly round$ = this.tableStateFacade.selectRound();

    readonly clientMutablePlayer$ = this.tableStateFacade.selectClientMutablePlayer();

    readonly clientImmutablePlayer$ = this.tableStateFacade.selectClientImmutablePlayer();

    constructor(private readonly tableStateFacade: TableStateFacade) {}

    performAction(action: PlayerAction): void {
        this.tableStateFacade.performAction({ action });
    }

    join(dto: JoinTableRequest): void {
        this.tableStateFacade.join(dto);
    }

    leave(): void {
        this.tableStateFacade.leave();
    }
}
