package com.pluzo.arview;

import android.content.Context;
import android.view.LayoutInflater;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.pluzo.R;

import org.jetbrains.annotations.NotNull;

public class PluzoArViewManager extends SimpleViewManager<PluzoArView> {

    public static final String REACT_CLASS = "RCTPluzoArView";
    String eventName = "onClick";

    @NotNull
    @Override
    public String getName() { return REACT_CLASS; }

    @NotNull
    @Override
    public PluzoArView createViewInstance(ThemedReactContext context) {
//        LayoutInflater inflater = (LayoutInflater)
//                context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
//        PluzoArView view = (PluzoArView)inflater.inflate(R.layout.pluzo_ar_view, null);

        PluzoArView view = new PluzoArView(context);

        return view;
    }

    @ReactProp(name = "startCapture")
    public void setStartCapture(PluzoArView view, Boolean startCapture) {
        view.setStartCapture(startCapture);
    }

    @ReactProp(name = "frontCamera")
    public void setSwitchCamera(PluzoArView view, Boolean frontCamera) {
        view.setSwitchCamera(frontCamera);
    }

    @ReactProp(name = "maskMode")
    public void setSwitchMask(PluzoArView view, int maskMode) {
        view.setSwitchMask(maskMode);
    }

    @ReactProp(name="externalVideo")
    public void setExternalVideo(PluzoArView view, Boolean externalVideo) {
        view.setExternalVideo();
    }

    @Override
    public void onDropViewInstance(@NonNull PluzoArView view) {
        view.cleanData();
        super.onDropViewInstance(view);
    }
}