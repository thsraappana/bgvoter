import React from 'react'

function About() {
  return (
    <section>
      <div className="flex flex-col">
        <div>
          <h1 className="text-5xl font-extrabold text-black text-center">
              BGVoter
          </h1>
        </div>
        <div className="mt-10">
          Welcome to BGVoter, the ultimate platform for organizing game nights! With BGVoter, users can effortlessly create custom "game rooms" and engage in a fun voting system to determine which game will be played during the event. Whether you're a group of friends, colleagues, or family members, BGVoter ensures a seamless and enjoyable experience.
        </div>
        <div className="mt-3">
          Create your personalized game room and invite your friends to join in the excitement. Each participant can propose their favorite games, and through a transparent voting process, the winning game will be selected. No more endless debates or indecision - BGVoter simplifies the decision-making process, making sure everyone's voice is heard.
        </div>
        <div className="mt-3">
          Once the game night is over, BGVoter allows you to archive the completed games, votes and results for future reference. You can revisit those memorable gaming moments, reminisce about the victories, and plan your next epic game night based on the previous successes.
        </div>
        <div className="mt-3">
          Experience the joy of collaborative gaming and streamlined decision-making with BGVoter. Say goodbye to the hassle of organizing game nights and hello to a fun-filled, democratic experience. Join BGVoter today and let the games begin!
        </div>
      </div>
    </section>
  )
}

export default About