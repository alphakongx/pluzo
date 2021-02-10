package com.pluzo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.pluzo.arview.PluzoArView;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Pluzo";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();

    if (PluzoArView.deepAR != null) {
      PluzoArView.deepAR.release();
    }
  }
}
