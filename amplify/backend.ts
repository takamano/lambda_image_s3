import { defineBackend } from '@aws-amplify/backend';
import { imageStorage } from './storage/resource';
import { generateThumb } from './functions/resize/resource';
import { EventType } from 'aws-cdk-lib/aws-s3';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';

const backend = defineBackend({
  imageStorage,
  generateThumb
});

backend.imageStorage.resources.bucket.addEventNotification(
  EventType.OBJECT_CREATED_PUT,
  new LambdaDestination(backend.generateThumb.resources.lambda),
  {
    prefix: 'originals/'
  }
)
