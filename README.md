# Run backend
```cd backend/server``` 

```npm i```

```npm run start:ins ```

```npm run start:user ```

# Run Front React Server
```cd React-Front ```

```npm i ```

```npm run start```

## Run Ins Verifier Server 

``` cd ~/path/to/InsSignTool/ ```

``` python -m flask run --port 11000 --host=0.0.0.0 --no-reload --with-threads ```

## Run User Verify tools in localhost

``` cd VerifierV2```

``` pip install -r .\requirements.txt ```

``` python -m flask run --port 13000 --host=127.0.0.1 --no-reload --with-threads ```