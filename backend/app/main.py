from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from fastapi.security import OAuth2PasswordBearer
from app.routers import stock, forex, company, auth
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 security scheme
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


app.include_router(auth.router, tags=["auth"])
app.include_router(stock.router, tags=["stock"])
app.include_router(forex.router, tags=["forex"])
app.include_router(company.router, tags=["company"])


@app.get("/")
def read_root():
    return {"message": "Financial Data API"}


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Financial Data API",
        version="1.0.0",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "OAuth2PasswordBearer": {
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/auth/login",
                    "scopes": {},
                }
            },
        }
    }
    openapi_schema["security"] = [{"OAuth2PasswordBearer": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
