import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        const subject = new BehaviorSubject(0); // Subject();
        const series$ = subject.asObservable();
        series$.subscribe((val) => console.log('early sub', val));

        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.next(4);
        // subject.complete();

        setTimeout(() => {
            series$.subscribe((val) => console.log('late sub', val));
            subject.next(4);
        }, 3000);
    }
}


   // const source1$ = of(1, 2, 3);
        // const source2$ = of(4, 5, 6);
        // const source3$ = of(7, 8, 9);
        // const result$ = concat(source1$, source2$, source3$);
        // result$.subscribe(
        //     (data) => console.log(data)
        // );
        // const interval1$ = interval(1000);
        // const interval2$ = interval1$.pipe(map(val => 10 * val));
        // const result2$ = merge(interval1$, interval2$);
        // result2$.subscribe(console.log);

        // const sub = interval1$.subscribe(console.log);
        // setTimeout(() => {
        //     sub.unsubscribe();
        // }, 5000);
        // const http$ = createHttpObservable('/api/courses');
        // const sub = http$.subscribe(console.log());

        // setTimeout(() => {
        //     sub.unsubscribe();
        // }, 5);
