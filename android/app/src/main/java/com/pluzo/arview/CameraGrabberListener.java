package com.pluzo.arview;

public interface CameraGrabberListener {
    void onCameraInitialized();
    void onCameraError(String errorMsg);
}
