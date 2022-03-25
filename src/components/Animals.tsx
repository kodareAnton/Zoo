import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";

export const Animals = () => {

const [Animals, setAnimals] = useState<Animal[]>([]);

// hämtar från Api
useEffect(() => {
axios
.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
    .then(response => {
       let GetAnimalsFormApi = response.data.map((animal:IAnimal) =>{
            return new Animal(
                animal.id, 
                animal.name, 
                animal.latinName,
                animal.yearOfBirth,
                animal.shortDescription,
                animal.longDescription,
                animal.imageUrl,
                animal.medicine,
                animal.isFed,
                animal.lastFed)      
        });
        
        setAnimals(GetAnimalsFormApi);
    });
}, []);


// skriver ut Api med hjälp av map i webläsaren 
let AnimalsHtmml = Animals.map((animal: Animal) => {
let AnimalsLink = `/Animals/${animal.id}`;

console.log(animal);

return (
    <div key={animal.id}>
    <Link to={AnimalsLink}>
        <h2>{animal.name}</h2></Link>
    </div>
)
});

return (
<div>
    {AnimalsHtmml}
</div>
)
}