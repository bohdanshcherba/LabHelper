package com.labhelper;


import android.widget.RemoteViews;

import java.time.LocalDate;

import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Locale;

public class DateManager {
    public LocalDate selectedDate;

    public DateManager() {
        this.selectedDate = LocalDate.now();
    }


    public ArrayList<String> getDaysInMonth () {
        LocalDate date = selectedDate; // get current date
        int daysInMonth = date.lengthOfMonth(); // get number of days in current month
        int firstDayOfWeek = date.withDayOfMonth(1).getDayOfWeek().getValue(); // get day of week of first day in current month (1 = Monday, 7 = Sunday)

        // create an array to store the days of the month
        ArrayList<String> daysOfMonth = new ArrayList<>();

        // fill the array with empty values before the first day of the month
        for (int i = 0; i < firstDayOfWeek - 1; i++) {
            daysOfMonth.add("");
        }

        // fill the array with the days of the month
        for (int i = 1; i <= daysInMonth; i++) {
            LocalDate day = LocalDate.of(date.getYear(), date.getMonth(), i);
            daysOfMonth.add(day.toString());
        }

        // print the array
        return daysOfMonth;

    }
    public static String getDayFromDate(String strDate){

        LocalDate date = LocalDate.parse(strDate);
        int day = date.getDayOfMonth();
        return String.valueOf(day);
    }

    public String monthYearFromDate()
    {
        Month month = selectedDate.getMonth();
        String monthNameUkrainian = month.getDisplayName(TextStyle.FULL_STANDALONE, new Locale("uk"));
        monthNameUkrainian = monthNameUkrainian.substring(0, 1).toUpperCase() + monthNameUkrainian.substring(1);

        return monthNameUkrainian;
    }

    public void previousMonthAction(RemoteViews views)
    {
        this.selectedDate = this.selectedDate.minusMonths(1);
        setMonthView(views);
    }

    public void nextMonthAction(RemoteViews views)
    {
        this.selectedDate = this.selectedDate.plusMonths(1);
        setMonthView(views);
    }
    public void setMonthView(RemoteViews views)
    {

        views.setTextViewText(R.id.monthYearText, monthYearFromDate());
    }

}
