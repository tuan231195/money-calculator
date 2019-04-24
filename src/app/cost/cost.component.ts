import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
})
export class CostComponent implements OnInit {
  people: { name: string }[] = [];
  categories: Category[] = [];
  constructor() {}

  ngOnInit() {}

  addPerson() {
    this.people.push({ name: '' });
  }

  removePerson(person) {
    this.people = this.people.filter(currentPerson => currentPerson === person);
  }

  addCategory() {
    this.categories.push({
      payer: null,
      payee: {},
      amount: 0,
      name: '',
    });
  }
}
