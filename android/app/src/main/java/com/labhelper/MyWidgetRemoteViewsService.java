package com.labhelper;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class MyWidgetRemoteViewsService extends RemoteViewsService {

    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {

        Bundle extras = intent.getExtras();

        String days = extras.getString("days");
        String appString = extras.getString("marked");

        String[][] marked = new String[0][];
        try {

            JSONObject rootObject = new JSONObject(appString);
            JSONArray markedArr = rootObject.getJSONArray("marked");
            marked = new String[markedArr.length()][2];
            for (int i = 0; i < markedArr.length(); i++) {
                JSONArray innerArray = markedArr.getJSONArray(i);
                marked[i][0] = innerArray.getString(0);
                marked[i][1] = innerArray.getString(1);
            }


        } catch (JSONException e) {
            Log.e("JSON", String.valueOf(e));
        }

        return new MyWidgetRemoteViewsFactory(this.getApplicationContext(), marked, days);
    }

    private static class MyWidgetRemoteViewsFactory implements RemoteViewsFactory {
        private Context mContext;
        private String[][] marked;
        ArrayList<String> daysInMonth;

        public MyWidgetRemoteViewsFactory(Context context, String[][] data, String days) {
            mContext = context;
            marked = data;
            String[] arr = days.substring(1, days.length() - 1).split(", ");
            daysInMonth = new ArrayList<>(Arrays.asList(arr));
        }

        @Override
        public void onCreate() {
        }

        @Override
        public RemoteViews getViewAt(int position) {
            RemoteViews rv = new RemoteViews(mContext.getPackageName(), R.layout.my_item_layout);
            String date = daysInMonth.get(position);

            try {
                if(date.length()<2){
                    rv.setTextViewText(R.id.text_view,"" );

                }else{
                    rv.setTextViewText(R.id.text_view,DateManager.getDayFromDate(date));
                }

            }
            catch (Exception ex){
                Log.d("ERR", String.valueOf(ex));
            }
            for (String[] day : marked) {
                if (Objects.equals(daysInMonth.get(position), day[0])) {

                    switch (String.valueOf(day[1])) {
                        case "#E53935":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_1);
                            break;
                        case "#F5B0AE":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_2);
                            break;
                        case "#C59E1C":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_3);
                            break;
                        case "#E8D8A4":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_4);
                            break;
                        case "#109a5a":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_5);
                            break;
                        case "#A4EDCC":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_6);
                            break;
                        case "#1976D3":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_7);
                            break;
                        case "#A3C8ED":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_8);
                            break;
                        case "#7A1CBC":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_9);
                            break;
                        case "#CAA4E4":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_10);
                            break;
                        case "#B01E80":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_11);
                            break;
                        case "#DFA5CC":
                            rv.setInt(R.id.item_view, "setBackgroundResource", R.drawable.bg_color_12);
                            break;
                    }
                }
            }

            return rv;
        }

        @Override
        public int getCount() {
            return daysInMonth.size();
        }

        @Override
        public void onDataSetChanged() {
        }

        @Override
        public void onDestroy() {
        }

        @Override
        public RemoteViews getLoadingView() {
            return null;
        }

        @Override
        public int getViewTypeCount() {
            return 1;
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public boolean hasStableIds() {
            return false;
        }

    }
}