package com.gbg;

import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.util.Log;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.LocationSource;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

public class GMActivity extends FragmentActivity implements LocationListener,
		LocationSource {

	private GoogleMap map;
	private OnLocationChangedListener mListener;
	private LocationManager locationManager;
	private String TAG = "GMActivity";
	private Location prevLocation;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.i(TAG, "Creating GMActivity");

		setContentView(R.layout.map);
		locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

		if (locationManager != null) {
			boolean gpsIsEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
			boolean networkIsEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

			if (gpsIsEnabled) {
				locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000L, 10F, this);
				
			} else if (networkIsEnabled) {
				locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000L, 10F, this);
				
			} else {
				// Show an error dialog that GPS is disabled.
				Log.e(TAG, "GPS is disabled");
			}
			
		} else {
			// Show a generic error dialog since LocationManager is null for some reason
			Log.e(TAG, "location manager is null");
		}

		setUpMapIfNeeded();
	}

	@Override
	public void onPause() {
		if (locationManager != null) {
			locationManager.removeUpdates(this);
		}

		super.onPause();
	}

	@Override
	public void onResume() {
		super.onResume();

		setUpMapIfNeeded();
	}

	/**
	 * Sets up the map if it is possible to do so (i.e., the Google Play
	 * services APK is correctly installed) and the map has not already been
	 * instantiated.. This will ensure that we only ever call
	 * {@link #setUpMap()} once when {@link #map} is not null.
	 * <p>
	 * If it isn't installed {@link SupportMapFragment} (and
	 * {@link com.google.android.gms.maps.MapView MapView}) will show a prompt
	 * for the user to install/update the Google Play services APK on their
	 * device.
	 * <p>
	 * A user can return to this Activity after following the prompt and
	 * correctly installing/updating/enabling the Google Play services. Since
	 * the Activity may not have been completely destroyed during this process
	 * (it is likely that it would only be stopped or paused),
	 * {@link #onCreate(Bundle)} may not be called again so we should call this
	 * method in {@link #onResume()} to guarantee that it will be called.
	 */
	private void setUpMapIfNeeded() {
		// Do a null check to confirm that we have not already instantiated the map.
		if (map == null) {  
			// Try to obtain the map from the SupportMapFragment.
			map = ((SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map)).getMap();
			
			// Check if we were successful in obtaining the map.
			if (map != null) {
				map.setMyLocationEnabled(true);
				map.setLocationSource(this);
			}
		}
	}

	@Override
	public void activate(OnLocationChangedListener listener) {
		mListener = listener;
	}

	@Override
	public void deactivate() {
		mListener = null;
	}

	@Override
	public void onLocationChanged(Location location) {
		if (mListener != null) {
			mListener.onLocationChanged(location);

			// Move the camera to the user's location once it's available
			map.animateCamera(CameraUpdateFactory.newCameraPosition(CameraPosition.fromLatLngZoom(new LatLng(
					location.getLatitude(), location.getLongitude()), 15)));
			
			if (prevLocation != null) {
				Polyline line = map.addPolyline(new PolylineOptions()
				    .add(new LatLng(prevLocation.getLatitude(), prevLocation.getLongitude()),
				    		new LatLng(location.getLatitude(), location.getLongitude()))
				    .width(5)
				    .color(Color.BLUE)
				    .geodesic(true));
				
				prevLocation.set(location);

			} else {
				prevLocation = location;
			}
		} else {
			Log.e(TAG, "location listener is null");
		}
	}

	@Override
	public void onProviderDisabled(String provider) {
	}

	@Override
	public void onProviderEnabled(String provider) {
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
	}
}