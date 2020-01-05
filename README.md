# Serverless Boilerplate

This project contains the necessary files / steps for getting a serverless project up and running within AWS.

It contains your lambda API project structure, deployment files, cloudformation templates for any other AWS resources (dynamodb, s3 etc..), and CircleCI integration files.

## Getting started

1. Create an AWS account.
2. Install the AWS-cli.
3. Install the [serverless](https://serverless.com/framework/docs/getting-started/) package.

Follow the steps in this blog post to set up the AWS cli and credentials on your local machine.
https://cloudacademy.com/blog/how-to-use-aws-cli/

## Set up your IAM role for your project

The IAM role describes the resources which your project can access within your account.

For example, if you want your microservice to only have access to a certain s3 bucket, you would limit that in your project's IAM role.

https://aws.amazon.com/iam/

## Apply your IAM role to the serverless.yml file.

```
role: THE-ARN-OF-YOUR-LAMBDA-IAM-ROLE
```

This is important, as it will tell your lambdas which role to reference.

## Create your S3 Deployment bucket

Each lambda code is stored in an S3 bucket within your aws account.

This must be created manually first before deploying your lambda.

Once created, change the reference within the `serverless.yml` file.

```
deploymentBucket:
    name: YOUR_PROJECT-${self:custom.stage}-continuous-delivery
    serverSideEncryption: AES256
```

## Sync your project with your CircleCI account.

This project uses CircleCI for continuous integration.

Once set up, add the following environment variables within CircleCI.

1. `AWS_ACCESS_KEY_ID` - Your aws access key id for your account
2. `AWS_SECRET_ACCESS_KEY` - Your aws secret key for your account.
3. `AWS_DEFAULT_REGION` - Your default region. ex: `us-east-1`

## Update the `scripts/deploy.sh` file with your cloudformation stack name

```
STACK_NAME=MY_PROJECT_STACK_NAME
```

ex: `foo-serverless-resources`

This tells AWS what your cloudformation stack name will be when creating your project's resources.

## Update the cloudformation file names with your above stack name

```
STACK_NAME=MY_PROJECT_STACK_NAME
```

ex: `foo-serverless-resources-dev.yml`

## Update the cloudformation files with your stack information

By default, there is a DynamoDB definition within the cloudformation template.
You need to change the name of the stack definition & stack name in that file, as well as the Dynamo table name so that it matches your projects needs.

## Run your local test deployment

```
npm run deploy:local
```