# Deploy com Docker
>docker-compose up

## Serviços

### Postgres:
- Database: db
- Porta: 5454
- Username: postgres
- Password: root

### PGAdmin:
- Porta: 9090
- Username: root@email.com
- Password: root

### Front: 
- Porta: 3000
- admin: 123456
- comum: 123456

### Service:
- Porta: 8080

#### Objetos Json

##### Request Autenticação:
```
{
    "username": "admin",
    "password": "123456"
}
```

##### Response Autenticação:
```
{
    "jwtToken": "ey...",
    "username": "admin",
    "roles": [
        "ADMIN"
    ]
}
```

##### Cliente: 
```
{
    "id": "",
    "nome": "",
    "cpf": "",
    "endereco": {
        "id": "",
        "cep": "",
        "logradouro": "",
        "bairro": "",
        "cidade": "",
        "uf": "",
        "complemento": ""
    },
    "telefoneList": [
        {
            "id": "",
            "tipo": "",
            "numero": ""
        }
    ],
    "emailList": [
        {
            "id": "",
            "email": ""
        }
    ]
}
```


#### Objetos Json
- POST localhost:8080/auth
- GET localhost:8080/cliente
- POST localhost:8080/cliente
- PUT localhost:8080/cliente
- DELETE localhost:8080/cliente/{id}




