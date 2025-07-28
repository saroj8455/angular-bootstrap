import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-cycle-demo',
  standalone: true,
  imports: [],
  templateUrl: './life-cycle-demo.component.html',
  styleUrl: './life-cycle-demo.component.scss'
})
export class LifeCycleDemoComponent implements OnInit {

  @Input() title: string = 'Life Cycle Demo';

  ngOnInit() {
    // Initialization logic here
    console.log('LifeCycleDemoComponent initialized');

  }

}
