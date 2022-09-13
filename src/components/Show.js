import React from 'react'
import "../showCard.css";
export default function Show({ data })
{
    return(
        <>
        {data.map((d) => {
        return (
          <div className="container">
            <div className="card">
              <div className="card-image">
                <img src={d?.show?.image?.medium} alt="Noimage" />
              </div>
              <div className="card-title">
                <h3>{d?.show?.name}</h3>
              </div>
            </div>
          </div>
        );
      })}
        </>
    )
}