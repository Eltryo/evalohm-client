import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe({
      next: state => {
        this.comments = Object.values(state).filter(value => typeof value === "string") as string[]
      }
    })
  }

  backClicked() {
    this.location.back()
  }
}
