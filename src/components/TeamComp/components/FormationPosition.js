import React from 'react';
import heroData from '../../../data/heroData';

import removeHero from '../functions/removeHero';

function FormationPosition({
  validParamExists,
  teamData,
  setTeamData,
  handleClick,
  setSelectedElement,
  position,
}) {
  return (
    <div
      className={
        validParamExists || teamData.team[position].name !== ''
          ? 'position active ' + teamData.team[position].name.replace('&', '')
          : 'position'
      }
      onClick={() => {
        handleClick(position);
        setSelectedElement(position);
      }}
    >
      {teamData.team[position].name !== '' && (
        <React.Fragment>
          {teamData.team[position].weaponLv !== '' ? (
            <img
              src={
                process.env.PUBLIC_URL +
                '/assets/factions/faction-weaponlv/' +
                heroData[teamData.team[position].name].faction.join('_') +
                '_' +
                teamData.team[position].weaponLv +
                '.png'
              }
              alt={
                heroData[teamData.team[position].name].faction.join(' and ') +
                ' lv.' +
                teamData.team[position].weaponLv +
                ' weapon faction icon'
              }
            />
          ) : (
            <img
              src={
                process.env.PUBLIC_URL +
                '/assets/factions/' +
                heroData[teamData.team[position].name].faction.join('-') +
                '.png'
              }
              alt={
                heroData[teamData.team[position].name].faction.join(' and ') +
                ' faction icon'
              }
            />
          )}
          <i
            className='fas fa-times-circle'
            onClick={(e) => {
              removeHero(teamData, setTeamData, position);
              e.stopPropagation();
            }}
          ></i>
        </React.Fragment>
      )}
    </div>
  );
}

export default FormationPosition;