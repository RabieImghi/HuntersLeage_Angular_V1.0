import { Competition } from '../models/competition.model';

export interface CompetitionState {
  competitions: Competition[];
  totalElements: number;
  isLoading: boolean;
  error: string | null;
}
