npm run build
cd dist
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/okeke-ugochukwu/Frontend_mentor_rest_api_countries main:live
cd ..