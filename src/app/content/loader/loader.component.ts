import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  phrases = [
    "Апишка рейтинга медленная пздц",
    "Жоска фильтруем",
    "Продам гараж",
    "Сервер потеет как может потерпи",
    "Зато бесплатно",
  ]
  randomPhrase!: string;

  constructor() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.randomPhrase = this.phrases[randomIndex];
  }
}
