//
//  PluzoArView.swift
//  Pluzo
//
//  Created by App Developer on 1/31/21.
//

//import DeepAR
//import react_native_agora
import AVFoundation

class PluzoArView: RCTView {
  
//  private var arView: ARView!
//  private var cameraController: CameraController!
  private var viewSize: CGRect = CGRect.zero
  private var initialized: Bool = false
  private var isCapturing: Bool = false
  
  private var maskPaths: [String?] {
    return Masks.allCases.map { $0.rawValue.path }
  }
 
  override init(frame: CGRect) {
    super.init(frame: frame)
//    setupView(frame: frame)
  }
 
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  
/*  override func reactSetFrame(_ frame: CGRect) {
    super.reactSetFrame(frame)
    viewSize = frame
    if (frame.width == 0 && frame.height == 0) {print("removed >>>>>")
      if (isCapturing) {
        arView.stopFrameOutput()
        isCapturing = false
      }
    } else {
      if (viewSize.origin.x != frame.origin.x ||
            viewSize.origin.y != frame.origin.y ||
            viewSize.size.width != frame.size.width ||
            viewSize.size.height != frame.size.height) {print("updated >>>>>")
        if (isCapturing) {
          arView.stopFrameOutput()
          isCapturing = false
        }
        arView.frame = frame
        arView.layoutIfNeeded()
        
        if (isCapturing == false) {
          startVideoCapturing()
        }
      }
    }
  }
  
  deinit {
    if (cameraController != nil) {
      cameraController?.stopCamera()
      cameraController = nil
    }
    if (arView != nil) {
      arView.shutdown()
    }
  }
  
  func setupView(frame: CGRect) {
    arView = ARView(frame: frame)
    arView.setLicenseKey("a3504a3cde81d9da05c5cd48350b6c421003247eddb3477cce87317940bd94cb61e9c56dd1cb10f5")
    arView.delegate = self
    addArView()
    
    cameraController = CameraController()
    cameraController.arview = arView
    cameraController.startCamera()
    
    arView.initialize()
  }
  
  func addArView() {
//    arView?.translatesAutoresizingMaskIntoConstraints = false
    addSubview(arView)
//    arView?.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 0).isActive = true
//    arView?.rightAnchor.constraint(equalTo: self.rightAnchor, constant: 0).isActive = true
//    arView?.topAnchor.constraint(equalTo: self.topAnchor, constant: 0).isActive = true
//    arView?.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: 0).isActive = true
    arView.backgroundColor = UIColor(red: 0/255.0, green: 177/255.0, blue: 255/255.0, alpha: 0.5)
  }
  
  func startVideoCapturing() {
    if (initialized && isCapturing == false) {
      arView.startFrameOutput(withOutputWidth: Int32(viewSize.width),
                              outputHeight: Int32(viewSize.height),
                              subframe: CGRect(x: 0.0, y: 0.0, width: 1.0, height: 1.0))
      arView.switchEffect(withSlot: "masks", path: maskPaths[self.maskMode])
      isCapturing = true
    }
  }
  
  @objc var externalVideo = false {
    didSet {}
  }
  
  @objc var startCapture = false {
    didSet {
//      if (startCapture == true) {
//        startVideoCapturing()
//      } else {
//        if (initialized == true && isCapturing == true) {
//          arView?.stopFrameOutput()
//          isCapturing = false
//        }
//      }
    }
  }
  
  @objc var maskMode = 0 {
    didSet {
      if (arView != nil && initialized == true) {
        arView.switchEffect(withSlot: "masks", path: maskPaths[self.maskMode])
      }
    }
  }
  
  @objc var frontCamera = true {
    didSet {
      if (cameraController != nil) {
        cameraController.position = self.frontCamera ? .front : .back
      }
    }
  }
}

extension PluzoArView: DeepARDelegate {
  func didFinishPreparingForVideoRecording() {}
      
  func didStartVideoRecording() {}
  
  func frameAvailable(_ sampleBuffer: CMSampleBuffer!) {
      
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
        print("*** NO BUFFER ERROR")
        return
    }

    let time = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
    guard let engine = RtcEngineManager.sharedEngine else {
      return
    }
    if (RtcEngineManager.existChannel && viewSize.width > 0) {
      let videoFrame = AgoraVideoFrame()
      videoFrame.strideInPixels = Int32(viewSize.width)
      videoFrame.height = Int32(viewSize.height)
      videoFrame.format = 12
      videoFrame.time = time
      videoFrame.textureBuf = pixelBuffer
      videoFrame.rotation = 0
      
      engine.pushExternalVideoFrame(videoFrame)
    }
  }
  
  func didFinishVideoRecording(_ videoFilePath: String!) {}
  
  func recordingFailedWithError(_ error: Error!) {}
  
  func didTakeScreenshot(_ screenshot: UIImage!) {}
  
  func didInitialize() {
    initialized = true
    startVideoCapturing()
  }
  
  func faceVisiblityDidChange(_ faceVisible: Bool) {
  }*/
}

@objc (RCTPluzoArViewManager)
class RCTPluzoArViewManager: RCTViewManager {
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return PluzoArView()
  }
}
