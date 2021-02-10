//
//  RNTDeepAr.m
//  Pluzo
//
//  Created by new830 on 2/9/21.
//

#import <Foundation/Foundation.h>
#import "RNTDeepAr.h"
#import <React/UIView+React.h>

@import react_native_agora;

@implementation RNTDeepAr {
  CGRect _frame;
  ARView* _arview;
  CameraController* _cameeraController;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    _arview = [[ARView alloc] init];
        
    [_arview setLicenseKey:@"a3504a3cde81d9da05c5cd48350b6c421003247eddb3477cce87317940bd94cb61e9c56dd1cb10f5"];
    
    _arview.delegate = self;
    [self addSubview:_arview];
    
    [_arview initialize];
    
    _cameeraController = [[CameraController alloc] init];
    [_cameeraController setArview:_arview];
    [_cameeraController startCamera];
  }
  return self;
}

- (void)dealloc
{
  [_arview shutdown];
  _arview.delegate = nil;
}

- (void)reactSetFrame:(CGRect)frame {
  [super reactSetFrame: frame];
  _frame = frame;
  [self setupDeepARViewFrame];
}

#pragma mark - DeepARDelegate methods
- (void)didInitialize {
  [self setupDeepARViewFrame];
  if (!CGRectIsEmpty(_frame)) {
    [_arview startFrameOutputWithOutputWidth:_frame.size.width outputHeight:_frame.size.height subframe:CGRectMake(0, 0, 1, 1)];
  }
}

-(void) setupDeepARViewFrame {
  if(_arview.initialized && !CGRectIsEmpty(_frame) &&
                            (_arview.frame.size.height != _frame.size.height ||
                             _arview.frame.size.width != _frame.size.width ||
                             _arview.frame.origin.x != _frame.origin.x ||
                             _arview.frame.origin.y != _frame.origin.y ) ) {
    [_arview setFrame:_frame];
    self.onEventSent(@{ @"type": @"initialized", @"value": @""});
  }
}

// Called when the finished the preparing for video recording.
- (void)didFinishPreparingForVideoRecording {}

- (void)frameAvailable:(CMSampleBufferRef)sampleBuffer {
//  [RtcEngineManager]
}

@end
