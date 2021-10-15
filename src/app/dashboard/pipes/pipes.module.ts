import { NgModule } from '@angular/core';
import { FilterPlayersTeamsPipe } from './filter-players-teams.pipe';
import { FilterAutocompletePlayersTeamsPipe } from './filter-autocomplete-players-teams.pipe';

@NgModule({
  declarations: [
    FilterPlayersTeamsPipe,
    FilterAutocompletePlayersTeamsPipe
  ],
  exports:[
    FilterPlayersTeamsPipe,
    FilterAutocompletePlayersTeamsPipe
  ]
})

export class PipesModule { }
