import "reflect-metadata";
import {createConnection, getManager} from "typeorm";
import {User} from "./entity/User";
import {Address} from "./entity/Address";
import {Company} from "./entity/Company";
const fetch = require("node-fetch");

createConnection().then( async connection => {
    
    //getting Json through HTTP using Fetch API
    let urlJson = 'https://jsonplaceholder.typicode.com/users/1';
    const dataJson = await getJson(urlJson);

    console.log("Json ", dataJson);

    let address = new Address();
    address.street = dataJson.address.street;
    address.suite = dataJson.address.suite;
    address.city = dataJson.address.city;
    address.zipcode = dataJson.address.zipcode;
    address.geo = { lat: dataJson.address.geo.lat, lng: dataJson.address.geo.lng };

    let company = new Company();
    company.name = dataJson.company.name;
    company.catchPhrase = dataJson.company.catchPhrase;
    company.bs = dataJson.company.bs;

    let user = new User();
    user.id = dataJson.id;
    user.username = dataJson.username;
    user.email = dataJson.email;
    user.phone = dataJson.phone;
    user.website = dataJson.website;
    user.company = company;
    user.address = address;

    console.log(user);

    let entityManager = getManager();
    let currentUser = await entityManager.find(User, { email: dataJson.email }); //user with same email
    console.log(typeof(currentUser));

    if (currentUser && currentUser.length >0)
    {
        console.log("User with :email already exists", {email: dataJson.email})
        await entityManager.remove(currentUser); //remove old user
    }
    else
    {
        console.log("User with :email is not in the database", {email: dataJson.email})
    }
        await entityManager.save(user);


}).catch(error => console.log(error));

async function getJson(url) 
{
    const response = await fetch(url);
    return response.json()
}