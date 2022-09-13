import React, { useEffect, useState } from 'react'
import "../App.css";
import Actor from './Actor';
import Show from './Show';
export default function Home()
{
    const [actorData, setActorData] = useState([]);
    const [showdata, setShowData] = useState([]);
    const [actorShowData, setActorShowData] = useState([]);
    //const [noData, setNoData] = useState("");
    const [radio, setRadio] = useState("");
    const [inputData, setInputData] = useState("");
    
    useEffect(() => {
        if (radio === "actor") {
          const actdata = async () => {
            const response = await fetch(
              `https://api.tvmaze.com/search/people?q=${inputData}`
            );
            const result = await response.json();
            setActorData(result);
          };
          actdata();
          //console.log(actorData);
        } else {
          if (inputData !== "") {
            const fetchshowdata = async () => {
              const response = await fetch(
                `https://api.tvmaze.com/search/shows?q=${inputData}`
              );
              const result = await response.json();
              setShowData(result);
            };
            fetchshowdata();
            //console.log(showdata);
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inputData]);


    
    useEffect(() => {
        //console.log(actorData[0]?.person?.id);
        if (actorData.length !== 0) {
          if (inputData === "") {
            setActorShowData([]);
          } else {
            console.log("second useeffect calling");
            const fetchActorShowData = async () => {
              const response = await fetch(
                `https://api.tvmaze.com/people/${actorData[0]?.person?.id}/castcredits?embed=show`
              );
              const result = await response.json();
              //console.log(result);
              setActorShowData(result);
            };
            fetchActorShowData();
            console.log(actorShowData);
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [actorData, inputData]);
      
    const updateInputData = (event) => {
        setRadio(event.target.value);
        setShowData([]);
        setActorShowData([]);
        setActorData([]);
        setInputData("");
      };
    return(
        <div className="App">
            <form className='form'>
                <div>
                    <input type="radio" value="actor" name="tv" className='radioinput' onChange={updateInputData} />
                    <label>Actor</label>
                    <input type="radio" value="show" name="tv" className="radioinput" onChange={updateInputData} />
                    <label>Show</label>
                    <input type="search" className="searchbar"  placeholder={`search show and actor`} value={inputData} onChange={(e)=>{setInputData( e.target.value);}}/>
                </div>
            </form>
            {radio === "actor" ? (
        actorShowData.length !== 0 ? (
          <div className="show-data">
            <Actor data={actorShowData} />
          </div>
        ) : (
          <div className="show-data">
            <h2>No data</h2>
          </div>
        )
      ) : radio === "show" ? (
        showdata.length !== 0 ? (
          <div className="show-data">
            <Show data={showdata} />
          </div>
        ) : (
          <div className="show-data">
            <h2>No data</h2>
          </div>
        )
      ) : (
        <div className="show-data">
          <h2>No data</h2>
        </div>
      )}
        </div>
    )
}