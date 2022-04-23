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
    readonly clientMutablePlayer$ = this.tableStateFacade.selectClientMutablePlayer();

    readonly clientImmutablePlayer$ = this.tableStateFacade.selectClientImmutablePlayer();

    readonly round$ = this.tableStateFacade.selectRound();

    readonly tableStartDate$ = this.tableStateFacade.selectStartDate();

    readonly tableStatus$ = this.tableStateFacade.selectStatus();

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

    toggleReadyStatus(): void {
        this.tableStateFacade.toggleReadyStatus();
    }
}
