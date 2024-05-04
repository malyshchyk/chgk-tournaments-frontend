import { Component } from '@angular/core';

@Component({
  selector: 'app-teams-picker',
  standalone: true,
  imports: [],
  templateUrl: './teams-picker.component.html',
  styleUrl: './teams-picker.component.css'
})
export class TeamsPickerComponent {
  spendLimit = 100;
  score = 0;

  teams: any[] = [
    {
      "picked": false,
      "name": "149",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Kekers",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Агрессивные авиапассажиры",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Аматар*ка абсэнту",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Билли Миллиган",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Богдан помнит ласт дэнс",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Божики ножики",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Второй отец",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Дедородный орга́н",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Демо-версия утконосов",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Дурніцы",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Кваманда",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "КЛОУНИЗМ",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "козырные козырьки: возвращение бэдбоя",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Крепыши",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Немецкие аплодисменты",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Овсянка",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Одушевлённые аэросани",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Свиньи как бизнес",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Смирись и Расслабься",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Сонейкі",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Хронически разумные United",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
    {
      "picked": false,
      "name": "Чмоки",
      "cost": Math.floor(Math.random() * 100) + 1,
    },
  ];

  pickTeam(team: any) {
    const teamIndex = this.teams.findIndex(t => t.name === team.name);
    if (teamIndex !== -1) {
      if (!this.teams[teamIndex].picked && this.score + team.cost > this.spendLimit) {
        return;
      }
      this.teams[teamIndex].picked = !this.teams[teamIndex].picked;
      if (this.teams[teamIndex].picked) {
        this.score += this.teams[teamIndex].cost;
      } else {
        this.score -= this.teams[teamIndex].cost;
      }
    }
  }

  clearAll() {
    this.teams.forEach(team => team.picked = false);
    this.score = 0;
  }

}
