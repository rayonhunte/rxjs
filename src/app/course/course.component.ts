import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, throttle, throttleTime, subscribeOn
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: number;

    course$: Observable<Course>;

    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute, private store: Store) {

    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];
        const course$ = createHttpObservable(`/api/courses/${this.courseId}`);
        const lessons$ = this.loadLessons();
        forkJoin(course$, lessons$)
            .pipe (
                tap( ([course, lessons]) => {
                    console.log('course', course);
                    console.log('lessons', lessons);
                })
            ).subscribe();
    }

    ngAfterViewInit() {
       fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
           tap(() => console.log('working')),
           map(event => event.target.value),
            startWith(''),
            debounceTime(400),
            // distinctUntilChanged(),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search))
            // throttle(() => interval(500))
            // throttleTime(500)
        ).subscribe(console.log);
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`).pipe(
            map(res => res['payload']),
        );
    }
}











