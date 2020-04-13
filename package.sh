#!/bin/bash

DIR=$(dirname ${BASH_SOURCE[0]})
cd $DIR

FN=/tmp/codemonkey-hebrew-translate.zip
git archive --format zip --output $FN master
zip -q -d $FN screenshot.png monkey.svg package.sh
echo "Package is ready at $FN"

