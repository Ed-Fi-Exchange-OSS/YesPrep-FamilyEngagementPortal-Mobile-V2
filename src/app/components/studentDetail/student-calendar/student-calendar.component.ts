import { Schedule } from './../../../models/IStudent';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css']
})
export class StudentCalendarComponent implements OnInit {

  @Input() studentId: any;
  calendarEventAvailableColors = ['event-light-blue', 'event-orange', 'event-pink', 'event-purple', 'event-teal', 'event-green', 'event-brown', 'event-indigo', 'event-blue-grey', 'event-light-blue', 'event-orange', 'event-pink', 'event-purple', 'event-teal', 'event-green', 'event-brown', 'event-indigo', 'event-blue-grey'];
  courses = [];
  _daysToShow = [];
  model: any;
  constructor(private api: ApiService, private translate: TranslateService) {
    let lang = this.translate.getBrowserCultureLang();
    if (lang.indexOf("es") != -1) {
      moment.locale('es');
    }
    else {
      moment.locale('en');
    }
  }

  ngOnInit() {
    this.api.services.students.getStudentSchedule(this.studentId).then((schedule: Schedule) => {
      this.model = schedule;
      this.createPostionioning();
    });
  }

  calendarEventColor(calendarEvent) {
    // Find the course in the courses array. 
    // If there then return that color as we want it to be the same.
    // If not assign a color and return it.
    let currentCourse = this.findCourseInArray(calendarEvent.courseTitle);

    if (currentCourse != null)
      return currentCourse.color;

    // If no course then choose a color and save it to the array.
    let color = this.getAvailableColor();
    this.courses.push({ courseTitle: calendarEvent.courseTitle, color: color })
    return color;
  }

  findCourseInArray(courseTitle) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].courseTitle == courseTitle)
        return this.courses[i];
    }

    return null;
  }
  getAvailableColor() {
    return this.calendarEventAvailableColors[this.courses.length];
  }

  timeToTopAndHeight(event) : void {
    let calendarHourHeight = 56;

    let startTimeDate = this.parseDate(event.startTime);
    // Calculate Top
    // We use -7 beacuse the calendar starts at 7 am
    let topHours = (startTimeDate.getHours() - 7) * calendarHourHeight;
    let topMinutes = (startTimeDate.getMinutes() / 60) * calendarHourHeight;
    event.top = topHours + topMinutes;

    // Calculate Height
    event.height = (event.durationInMinutes / 60) * calendarHourHeight;
  }

  createPostionioning() {
    let daysToShow = [];
    let nextDayOfWeek;
    let prevDayOfWeek;
    
    
    let actualDay = this.model.days.find((day) => {
        nextDayOfWeek = moment(day.date).add(1, 'days').format('dddd');
        nextDayOfWeek = this.isWeekend(nextDayOfWeek.toUpperCase(), true);
        prevDayOfWeek = moment(day.date).add(-1, 'days').format('dddd');
        prevDayOfWeek = this.isWeekend(prevDayOfWeek.toUpperCase(), false);
        return true;
    }); 

    let nextDay = this.model.days.find((day) => {
      return moment(day.date).format('dddd').toUpperCase() == nextDayOfWeek;
    });
    let prevDay = this.model.days.find((day) => {
      return moment(day.date).format('dddd').toUpperCase() == prevDayOfWeek;
    });

    /** this is the current order to show */
    if(prevDay != undefined && actualDay != undefined && nextDay != undefined) {
      prevDay.dayName = moment(prevDay.date).format('ddd');
      actualDay.dayName = moment(actualDay.date).format('ddd');
      nextDay.dayName = moment(nextDay.date).format('ddd');
      daysToShow.push(prevDay);
      daysToShow.push(actualDay);
      daysToShow.push(nextDay);
    }
    
    daysToShow.forEach(day => {
      day.events.forEach((event) => {
        this.timeToTopAndHeight(event);
      });
    });

    this._daysToShow = daysToShow;
    
  }

  isWeekend(dayofWeek, isNextDay) {
    if (isNextDay) {
      if (dayofWeek == 'SATURDAY') {
        return 'MONDAY';
      }
      if (dayofWeek == 'SABADO') {
        return 'LUNES';
      }
    } else {
      if (dayofWeek == 'SUNDAY') {
        return 'FRIDAY';
      }
      if (dayofWeek == 'DOMINGO') {
        return 'VIERNES';
      }
    }
    return dayofWeek;
  }

  /** This function was added for support ios and android
   */
  parseDate(date) {
    if (this.api.services.mobile.device == 'Android') {
      return new Date(date);
    } else {
      const dateSplit = date.split(/[^0-9]/);
      return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2], dateSplit[3], dateSplit[4], dateSplit[5]);
    }
  }
}
