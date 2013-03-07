package com.gbg;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class GMPlugin extends CordovaPlugin {

	// public static int GET_GEONAME_URL = 0;
	// public static int RESULT_OK = 0;
	// private String callbackId;
	private static final String TAG = GMPlugin.class.getName();

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Log.i(GMPlugin.class.getName(), "action=" + action);
		if (action.equals("startGM")) {
			
			Log.i(TAG, "creating intent");
			Context context = cordova.getActivity().getApplicationContext();
			Intent intent = new Intent(context, GMActivity.class);
			cordova.getActivity().startActivity(intent);
			Log.i(TAG, "Intent started");
			
			return true;
		}
		return false;
	}
}
