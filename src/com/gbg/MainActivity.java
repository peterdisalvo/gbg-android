package com.gbg;

import org.apache.cordova.DroidGap;

import android.annotation.TargetApi;
import android.app.Dialog;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends DroidGap {
	private static final String TAG = MainActivity.class.getName();
	private int retryCount = 0;
	protected Dialog mSplashDialog;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.init();
		
		if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1) {
			fixJellyBeanIssues();
		}
		
		super.loadUrl("file:///android_asset/www/index.html", 5000);
	}

	@TargetApi(16)
	protected void fixJellyBeanIssues() {
		try {
			super.appView.getSettings().setAllowUniversalAccessFromFileURLs(true);
			
		} catch (NullPointerException e) {
			Log.e(TAG, "Unable to allow access from file URLs", e);
		}
	}

	// catch an error and if try again 1x or quit
	@Override
	public void onReceivedError(int errorCode, String description, String failingUrl) {
		if (retryCount < 3) {
			retryCount++;
			Log.i(TAG, "Connection failed, trying again.  Retry Count: " + retryCount);
			super.loadUrl("file:///android_asset/www/index.html");
			
		} else {
			Log.i(TAG, "Sorry, it failed three times so I give up.");
			super.loadUrl("file:///android_asset/www/fail.html");
		}
		return;
	}
}
