import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadSpecies, searchSpecies } from '../../actions/species.actions';
import { AppState } from '../../state/app.state';
import { selectSpeciesList, selectIsLoading, selectTotalElements, selectIsEmpty } from '../../selectors/species.selectors';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../front-student/footer/footer.component';
import { Species } from '../../models/species.model';

@Component({
  selector: 'app-speceis',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './speceis.component.html',
})
export class SpeceisComponent implements OnInit {
  speciesList: Species[] = []; 
  isLoading$: Observable<boolean> = this.store.pipe(select(selectIsLoading));
  totalElements$: Observable<number> = this.store.pipe(select(selectTotalElements));
  isEmpty$: Observable<boolean> = this.store.pipe(select(selectIsEmpty));

  searchName: string = '';
  page: number = 0;
  size: number = 10;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.store.dispatch(loadSpecies({ page: this.page, size: this.size }));
    this.store.pipe(select(selectSpeciesList)).subscribe((speciesList: Species[]) => {
      this.speciesList = speciesList; 
    });
  }

  searchSpecies(): void {
    if (this.searchName.trim()) {
      this.store.dispatch(searchSpecies({ searchName: this.searchName, page: this.page, size: this.size }));
    } else {
      this.loadSpecies();
    }
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadSpecies();
  }

  get totalPages(): Observable<number> {
    return this.totalElements$.pipe(
      map((totalElements: number) => {
        if (totalElements != null && !isNaN(totalElements)) {
          return Math.ceil(totalElements / this.size);
        } else {
          return 0;
        }
      })
    );
  }
}
