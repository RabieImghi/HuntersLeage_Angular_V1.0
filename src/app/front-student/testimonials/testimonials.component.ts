import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

interface Testimonial {
  name: string;
  feedback: string;
  rating: number;
  reviews: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {

  testimonials: Testimonial[] = [
    {
      name: 'John Doe',
      feedback: 'Participating in Hunter\'s League was an incredible experience! The organization was top-notch, and the challenges were thrilling. Every aspect of the competition pushed us to our limits, making it a memorable and rewarding event.',
      rating: 4.8,
      reviews: 24,
    },
    {
      name: 'Jane Smith',
      feedback: 'Hunter\'s League Competitions exceeded all my expectations. The level of detail in the events and the support from the organizers made it an outstanding experience. I met so many amazing competitors and learned so much along the way!',
      rating: 4.7,
      reviews: 30,
    },
    {
      name: 'Sam Wilson',
      feedback: 'Hunter\'s League is truly one of the best competitions I\'ve ever joined. The challenges were innovative, the team was inspiring, and the overall atmosphere was electrifying. Can’t wait to participate again next year and push myself even further!',
      rating: 5.0,
      reviews: 18,
    },
    {
      name: 'Lisa Brown',
      feedback: 'I absolutely loved being a part of Hunter\'s League. The competition was intense yet so much fun. The organizers thought of everything, making the event seamless and enjoyable for all participants.',
      rating: 4.9,
      reviews: 22,
    },
    {
      name: 'Tom Hanks',
      feedback: 'Hunter\'s League Competitions brought out the best in me. The challenges were perfectly balanced between difficulty and excitement. It was a fantastic opportunity to test my skills and grow as a competitor.',
      rating: 4.6,
      reviews: 19,
    },
    {
      name: 'Emma Green',
      feedback: 'Hunter\'s League was a game-changer for me! The camaraderie, the energy, and the challenges were unlike anything I\'ve experienced. This competition not only tested my abilities but also created memories.',
      rating: 5.0,
      reviews: 25,
    },
];



  slideOffset = 0;
  itemsPerView = 3;
  totalSlides = 0;
  currentSlide = 0;

  private autoSlideInterval: any;

  ngOnInit(): void {
    this.updateItemsPerView();
    this.calculateTotalSlides();
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
    });
  }

  
  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateItemsPerView();
    this.calculateTotalSlides();
    if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
      this.updateSlideOffset();
    }
  }
  private updateItemsPerView(): void {
    const width = window.innerWidth;
    if (width < 640) { // Small screens
      this.itemsPerView = 1;
    } else if (width >= 640 && width < 1024) { // Medium screens
      this.itemsPerView = 2;
    } else { // Large screens
      this.itemsPerView = 3;
    }
  }
  private calculateTotalSlides(): void {
    this.totalSlides = Math.ceil(this.testimonials.length / this.itemsPerView);
  }
  nextSlide(): void {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlideOffset();
    } 
  }
  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlideOffset();
    }
  }
  private updateSlideOffset(): void {
    this.slideOffset = -(100 * this.currentSlide);
  }
}
