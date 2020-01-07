//
//  NativeFunctions.m
//  NativeModulesApp
//
//  Created by ETERATION on 1/6/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


#import "NativeFunctions.h"
#import <React/RCTLog.h>

@implementation NativeFunctions

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(doNativeLog:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}


// Callbacks
RCT_EXPORT_METHOD(callBackMethodExample:(RCTResponseSenderBlock)callback)
{
  NSString *tmpValue = @"huseyinnurbaki";

  NSArray *events = @[tmpValue];
  RCTLogInfo(@"Pretending to create an event %@ ", events);

  callback(@[[NSNull null], events]);
}

RCT_EXPORT_METHOD(doSomethingExpensive:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    // Call long-running code on background thread
    // You can invoke callback from any thread/queue
    NSString *tmpValue = @"LOL";
    
    callback(@[tmpValue]);
  });
}
@end
