#!/bin/bash

# Exit on error
set -e

# Build static assets
npm run build

# Sync to S3
aws s3 sync ./dist s3://YOUR_BUCKET/ --delete

# Invalidate all files in CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
