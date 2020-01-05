#!/bin/bash

# variables
# CHANGE THIS TO YOUR STACK NAME
STACK_NAME=MY_PROJECT_STACK_NAME

cat > ~/.aws/credentials << EOF1
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF1

# This will run cloudformation to create any resources in your environment
# before it runs `serverless` to build your lambdas.
function run_cf_deploy {
  echo "--- Running deploy for: [${1}] ---"

  aws cloudformation deploy --no-fail-on-empty-changeset \
    --template-file ~/repo/cloudformation/${STACK_NAME}-resources-${1}.yml \
    --stack-name ${STACK_NAME}-resources-${1} \
    --parameter-overrides Environment=${1}
}

if [ "${CIRCLE_BRANCH}" = "master" ]; then
  run_cf_deploy prod

  NODE_ENV=production STAGE=prod npx serverless --region=us-east-1 --target=prod deploy
elif [ "${CIRCLE_BRANCH}" = "staging" ]; then
  run_cf_deploy staging

  NODE_ENV=production STAGE=staging npx serverless --region=us-east-1 --target=staging deploy
elif [ "${CIRCLE_BRANCH}" = "develop" ]; then
  run_cf_deploy dev

  NODE_ENV=production STAGE=dev npx serverless --region=us-east-1 --target=dev deploy
else
  echo "Branch was not found in allowed branches: [master, staging, develop]. Exiting."
fi