import express, { response } from 'express';
import bodyParser from 'body-parser';
import { promises as fs} from 'fs';
import { people } from './people';

let app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, function(err){
    if (err) {
        console.log('Error in server setup');
    } else {
        console.log("Server listening on Port, ", PORT);
    }
})

app.get('/', (request, response) => {
    response.send("<h1>Welcome to Node Demo Server with Express. </h1>");
})

app.get('/hello', (request, response)=>{
    response.send("<h2>Hello, World!</h2>")
})

app.get('/people', (request, response) => {
    response.json(people);
} )

app.get('/people/:name', (request, response) => {
    let {name} = request.params;
    let person = people.find( x => x.name.toLowerCase() === name.toLowerCase());
    response.json(person);
})

app.get('/data', async (request, response) => {
    let data = await fs.readFile(__dirname + '/people-data.json');
    let people = JSON.parse(data);
    response.json(people);
})

app.post('/people', (request, response) => {
    let newPerson = request.body;
    people.push(newPerson);
    response.json(people);
})

app.post('/data', async (request, response) => {
    let newPerson = request.body;

    //read file from disk
    let data = await fs.readFile(__dirname + '/people-data.json'); 
    let jsonData = JSON.parse(data);
    jsonData.push(newPerson);

    //write modified data to disk
    await fs.writeFile(__dirname + '/people-data.json', JSON.stringify(jsonData));

    console.log('data written to file.');
})

