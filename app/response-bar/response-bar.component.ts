import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-response-bar',
  templateUrl: './response-bar.component.html',
  styleUrl: './response-bar.component.css'
})
export class ResponseBarComponent implements OnInit{

  // Arrays to store data from three different API responses
  jsonData1: any[] = [];
  jsonData2: any[] = [];
  jsonData3: any[] = [];
  // Variables to store chart instances for later reference
  chart1: any;
  chart2: any;
  chart3: any;

  constructor(private apiService: ApiService, private router: Router) { }

  //used life cycle hook method called when the component is initialized
  ngOnInit() {
     // Fetch data from the first API and create a chart
    this.apiService.getJsonData1().subscribe(
      (data: any[]) => {
        this.jsonData1 = data;
        this.formatDataForChart(this.jsonData1);
        this.createChart('canvas1', this.jsonData1, 'rgba(0, 123, 255, 0.2)', 'rgba(0, 123, 255, 0.2)', 'Api response 1');
      },
      (error) => {
        console.error('Error fetching JSON data 1:', error);
      }
    );
     // Fetch data from the second API and create a chart
    this.apiService.getJsonData2().subscribe(
      (data: any[]) => {
        this.jsonData2 = data;
        this.formatDataForChart(this.jsonData2);
        this.createChart('canvas2', this.jsonData2, 'rgba(255, 0, 123, 0.2)', 'rgba(255, 0, 123, 0.2)', 'Api response 2');
      },
      (error) => {
        console.error('Error fetching JSON data 2:', error);
      }
    );
     // Fetch data from the third API and create a chart
    this.apiService.getJsonData3().subscribe(
      (data: any[]) => {
        this.jsonData3 = data;
        this.formatDataForChart(this.jsonData3);
        this.createChart('canvas3', this.jsonData3, 'rgba(123, 255, 0, 0.2)', 'rgba(123, 255, 0, 0.2)', 'Api response 3');
      },
      (error) => {
        console.error('Error fetching JSON data 3:', error);
      }
    );
  }

  // Format the time data for chart labels
  formatDataForChart(jsonData: any[]) {
    // Format eventTime to extract only the time portion
    jsonData.forEach(entry => {
      const date = new Date(entry.eventTime);
      entry.eventTime = date.toLocaleTimeString(); // Adjust format as needed
    });
  }

   // Create a bar chart using Chart.js
  createChart( canvasId: string, jsonData: any[], backgroundColor: string, borderColor: string, apiLabel?: string ) {
    const labels = jsonData.map((entry) => entry.eventTime);
    const data = jsonData.map((entry) => entry.responseTime);
  
    const dataset = {
      data: data,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
    };
  
    const chartOptions = {
      scales: {
        x: {
          title: { display: true, text: 'Event Time' },
        },
        y: {
          title: { display: true, text: 'Response Time' },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const value = tooltipItem.formattedValue;
              const tooltipLabel = apiLabel || `API ${tooltipItem.datasetIndex + 1} Response`;
              return `${tooltipLabel}: ${value}`;
            },
          },
        },
      },
    };
  
    //Chart Initialization
    const chart = new Chart(canvasId, {
      type: 'bar',
      data: { labels: labels, datasets: [dataset] },
      options: chartOptions as any, // Use 'as any' to handle the type discrepancy between the expected type and the provided type for the chartOptions "Type Assertion"
    });
  
    // Save the chart reference
    if (canvasId === 'canvas1') {
      this.chart1 = chart;
    } else if (canvasId === 'canvas2') {
      this.chart2 = chart;
    } else if (canvasId === 'canvas3') {
      this.chart3 = chart;
    }
  }
  
   // Method to navigate back to the previous page
  goBack(): void {
    this.router.navigate(['/']);
  }
}
