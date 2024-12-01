'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Participant = () => {
  const { id } = useParams(); // Destructure id from useParams
  const [participants, setParticipants] = useState([]);

  const fetchParticipantData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/part/getbycompetition/` +id); // Fixed URL
      const data = res.data;
      console.log(data);
      setParticipants(data); // Set the participants state
    } catch (error) {
      console.error('Error fetching participant data:', error);
      toast.error('Failed to fetch participant data'); // Error handling
    }
  };

  useEffect(() => {
    fetchParticipantData(); // Correct function name
  }, []);

  const deleteParticipant = (participantId) => {
    axios.delete(`http://localhost:5000/part/delete/${participantId}`)
      .then(() => {
        fetchParticipantData(); // Refresh data after deletion
        toast.success('Participant deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong while deleting participant');
      });
  };
  return (
    <div>

        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
            {
            participants.map((participant, index) => ( 
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700"></span>
                  <span className="mt-1 text-gray-500 text-sm">{participant.user.name}</span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Bitters hashtag waistcoat fashion axe chia unicorn</h2>
                  <p className="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                  <a className="text-indigo-500 inline-flex items-center mt-4">Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>))}
            </div>
          </div>
        </section>

    </div>
  )
}

export default Participant