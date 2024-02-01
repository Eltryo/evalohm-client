import {Component, Input} from '@angular/core';
import {RatingService} from "../../service/rating.service";

@Component({
  selector: 'app-multiple-choice-rating',
  templateUrl: './multiple-choice-rating.component.html',
  styleUrls: ['./multiple-choice-rating.component.scss']
})
export class MultipleChoiceRatingComponent {
  @Input() ratingName: string = "";
  @Input() choices: string[] = []

  constructor(private readonly ratingService: RatingService) {
  }

  Rating(rating: number) {
    this.ratingService.setRating(rating, this.ratingName);
  }
}
