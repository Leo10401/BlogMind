import axios from 'axios';
import React from 'react'

const manageParticipant = () => {
  const fetchpartcipantData = async () =>{
    const res = await axios.get('http://localhost:5000/part/getall')
    const data = res.data;
    console.log(data);
  }
  
  return (
    <div>
      <button onClick={fetchpartcipantData}>Get All Participants</button>
      
      <div id="participant-list">
        <ol>
          
        </ol>
      </div>

    </div>
  )
}

export default manageParticipant