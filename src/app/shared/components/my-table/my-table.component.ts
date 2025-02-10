import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-table',
  imports: [],
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit {
  @Input() columnArray: string[] = [];
  @Input() gridData: any[] = [];

  @Output() onEditClicked = new EventEmitter();
  @Output() onDeleteClicked = new EventEmitter();

  isEdit: boolean = false;

  constructor() {}

  ngOnInit() {}

  onEditClick(item: any) {
    this.onEditClicked.emit(item);
  }

  onDeleteClick(item: any) {
    this.onDeleteClicked.emit(item);
  }
}
