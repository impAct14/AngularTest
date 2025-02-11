import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonTableColumn } from '../../../model/commonTable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-table',
  imports: [DatePipe],
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit {
  @Input() columnArray: CommonTableColumn[] = [];
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
