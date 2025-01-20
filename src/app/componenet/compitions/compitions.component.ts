import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

import { CompitetionServiceService } from '../../service/compitetion-service.service';
import { ParticipationService } from '../../service/participation.service';
import { FooterComponent } from '../../front-student/footer/footer.component';
import { Store } from '@ngrx/store';
import { loadCompetitions, participateInCompetition } from '../../actions/competitions.actions';
import { selectAllCompetitions, selectIsLoading, selectTotalElements } from '../../selectors/competitions.selectors';
import { Competition } from '../../models/competition.model'; 
import { Observable } from 'rxjs';


interface createCompetition {
  competitionId: string;
}
@Component({
  selector: 'app-compitions',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './compitions.component.html'
})
export class CompitionsComponent implements OnInit {
  competitions: Competition[] = []; // Local variable to store the competitions
  isLoading$: Observable<boolean>;
  totalElements$: Observable<number>;

  page: number = 0;
  size: number = 10;
  searchCode: string = '';

  constructor(private store: Store) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.totalElements$ = this.store.select(selectTotalElements);
  }

  ngOnInit(): void {
    this.loadCompetitions();
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  loadCompetitions(): void {
    this.store.dispatch(loadCompetitions({ page: this.page, size: this.size }));
  
    this.store.select(selectAllCompetitions).subscribe((competitions: Competition[]) => {
      this.competitions = competitions;
    });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadCompetitions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(): void {
    if (this.searchCode.trim()) {
      this.store.dispatch(loadCompetitions({ page: this.page, size: this.size, searchCode: this.searchCode }));
    } else {
      this.loadCompetitions();
    }
  }

  onParticipate(competitionId: string): void {
    this.store.dispatch(participateInCompetition({ competitionId }));
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Processing your participation...',
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      timerProgressBar: true,
    });
  }
}