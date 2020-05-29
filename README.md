
# Basic-REST-API From NodeJS

- Dont' forget to run npm install and npm install express,...

- Inspired By DevMastery Designing a Clean REST API with Node.JS(Express+Mongo)




- But Db Codes Not Actually Injection to MongoDb. It's MYSQL but you can add also mongo db operation codes to db js file.Because when you database parameter attempt to object whatever you want to db.Because database parameter does not know which db is actually working until you attempt object or value to database parameter. It's a basically injection or DI(Depency Injection). Because actually you prevent to database dependency

- This Basic-REST-API do not use special middleware.which developer is writing to own middleware.Just ı used to third-party library middleware and that third party is bodyparser package.
- As much as possible ı seperated to  application logics  and web framework(Express.js).Because user interface layer or should i say Express.js should not handle to application's logic.Application's helper or tools and business logic should handle to application's logic.Now if ı write own middleware,Middleware will be handle to middle some app's logic but middleware struct comes with Express library or framework at the mean UI Layer.Remember ı said to business or tool files should handle to app's logic.Beside business and files wrote with Pure Javascript and NodeJS


- Anyway ı tried to apply Clean Architecture to this api nearly. So Clean Architecture does not want to depency of any framework,drivers and db.

- Whatever,i will edit to users-contacts file and i will prepare endpoints from user-contacts and Besides i will probably need to some MySQL join Queries.Because user-contact is middle table from MySQL Db.

- İf you want to create db tables fastly,you can use MySqlSeeder.js file. Direction is=>db/mySQL/MySqlSeeder.js

- And lastly you can subscribe to DevMastery Youtube Channel.DevMastery's Clean Rest API design video is an awesome.Because i saw and understood so many best pratices technic with this video.You should watch this :)




