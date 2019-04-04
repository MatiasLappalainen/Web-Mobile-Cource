# To start

## create

`credentials.json`
and add

```
{
    "_id": "heroku_lp97b5gt.admin",
    "user": "admin",
    "db": "heroku_lp97b5gt",
    "roles": [
        {
            "role": "dbOwner",
            "db": "heroku_lp97b5gt"
        }
    ],
    "password": "password"
}
```

After that run `cd client && yarn build` or `cd client && npm run build`

Then run `cd ../ && node server.js`
