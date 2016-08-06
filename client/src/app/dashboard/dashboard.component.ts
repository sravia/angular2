import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import { Hero }        from './../hero/hero';
import { HeroService } from './../hero/hero.service.ts';
import { HeroSearchComponent } from './../herosearch/hero-search.component.ts';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [ require('./dashboard.component.scss') ],
  directives: [HeroSearchComponent]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}

