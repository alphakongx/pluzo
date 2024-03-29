package com.pluzo.arview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PluzoArViewPackage implements ReactPackage {

    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NotNull ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new PluzoArViewManager());
    }

    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NotNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        return modules;
    }

}