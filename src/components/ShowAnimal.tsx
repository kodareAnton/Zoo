import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";

export const ShowAnimal = () => {

    const [animal, setAnimal] = useState<Animal>();
    // part2
    const [animalId, setAnimalId] = useState(0);
    let params = useParams();

    // sätter id 
    useEffect(() => {
        if (params.id)
        setAnimalId(+params.id);
    }, [])

    // hämtar från Api
    useEffect(() => {   
        if (animalId === 0) {
            console.log("Animal id not found");
        }else{
            console.log("rätt");
            axios
            .get<IAnimal>('https://animals.azurewebsites.net/api/animals/'+animalId)
            .then(response => {
            let GetAnimalsFormApi = response.data
            return setAnimal(GetAnimalsFormApi);
            });
        }
    }, [animalId]);

    // mata djuret och få knappen disabled + skriv in tid
    let date = new Date
    function DateAndAnimalIsFed(){
        // console.log(date);
        // console.log(!animal?.isFed);
        
        if(animal) {
            setAnimal({
                ...animal,
                isFed: true
            })
        }
        console.log(animal)
        // return !animal?.isFed;
    }

    return <> 
        <h2>{animal?.name}</h2>
        <p>{animal?.shortDescription}</p>
        <p>{animal?.isFed}</p>
        <p>Medicin: {animal?.medicine}</p>
        <img src={animal?.imageUrl} alt={animal?.name} />
        <br />
        <button onClick={DateAndAnimalIsFed} disabled={animal?.isFed}>Mata djur</button>

    </>
    }