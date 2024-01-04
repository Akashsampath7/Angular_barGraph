import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-combined-api',
  templateUrl: './combined-api.component.html',
  styleUrls: ['./combined-api.component.css']
})
export class CombinedApiComponent implements OnInit {

  @ViewChild('combinedCanvas') combinedCanvas!: ElementRef;

  combinedData: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Fetching data from three APIs
    const api1 = this.apiService.getJsonData1();
    const api2 = this.apiService.getJsonData2();
    const api3 = this.apiService.getJsonData3();

    // Combine data from all APIs
    forkJoin([api1, api2, api3]).subscribe(
      ([data1, data2, data3]) => {
        this.combineData(data1, data2, data3);
        this.createChart();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  // Combine data from three APIs based on unique event times
  combineData(data1: any[], data2: any[], data3: any[]) {
    const uniqueEventTimes = new Set<string>();
  
    // Collect unique event times from all APIs
    data1.forEach(entry => uniqueEventTimes.add(entry.eventTime));
    data2.forEach(entry => uniqueEventTimes.add(entry.eventTime));
    data3.forEach(entry => uniqueEventTimes.add(entry.eventTime));
  
    // Create combined data using unique event times
    this.combinedData = Array.from(uniqueEventTimes).map(eventTime => {
      const entry1 = data1.find(entry => entry.eventTime === eventTime);
      const entry2 = data2.find(entry => entry.eventTime === eventTime);
      const entry3 = data3.find(entry => entry.eventTime === eventTime);
  
      return {
        eventTime: eventTime,
        responseTime1: entry1 ? entry1.responseTime : 0,
        responseTime2: entry2 ? entry2.responseTime : 0,
        responseTime3: entry3 ? entry3.responseTime : 0,
      };
    });
  }

   // Create a bar chart using Chart.js
  createChart() {
    const labels = this.combinedData.map(entry => {
      const date = new Date(entry.eventTime);
      return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
    });

    const canvas = this.combinedCanvas.nativeElement.getContext('2d');

    // Create a bar chart
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'API 1 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime1),
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'API 2 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime2),
            backgroundColor: 'rgba(255, 0, 123, 0.2)',
            borderColor: 'rgba(255, 0, 123, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'API 3 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime3),
            backgroundColor: 'rgba(123, 255, 0, 0.2)',
            borderColor: 'rgba(123, 255, 0, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Event Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Response Time',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const dataLabel = labels[tooltipItem.index];
                const value = tooltipItem.formattedValue;
                const apiLabel = `API ${tooltipItem.datasetIndex + 1} Response`;
                return `${apiLabel}: ${value}`;
              },
            },
          },
        },
      },
    });
  }
}
