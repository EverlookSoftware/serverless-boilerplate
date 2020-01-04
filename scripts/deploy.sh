#!/bin/bash

# variables
STACK_NAME=nomad-serverless-api

cat > ~/.aws/credentials << EOF1
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF1

if [ "${CIRCLE_BRANCH}" = "master" ]; then
  NODE_ENV=production STAGE=prod npx serverless --region=us-east-1 --target=prod deploy
elif [ "${CIRCLE_BRANCH}" = "staging" ]; then
  NODE_ENV=production STAGE=staging npx serverless --region=us-east-1 --target=staging deploy
elif [ "${CIRCLE_BRANCH}" = "develop" ]; then
  NODE_ENV=production STAGE=dev npx serverless --region=us-east-1 --target=dev deploy
else
  echo "Branch was not found in allowed branches: [master, develop]. Exiting."
fi