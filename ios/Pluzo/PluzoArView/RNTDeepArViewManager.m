//
//  RNTDeepArViewManager.m
//  Pluzo
//
//  Created by new830 on 2/9/21.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridge.h"
#import "React/RCTUIManager.h"
#import "RNTDeepArViewManager.h"
#import "RNTDeepAr.h"

@implementation RNTDeepArViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  
  return [RNTDeepAr new];
}

RCT_EXPORT_VIEW_PROPERTY(onEventSent, RCTBubblingEventBlock)

//RCT_EXPORT_METHOD(switchEffect:(nonnull NSNumber *)reactTag andMaskPath:(NSString*)effect andSlot:(NSString*)slot)
//{
//  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNTDeepAR *> *viewRegistry) {
//    RNTDeepAr *view = viewRegistry[reactTag];
//    if (![view isKindOfClass:[RNTDeepAr class]]) {
//      RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
//    } else {
//      [view switchEffect:effect andSlot:slot ];
//    }
//  }];
//}

@end
