package com.labhelper;


import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;

import android.os.Build;
import android.os.Bundle;

import android.util.Log;
import android.widget.RemoteViews;

import com.facebook.react.bridge.ReactApplicationContext;

import java.util.Calendar;


/**
 * Implementation of App Widget functionality.
 */
public class Widget extends AppWidgetProvider {
    static DateManager dm = new DateManager();
    private final static String PREV_MOON_CLICKED = "PREV_MOON_CLICKED";
    private final static String NEXT_MOON_CLICKED = "NEXT_MOON_CLICKED";
    private final static String DAY_SWITCH = "DAY_SWITCH";
    private ReactApplicationContext reactContext;

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.calendar_widget);
        Intent intent = new Intent(context, MyWidgetRemoteViewsService.class);

        SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        String appString = sharedPref.getString("appData", "{\"text\":'no data'}");

        Bundle extras = new Bundle();
        extras.putString("days", dm.getDaysInMonth().toString());
        extras.putString("marked", appString);
        intent.putExtras(extras);

        dm.setMonthView(views);

        intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)));
        views.setRemoteAdapter(R.id.grid_view, intent);

        views.setEmptyView(R.id.grid_view, R.id.example_widget_empty_view);

        appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.grid_view);

        views.setOnClickPendingIntent(R.id.btn_back, getPendingSelfIntent(context, PREV_MOON_CLICKED));
        views.setOnClickPendingIntent(R.id.btn_forward, getPendingSelfIntent(context, NEXT_MOON_CLICKED));

        // open app
        views.setOnClickPendingIntent(R.id.monthYearText, createLaunchIntent(context));


        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onReceive(Context context, Intent MyIntent) {
        super.onReceive(context, MyIntent);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.calendar_widget);
        ComponentName componentName = new ComponentName(context, Widget.class);
        if (MyIntent.getAction().equals(PREV_MOON_CLICKED)) {

            dm.previousMonthAction(views);
            Intent intent = new Intent(context, MyWidgetRemoteViewsService.class);

            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");

            Bundle extras = new Bundle();
            extras.putString("days", dm.getDaysInMonth().toString());
            extras.putString("marked", appString);
            intent.putExtras(extras);

            intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)));
            views.setRemoteAdapter(R.id.grid_view, intent);

            AppWidgetManager.getInstance(context).updateAppWidget(componentName, views);

        } else if (MyIntent.getAction().equals(NEXT_MOON_CLICKED)) {
            dm.nextMonthAction(views);
            Intent intent = new Intent(context, MyWidgetRemoteViewsService.class);

            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");

            Bundle extras = new Bundle();
            extras.putString("days", dm.getDaysInMonth().toString());
            extras.putString("marked", appString);
            intent.putExtras(extras);

            intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)));
            views.setRemoteAdapter(R.id.grid_view, intent);

            AppWidgetManager.getInstance(context).updateAppWidget(componentName, views);
        } else if (MyIntent.getAction().equals(DAY_SWITCH)) {
            Log.d("WIDGET", "UPDATE");
            Intent intent = new Intent(context, MyWidgetRemoteViewsService.class);

            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");

            Bundle extras = new Bundle();
            extras.putString("days", dm.getDaysInMonth().toString());
            extras.putString("marked", appString);
            intent.putExtras(extras);

            intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)));
            views.setRemoteAdapter(R.id.grid_view, intent);

            AppWidgetManager.getInstance(context).updateAppWidget(componentName, views);
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);
        scheduleUpdate(context);
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }


    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        // RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.calendar_widget);
        // appWidgetManager.updateAppWidget(appWidgetId, views);
    }


    private void resizeWidget(Bundle appWidgetOptions, RemoteViews views) {
        int minWidth = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH);
        int maxWidth = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH);
        int minHeight = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT);
        int maxHeight = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT);

    }

    private static PendingIntent getPendingSelfIntent(Context context, String action) {
        Intent clickIntent = new Intent(context, Widget.class);
        clickIntent.setAction(action);

        int pendingFlags;
        if (Build.VERSION.SDK_INT >= 23) {
            pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE;
        } else {
            pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        }

        return PendingIntent.getBroadcast(context, 0, clickIntent, pendingFlags);
    }


    private static PendingIntent createLaunchIntent(Context context) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.setAction(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_MUTABLE);
        } else {
            return PendingIntent.getActivity(context, 0, intent, 0);
        }

    }

    private void scheduleUpdate(Context context) {
        Intent intent = new Intent(context, Widget.class);
        intent.setAction(DAY_SWITCH);

        int pendingFlags;

        if (Build.VERSION.SDK_INT >= 23) {
            pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE;
        } else {
            pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        }

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, pendingFlags);

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        long interval = 1 * 60 * 1000; // set the interval to 6 hour
        // Set the alarm to start at midnight
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 30);
        calendar.set(Calendar.MILLISECOND, 0);

// Repeat the alarm every day
        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pendingIntent);
    }
    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}