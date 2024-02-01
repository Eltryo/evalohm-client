import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-bar-graph-multiple-choice',
  templateUrl: './bar-graph-multiple-choice.component.html',
  styleUrls: ['./bar-graph-multiple-choice.component.scss']
})
export class BarGraphMultipleChoiceComponent implements OnChanges {
  @Input() barGraphTitle = '';
  @Input() firstLabel = '';
  @Input() secondLabel = '';
  @Input() thirdLabel = '';
  @Input() fourthLabel = '';
  @Input() fifthLabel = '';
  @Input() averageValue: number = 0;
  @Input() ratingCountData: number[] = [];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: this.barGraphTitle
    },
    axisY: {
      includeZero: true,
      interval: 1
    },
    legend: {
      horizontalAlign: "center",
      verticalAlign: "bottom"
    },
    data: [{
      showInLegend: true,
      legendText: "",
      legendMarkerType: "none",
      type: "bar",
      dataPoints: [
        {label: this.firstLabel, y: this.ratingCountData[0], color: "#3f51b5"},
        {label: this.secondLabel, y: this.ratingCountData[1], color: "#3f51b5"},
        {label: this.thirdLabel, y: this.ratingCountData[2], color: "#3f51b5"},
        {label: this.fourthLabel, y: this.ratingCountData[3], color: "#3f51b5"},
        {label: this.fifthLabel, y: this.ratingCountData[4], color: "#3f51b5"}
      ]
    }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('ratingCountData') && changes['ratingCountData'].previousValue !== changes['ratingCountData'].currentValue) {
      this.ratingCountData = changes['ratingCountData'].currentValue;
      this.chartOptions.data[0].dataPoints[0].y = this.ratingCountData[0];
      this.chartOptions.data[0].dataPoints[1].y = this.ratingCountData[1];
      this.chartOptions.data[0].dataPoints[2].y = this.ratingCountData[2];
      this.chartOptions.data[0].dataPoints[3].y = this.ratingCountData[3];
      this.chartOptions.data[0].dataPoints[4].y = this.ratingCountData[4];
    }

    if (changes.hasOwnProperty('barGraphTitle') && this.chartOptions.title.text !== changes['barGraphTitle'].currentValue) {
      this.chartOptions.title.text = changes['barGraphTitle'].currentValue;
    }
    if (changes.hasOwnProperty('firstLabel') && this.chartOptions.data[0].dataPoints[0].label !== changes['firstLabel'].currentValue) {
      this.chartOptions.data[0].dataPoints[0].label = changes['firstLabel'].currentValue;
    }
    if (changes.hasOwnProperty('secondLabel') && this.chartOptions.data[0].dataPoints[1].label !== changes['secondLabel'].currentValue) {
      this.chartOptions.data[0].dataPoints[1].label = changes['secondLabel'].currentValue;
    }
    if (changes.hasOwnProperty('thirdLabel') && this.chartOptions.data[0].dataPoints[2].label !== changes['thirdLabel'].currentValue) {
      this.chartOptions.data[0].dataPoints[2].label = changes['thirdLabel'].currentValue;
    }
    if (changes.hasOwnProperty('fourthLabel') && this.chartOptions.data[0].dataPoints[3].label !== changes['fourthLabel'].currentValue) {
      this.chartOptions.data[0].dataPoints[3].label = changes['fourthLabel'].currentValue;
    }
    if (changes.hasOwnProperty('fifthLabel') && this.chartOptions.data[0].dataPoints[4].label !== changes['fifthLabel'].currentValue) {
      this.chartOptions.data[0].dataPoints[4].label = changes['fifthLabel'].currentValue;
    }
    if (changes.hasOwnProperty('averageValue') && this.chartOptions.data[0].legendText !== changes['averageValue'].currentValue) {
      if (!["Vorlesung", "Übung", "Unterlagen", "Prüfung"].includes(this.barGraphTitle)) {
        let averageValue = this.formatAverageValue(changes['averageValue'].currentValue);
        this.chartOptions.data[0].legendText = `Durchschnittswert: ${averageValue}`
      } else {
        this.chartOptions.data[0].legendText = `Durchschnittswert: ${changes['averageValue'].currentValue.toString()}`;
      }
    }

    this.chartOptions = {...this.chartOptions}
  }

  private formatAverageValue(averageValue: number): string {
    let roundedAverageValue = Math.round(averageValue);
    switch (roundedAverageValue) {
      case 1:
        return this.firstLabel
      case 2:
        return this.secondLabel
      case 3:
        return this.thirdLabel
      case 4:
        return this.fourthLabel
      case 5:
        return this.fifthLabel
      default:
        return "invalide"
    }
  }
}
