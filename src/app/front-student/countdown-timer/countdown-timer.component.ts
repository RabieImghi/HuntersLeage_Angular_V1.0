import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompitetionServiceService } from '../../service/compitetion-service.service';
import { ParticipationService } from '../../service/participation.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { TokenStorageServiceService } from '../../service/token-storage-service.service';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface TimerItem {
  label: string;
  value: number;
}
interface createCompetition {
  competitionId: string;
}
@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countdown-timer.component.html'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  constructor(private cm: CompitetionServiceService, private pr: ParticipationService, private tk: TokenStorageServiceService) { }

  competition: any = {};
  timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  timerItems: TimerItem[] = [];
  private timerInterval: any;

  ngOnInit(): void {
    this.getNextCompetition();
  }
  getToken(): string | null{
    return this.tk.getToken();
  }

  getNextCompetition(): void {
    this.cm.getNextCompetition()
      .subscribe(
        (response) => {
          this.competition = response;
          console.log('Competition data:', this.competition);
          this.initializeTimer();
        },
        (error) => {
          console.error('Error fetching competition:', error);
        }
      );
  }

  initializeTimer(): void {
    const competitionDate = new Date(this.competition.date);
    this.calculateTimeLeft(competitionDate);

    this.timerInterval = setInterval(() => {
      this.calculateTimeLeft(competitionDate);
    }, 1000);
  }

  calculateTimeLeft(competitionDate: Date): void {
    const now = new Date().getTime();
    const target = competitionDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      this.timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.timeLeft.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.timeLeft.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.timeLeft.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    } else {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.timerInterval);
    }

    this.updateTimerItems();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimerItems(): void {
    this.timerItems = [
      { label: 'Days', value: this.timeLeft.days },
      { label: 'Hours', value: this.timeLeft.hours },
      { label: 'Minutes', value: this.timeLeft.minutes },
      { label: 'Seconds', value: this.timeLeft.seconds }
    ];
  }

  onParticipate(competition: any): void {
    const participation: createCompetition = {
      competitionId: competition.id
    }
    this.pr.createParticipation(participation)
    .subscribe(
      (response)=>{
        this.successParticipation();
      },
      (error)=>{
        this.errorParticipation(error.error);
      }
    )
  }
   successParticipation() {
      Swal.fire({
        position: 'top-end', 
        icon: 'success',
        title: 'You have successfully participated in the competition!',
        showConfirmButton: false, 
        timer: 3500, 
        toast: true, 
        timerProgressBar: true,
      });
    }
    errorParticipation(error: string) {
      Swal.fire({
        position: 'top-end', 
        icon: 'error',
        title: 'Error participating in the competition : ' + error,
        showConfirmButton: false, 
        timer: 3500, 
        toast: true, 
        timerProgressBar: true,
      });
    }
}
