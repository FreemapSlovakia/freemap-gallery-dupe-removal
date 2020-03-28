# Tool for removing duplicate images

1. update `ids.js` with result from `select ids from (select count(*) as cnt, userId, group_concat(id) as ids from picture group by lat, lon, userId having cnt > 1) c;`
1. run: `yarn start`
1. open app with `google-chrome --user-data-dir=tmp1 --disable-security http://localhost:3000`
1. modify `App.js` for authorization, range, etc

Click on image to delete (if static), click on OK to skip (if animates).
