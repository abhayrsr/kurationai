import React from "react"

export default function InfoList({data}){

    return(
        <div>
            <h2>Details</h2>

            <ul>
                <li>Name: {data.name}</li>
                <li>Industry: {data.category.industry}</li>
                <li>Sector: {data.category.sector}</li>


            </ul> 
        
        </div>
    )
}