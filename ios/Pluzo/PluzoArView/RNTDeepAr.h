//
//  RNTDeepAr.h
//  Pluzo
//
//  Created by new830 on 2/9/21.
//

#import <DeepAR/ARView.h>
#import <React/RCTView.h>
#import <React/RCTComponent.h>

#ifndef RNTDeepAR_h
#define RNTDeepAR_h

@interface RNTDeepAr : RCTView<DeepARDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onEventSent;

@end

#endif /* RNTDeepAR_h */
