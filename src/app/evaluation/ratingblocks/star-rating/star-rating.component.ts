import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {RatingService} from "../../service/rating.service";

@Component({
  selector: 'app-ratingblock',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StarRatingComponent implements OnInit {
  @Input() ratingName: string = "";
  maxRating = 5;
  maxRatingArr: any = [];
  SelectedStar = 0;
  previousSelected = 0;

  constructor(private readonly ratingService: RatingService) {
  }

  HandleMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandleMouseLeave() {
    if (this.previousSelected !== 0) {
      this.SelectedStar = this.previousSelected;
    } else {
      this.SelectedStar = 0;
    }
  }

  Rating(index: number) {
    this.SelectedStar = index + 1;
    this.previousSelected = this.SelectedStar;
    this.ratingService.setRating(this.SelectedStar, this.ratingName);
  }

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
}
