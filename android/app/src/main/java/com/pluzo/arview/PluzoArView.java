package com.pluzo.arview;

import android.Manifest;
import android.content.Context;
import android.graphics.Bitmap;
import android.media.Image;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.FrameLayout;

import androidx.core.app.ActivityCompat;

import ai.deepar.ar.ARErrorType;
import ai.deepar.ar.AREventListener;
import ai.deepar.ar.DeepAR;
import io.agora.rtc.base.RtcEngineManager;


public class PluzoArView extends FrameLayout implements AREventListener {

    private boolean startCapture = false;
    private boolean frontCamera = true;
    private int maskMode = 0;

    private CameraGrabber cameraGrabber;
    public static DeepAR deepAR;
    private GLSurfaceView surfaceView;
    private DeepARRenderer renderer;

    public PluzoArView(Context context) {
        super(context);
        setupView(context);
    }

    public PluzoArView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        setupView(context);
    }

    public PluzoArView(Context context, AttributeSet attrs) {
        super(context, attrs);
        setupView(context);
    }

    public void onFinishInflate(){
        super.onFinishInflate();
    }

    private void setupView(Context context) {
        if (deepAR == null) {
            deepAR = new DeepAR(context);
            deepAR.setLicenseKey("8ccd702788bcd10c41576ba15b0261aa4d05f73fb3e41c160f95e08692a374e2c61a3c62feef7c0a");
            deepAR.initialize(context, this);
        }

        setup(context);
    }

    void setup(Context context) {
        cameraGrabber = new CameraGrabber();
        cameraGrabber.initCamera(new CameraGrabberListener() {
            @Override
            public void onCameraInitialized() {
                cameraGrabber.setFrameReceiver(deepAR);
                cameraGrabber.startPreview();
            }

            @Override
            public void onCameraError(String errorMsg) {
                Log.e("Error", errorMsg);
            }
        });

        surfaceView = new GLSurfaceView(context);
        surfaceView.setEGLContextClientVersion(2);
        surfaceView.setEGLConfigChooser(8,8,8,8,16,0);
        renderer = new DeepARRenderer(deepAR);

        surfaceView.setEGLContextFactory(new DeepARRenderer.MyContextFactory(renderer));

        surfaceView.setRenderer(renderer);
        surfaceView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);

        this.addView(surfaceView);
    }

    public void setStartCapture(boolean status) {
        this.startCapture = status;
        renderer.setCallInProgress(this.startCapture);
    }

    public void setExternalVideo() {
        if (RtcEngineManager.Companion.getEngine() != null) {
            RtcEngineManager.Companion.getEngine().setExternalVideoSource(true, true, true);
        }
    }

    public void setSwitchCamera(boolean frontCamera) {
    }

    public void setSwitchMask(int position) {
    }

    public void cleanData() {
        if (deepAR != null) {
            renderer.setCallInProgress(false);
            cameraGrabber.setFrameReceiver(null);
            cameraGrabber.stopPreview();
            cameraGrabber.releaseCamera();
            cameraGrabber = null;

            surfaceView.onPause();
            surfaceView = null;
//            deepAR.release();
//            deepAR = null;
        }
    }


    @Override
    public void screenshotTaken(Bitmap bitmap) {

    }

    @Override
    public void videoRecordingStarted() {

    }

    @Override
    public void videoRecordingFinished() {

    }

    @Override
    public void videoRecordingFailed() {

    }

    @Override
    public void videoRecordingPrepared() {

    }

    @Override
    public void shutdownFinished() {

    }

    @Override
    public void initialized() {
        deepAR.switchEffect("mask", "file:///android_asset/aviators");
    }

    @Override
    public void faceVisibilityChanged(boolean b) {

    }

    @Override
    public void imageVisibilityChanged(String s, boolean b) {

    }

    @Override
    public void frameAvailable(Image image) {

    }

    @Override
    public void error(ARErrorType arErrorType, String s) {

    }

    @Override
    public void effectSwitched(String s) {

    }
}