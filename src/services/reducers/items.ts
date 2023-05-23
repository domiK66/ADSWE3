import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import { fetchAnimalActions, fetchAnimalsActions, fetchCoralActions, fetchCoralsActions } from '../actions/items';
import { Animal, AquariumItem, Coral } from '../rest/interface';

const initialState: AquariumItemsState = {
  aquariumitem: new AquariumItem(),
  coral: new Coral(),
  animal: new Animal(),
  isLoading: false,
  corals: [],
  animals: [],
  errorMessage: ''
};

export interface AquariumItemsState {
  coral: Coral;
  animal: Animal;
  aquariumitem: AquariumItem;
  isLoading: boolean;
  corals: Coral[];
  animals: Animal[];
  errorMessage: string;
}

export const items = createReducer<AquariumItemsState, AnyAction>(initialState)
  .handleAction(fetchCoralsActions.request, (state, action) => ({ ...state, isLoading: true, errorMessage: '' }))
  .handleAction(fetchCoralsActions.success, (state, action) => ({ ...state, isLoading: false, corals: action.payload }))
  .handleAction(fetchCoralsActions.failure, (state, action) => ({ ...state, isLoading: false, errorMessage: action.payload.message }))
  .handleAction(fetchAnimalsActions.request, (state, action) => ({ ...state, isLoading: true, errorMessage: '' }))
  .handleAction(fetchAnimalsActions.success, (state, action) => ({ ...state, isLoading: false, animals: action.payload }))
  .handleAction(fetchAnimalsActions.failure, (state, action) => ({ ...state, isLoading: false, errorMessage: action.payload.message }))
  .handleAction(fetchCoralActions.request, (state, action) => ({ ...state, isLoading: true, errorMessage: '' }))
  .handleAction(fetchCoralActions.success, (state, action) => ({ ...state, isLoading: false, coral: action.payload }))
  .handleAction(fetchCoralActions.failure, (state, action) => ({ ...state, isLoading: false, errorMessage: action.payload.message }))
  .handleAction(fetchAnimalActions.request, (state, action) => ({ ...state, isLoading: true, errorMessage: '' }))
  .handleAction(fetchAnimalActions.success, (state, action) => ({ ...state, isLoading: false, animal: action.payload }))
  .handleAction(fetchAnimalActions.failure, (state, action) => ({ ...state, isLoading: false, errorMessage: action.payload.message }))