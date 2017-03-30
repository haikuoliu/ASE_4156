#!/bin/sh

npm run build

\cp dist/index.html ../o2o-stats-archive/archive/
cp dist/static/* ../o2o-stats-archive/archive/static/

echo ''
echo 'build, copy done, go to add tag, push, then deploy'

cd  ../o2o-stats-archive
git add --all
git commit -m "deploy `date +%Y%m%d-%H:%M`"
git pull
git push
