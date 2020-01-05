# Serverless Boilerplate

This project contains the necessary files / steps for getting a serverless project up and running within AWS.

It contains:
1. Lambda API project structure
2. Deployment files
3. Cloudformation templates for any other AWS resources (dynamodb, s3 etc..)
4. CircleCI integration files.

## Getting Started

1. Install this project's dependencies with `npm install`.
2. Create an AWS account.
3. Install the AWS-cli.
4. Install the [serverless](https://serverless.com/framework/docs/getting-started/) package.

Follow the steps in this blog post to set up the AWS cli and credentials on your local machine.
https://cloudacademy.com/blog/how-to-use-aws-cli/

## Set up your IAM role for your project

The IAM role describes the resources which your project can access within your account.

For example, if you want your microservice to only have access to a certain s3 bucket, you would limit that in your project's IAM role.

https://aws.amazon.com/iam/

## Apply changes to your serverless.yml file.



```
## Cange this to your stack name
name: change-the-name-of-this-variable-to-your-service

## Change to your role ARN
role: THE-ARN-OF-YOUR-LAMBDA-IAM-ROLE
```

Example:

```
role: arn:aws:iam::{ACCT}:role/test-role
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

**NOTE: You will need a deployment bucket per environment.**

## Sync your project with your CircleCI account.

This project uses CircleCI for continuous integration.

Once set up, add the following **ENVIRONMENT VARIABLES** within CircleCI.

1. `AWS_ACCESS_KEY_ID` - Your aws access key id for your account
2. `AWS_SECRET_ACCESS_KEY` - Your aws secret key for your account.
3. `AWS_DEFAULT_REGION` - Your default region. ex: `us-east-1`

## Update the `scripts/deploy.sh` file with your cloudformation stack name

This points to your cloudformation files on the local filesystem.

```
STACK_NAME=MY_PROJECT_STACK_NAME
```

## Update the cloudformation file names with your above stack name

ex: `foo-serverless-resources-dev`
ex: `foo-serverless-resources-prod`

## Update the cloudformation files with your stack information

By default, there is a DynamoDB definition within the cloudformation template.
You need to change the name of the stack definition & stack name in that file, as well as the Dynamo table name so that it matches your projects needs.

## Run your local test deployment

```
npm run deploy:local
```

It will take a few minutes, but this process will bundle your project locally, and sync the files to AWS for you.

This will mimic your dev environment.

## Test your lambdas

After your local deploy runs, the configuration for your lambda should be outputted.

```bash
Service Information
service: test-project
stage: dev
region: us-east-1
stack: test-project-dev
api keys:
  test-project-dev-apikey: API_KEY
endpoints:
  ANY - https://foo.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
functions:
  api: test-project-dev-api
layers:
  None
```

You can grab the endpoint and make a request to:

```
POST https://foo.execute-api.us-east-1.amazonaws.com/dev/users
```

**Make sure you include the `x-api-key` header with the API key above.**

You can also check the `Api-Gateway` console in AWS to see the lambdas that were created.

## Local development

You can run `npm start` to spin up your project locally.

You can then make requests to `http://127.0.0.1:50512/users` with the `x-api-key` header.
The default api key is outputted in your console.

## Examples

[Simple example](/example)

# Disclaimers

I'm definitely not great at cloudops, and I know much of this cloudformation stuff could be done better. If you see areas for improvement, please make a PR. :)