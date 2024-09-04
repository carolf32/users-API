# Users and products API

This API was made for the Phones E-commerce Project. With this API, anyone can Sign up and Login in the e-commerce, as well as employees, who can also add, remove or update products. I used Express and Typescript to construct it, Zod to validation and serialization, Prisma ORM to work with the data, Json Web Token and Bcrypt to encrypt data.

Each User contains:
|key|type|
|---|-----|
|id|number|
|email|string|
|name|string|
|role|enum|
|createdAt|date|

Each product contains:
|key|type|
|--|---|
|id|number|
|name|string|
|description|string|
|price|number|
|stock|number|
|category|string|
|createdAt|date|

And there are 2 possible roles: User(default)/Employee

# Routes - Users
|type|address|description|
|-|-|-|
|POST|/home/signup|signup route|
|POST|/home/login|login route|

# Routes - Products
|type|address|description|
|-|-|-|
|POST|/products|create a product route|
|GET|/products|list all products route|
|GET|/products/:id|list one product route|
|PATCH|/products/:id|update product route|
|DELETE|/products/:id|delete product route|

# Requests and responses
### POST/home/signup
#### Request template
```
{
	"email": "johndoe@mail.com",
	"password": "ab22",
	"name": "John Doe",
	"address": "address",
	"contact": 1234567
}
```
#### Response template (STATUS CODE 201)
```
{
	"email": "johndoe@mail.com",
	"name": "John Doe",
	"address": "address",
	"contact": 1234567
}
```
#### Possible error (STATUS CODE 403)
```
{
	"issues": [
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "string",
			"path": [
				"contact"
			],
			"message": "Expected number, received string"
		}
	],
	"name": "ZodError"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User already exists"
}
```

### POST/home/login
#### Request template
```
{
	"email": "johndoe@mail.com",
	"password": "ab22"
}
```
#### Response template (STATUS CODE 201)
```
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzIzOTk1NDc1fQ._RF-rJFXSVBsHLt3A0FwP9wf_CX1FzHc8OvBjbNifuw",
	"user": {
		"email": "johndoe@mail.com",
		"name": "John Doe",
		"address": "address",
		"contact": 1234567
	}
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User not registered"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"Email and password doesn't match"
}
```
### POST/products
#### Request template
```
	{
		"name":"fone1",
		"description":"description1",
		"price":123,
		"stock":2,
		"category":"headphones"
	}
```
#### Response template (STATUS CODE 201)
```
{
	"id": 4,
	"name": "fone1",
	"description": "description1",
	"price": 123,
	"stock": 2,
	"category": "headphones",
	"createdAt": "2024-08-18T15:45:49.720Z"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Invalid token"
}
```
### GET/products
#### Response template (STATUS CODE 201)
```
[
  {
  	"id": 4,
  	"name": "fone1",
  	"description": "description1",
  	"price": 123,
  	"stock": 2,
  	"category": "headphones",
  	"createdAt": "2024-08-18T15:45:49.720Z"
  }
]
```

### GET/products/:id
#### Response template (STATUS CODE 201)
```
{
	"id": 4,
	"name": "fone1",
	"description": "description1",
	"price": 123,
	"stock": 2,
	"category": "headphones",
	"createdAt": "2024-08-18T15:45:49.720Z"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "Product not found"
}
```

### PATCH/products/:id
All keys optional
#### Request template
```
	{
		"stock":12,
	}
```

#### Response template (STATUS CODE 201)
```
{
	"id": 4,
	"name": "fone1",
	"description": "description1",
	"price": 123,
	"stock": 12,
	"category": "headphones",
	"createdAt": "2024-08-18T15:45:49.720Z"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "Product not found"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"issues": [
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "string",
			"path": [
				"contact"
			],
			"message": "Expected number, received string"
		}
	],
	"name": "ZodError"
}
```
### DELETE/products/:id
There's no response body.

#### Possible error (STATUS CODE 404)
```
{
	"message": "Product not found"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```
