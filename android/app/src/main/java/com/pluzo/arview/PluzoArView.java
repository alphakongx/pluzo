package com.pluzo.arview;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;


public class PluzoArView extends FrameLayout {

    // private boolean startCapture = false;
    // private boolean frontCamera = true;
    // private int maskMode = 0;

    // private CameraGrabber cameraGrabber;
    // private DeepAR deepAR;
    // private GLSurfaceView surfaceView;
    // private DeepARRenderer renderer;

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
        // if (deepAR == null) {
        //     deepAR = new DeepAR(context);
        //     deepAR.setLicenseKey("8ccd702788bcd10c41576ba15b0261aa4d05f73fb3e41c160f95e08692a374e2c61a3c62feef7c0a");
        //     deepAR.initialize(context, this);
        // }

        setup(context);
    }

    void setup(Context context) {
        // cameraGrabber = new CameraGrabber();
        // cameraGrabber.initCamera(new CameraGrabberListener() {
        //     @Override
        //     public void onCameraInitialized() {
        //         cameraGrabber.setFrameReceiver(deepAR);
        //         cameraGrabber.startPreview();
        //     }

        //     @Override
        //     public void onCameraError(String errorMsg) {
        //         Log.e("Error", errorMsg);
        //     }
        // });

        // surfaceView = new GLSurfaceView(context);
        // surfaceView.setEGLContextClientVersion(2);
        // surfaceView.setEGLConfigChooser(8,8,8,8,16,0);
        // renderer = new DeepARRenderer(deepAR);

        // surfaceView.setEGLContextFactory(new DeepARRenderer.MyContextFactory(renderer));

        // surfaceView.setRenderer(renderer);
        // surfaceView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);

        // this.addView(surfaceView);
    }

    public void setStartCapture(boolean status) {
        // this.startCapture = status;
        // renderer.setCallInProgress(this.startCapture);
    }

    public void setExternalVideo() {
        // if (RtcEngineManager.Companion.getEngine() != null) {
        //     RtcEngineManager.Companion.getEngine().setExternalVideoSource(true, true, true);
        // }
    }

    public void setSwitchCamera(boolean frontCamera) {
    }

    public void setSwitchMask(int position) {
    }

    public void cleanData() {
        // if (surfaceView != null) {
        //     surfaceView.onPause();
        // }
        // cameraGrabber.setFrameReceiver(null);
        // cameraGrabber.stopPreview();
        // cameraGrabber.releaseCamera();
        // cameraGrabber = null;
        // if (deepAR != null) {
        //     deepAR.release();
        // }
    }
}