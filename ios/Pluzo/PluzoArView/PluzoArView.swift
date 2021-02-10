//
//  PluzoArView.swift
//  Pluzo
//
//  Created by App Developer on 1/31/21.
//

import DeepAR
import react_native_agora

class PluzoArView: UIView {
  
  private var arView: ARView?
  private var cameraController: CameraController?
  private var nWidth: CGFloat = UIScreen.main.bounds.width
  private var nHeight: CGFloat = UIScreen.main.bounds.height
  
  private var maskPaths: [String?] {
    return Masks.allCases.map { $0.rawValue.path }
  }
 
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupView(frame.width, frame.height)
  }
 
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  
  deinit {
    arView?.shutdown()
    arView?.delegate = nil
  }
  
  func setupView(_ width: CGFloat, _ height: CGFloat) {
    self.nWidth = width
    self.nHeight = height
    
    arView = ARView(frame: CGRect(x: 0, y: 0, width: width, height: height))
    arView?.setLicenseKey("a3504a3cde81d9da05c5cd48350b6c421003247eddb3477cce87317940bd94cb61e9c56dd1cb10f5")
    arView?.delegate = self
    
    arView?.translatesAutoresizingMaskIntoConstraints = false
    addSubview(arView!)
    arView?.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 0).isActive = true
    arView?.rightAnchor.constraint(equalTo: self.rightAnchor, constant: 0).isActive = true
    arView?.topAnchor.constraint(equalTo: self.topAnchor, constant: 0).isActive = true
    arView?.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: 0).isActive = true
    arView?.backgroundColor = UIColor(red: 0/255.0, green: 177.0/255.0, blue: 255.0/255.0, alpha: 0.5)

    cameraController = CameraController()
    cameraController?.arview = arView
    cameraController?.startCamera()
  }
  
  @objc var externalVideo = false {
    didSet {}
  }
  
  @objc var startCapture = false {
    didSet {}
  }
  
  @objc var maskMode = 0 {
    didSet {
      if (arView != nil) {
        arView?.switchEffect(withSlot: "masks", path: maskPaths[self.maskMode])
      }
    }
  }
  
  @objc var frontCamera = true {
    didSet {
      if (cameraController != nil) {
        cameraController?.position = self.frontCamera ? .front : .back
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
    if (RtcEngineManager.existChannel) {
      let videoFrame = AgoraVideoFrame()
      videoFrame.strideInPixels = Int32(self.nWidth)
      videoFrame.height = Int32(self.nHeight)
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
    arView?.startFrameOutput(withOutputWidth: Int32(self.nWidth),
                             outputHeight: Int32(self.nHeight),
                             subframe: CGRect(x: 0.0, y: 0.0, width: 1.0, height: 1.0))
    arView?.switchEffect(withSlot: "masks", path: maskPaths[self.maskMode])
  }
  
  func faceVisiblityDidChange(_ faceVisible: Bool) {
  }
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
