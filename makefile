# force to use bash
SHELL = /bin/bash

include .env
export

WEBHOOK_ARN=hb7r6hbyre
STAGE=dev

SET_WEBHOOK_URL := https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook

# Possible values:
# queue - to leverage SQS service via two lambdas
# stepfn - to leverage Step Functions service via single (or more if required) lambda workflow
WEBHOOK_TYPE := stepfn

WEBHOOK_URL := https://${WEBHOOK_ARN}.execute-api.${AWS_REGION}.amazonaws.com/${STAGE}/handle/${WEBHOOK_TYPE}

init:
	@ make deps webhook deploy
.PHONY: init

deps:
	@ echo "-> Installing dependencies..."
	@ npm install
.PHONY: deps

webhook:
	@ echo "-> Setting webhook..."
	@ curl --request POST --url ${SET_WEBHOOK_URL} --header 'content-type: application/json' --data '{"url": "${WEBHOOK_URL}"}'
.PHONY: webhook

deploy:
	@ echo "-> Deploying bot..."
	@ node node_modules/serverless/bin/serverless deploy
.PHONY: deploy

.DEFAULT_GOAL := init
