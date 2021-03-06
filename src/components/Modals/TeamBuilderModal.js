import React, { useState } from 'react';

import ArtifactDropdown from '../TeamComp/components/ArtifactDropdown';
import DivinityBuilder from '../TeamComp/components/DivinityBuilder';
import HeroDropdown from '../TeamComp/components/HeroDropdown';
import RuneDropdown from '../TeamComp/components/RuneDropdown';
import WeaponBuilder from '../TeamComp/components/WeaponBuilder';

function TeamBuilderModal({
  setModal,
  selectedElement,
  teamData,
  setTeamData,
  width,
}) {
  const [dropdown, setDropdown] = useState(false);

  //selections
  const [selectedHero, setSelectedHero] = useState(
    teamData.team[selectedElement].name
  );
  const [selectedRune, setSelectedRune] = useState(
    teamData.team[selectedElement].rune
  );
  const [selectedArtifact, setSelectedArtifact] = useState(
    teamData.team[selectedElement].artifact
  );
  const [selectedNodes, setSelectedNodes] = useState(
    teamData.team[selectedElement].divinityNodes
  );
  const [selectedWeaponBuild, setSelectedWeaponBuild] = useState(
    teamData.team[selectedElement].weaponLv
  );

  // build dropdowns
  const [runeDropdown, setRuneDropdown] = useState(false);
  const [artifactDropdown, setArtifactDropdown] = useState(false);
  const [divinityDropdown, setDivinityDropdown] = useState(false);
  const [divinityBuilderDropdown, setDivinityBuilderDropdown] = useState(false);
  const [weaponBuilderDropdown, setWeaponBuilderDropdown] = useState(false);

  const addToTeam = () => {
    let teamDataDeepCopy = JSON.parse(JSON.stringify(teamData));
    teamDataDeepCopy.team[selectedElement].name = selectedHero;
    teamDataDeepCopy.team[selectedElement].rune = selectedRune;
    teamDataDeepCopy.team[selectedElement].artifact = selectedArtifact;
    teamDataDeepCopy.team[selectedElement].divinityNodes = selectedNodes;
    teamDataDeepCopy.team[selectedElement].weaponLv = selectedWeaponBuild;

    setTeamData(teamDataDeepCopy);
  };

  const handleClick = () => {
    setDropdown(false);
    setRuneDropdown(false);
    setArtifactDropdown(false);
  };

  return (
    <div
      className='builder overlay'
      onClick={() => {
        handleClick();
      }}
    >
      <div
        className={
          selectedHero === '' ? 'builder-screen' : 'builder-screen active'
        }
      >
        <h4>Hero Selector</h4>
        <HeroDropdown
          dropdown={dropdown}
          setDropdown={setDropdown}
          selectedHero={selectedHero}
          setSelectedHero={setSelectedHero}
          setRuneDropdown={setRuneDropdown}
          setArtifactDropdown={setArtifactDropdown}
          teamData={teamData.team}
          width={width}
          setSelectedNodes={setSelectedNodes}
        />
        {/* -------------------------------------------------------------------- */}
        {selectedHero && (
          <React.Fragment>
            <h5>Hero build (optional)</h5>
            <span>(scroll down for more options)</span>
            <div className='builds-container'>
              <div className='build-category'>
                <RuneDropdown
                  runeDropdown={runeDropdown}
                  setRuneDropdown={setRuneDropdown}
                  selectedRune={selectedRune}
                  setSelectedRune={setSelectedRune}
                  setArtifactDropdown={setArtifactDropdown}
                  width={width}
                />
              </div>
              <div className='build-category'>
                <ArtifactDropdown
                  artifactDropdown={artifactDropdown}
                  setArtifactDropdown={setArtifactDropdown}
                  selectedArtifact={selectedArtifact}
                  setSelectedArtifact={setSelectedArtifact}
                  setRuneDropdown={setRuneDropdown}
                  width={width}
                />
              </div>
              <div
                className={
                  divinityDropdown
                    ? 'build-category divinity active'
                    : 'build-category divinity'
                }
                id='divinity-dropdown'
              >
                <div
                  className={
                    divinityDropdown
                      ? 'build-dropdown active'
                      : 'build-dropdown'
                  }
                  onClick={() => {
                    setDivinityDropdown(!divinityDropdown);
                    setTimeout(() => {
                      document
                        .getElementById('divinity-dropdown')
                        .scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                    }, 0);
                  }}
                >
                  <i className='fas fa-angle-right'></i>
                  <span>Divinity build</span>
                </div>
                {/* --------------------------- Build UI Here --------------------------- */}
                <div className='build-ui' id='divinity-build-ui'>
                  <DivinityBuilder
                    divinityBuilderDropdown={divinityBuilderDropdown}
                    setDivinityBuilderDropdown={setDivinityBuilderDropdown}
                    selectedNodes={selectedNodes}
                    setSelectedNodes={setSelectedNodes}
                    setDropdown={setDropdown}
                    setRuneDropdown={setRuneDropdown}
                    setArtifactDropdown={setArtifactDropdown}
                    selectedHero={selectedHero}
                    width={width}
                  />
                </div>
              </div>
              <div
                className={
                  weaponBuilderDropdown
                    ? 'build-category weapon active'
                    : 'build-category weapon'
                }
                id='weapon-dropdown'
              >
                <div
                  className={
                    weaponBuilderDropdown
                      ? 'build-dropdown active'
                      : 'build-dropdown'
                  }
                  onClick={() => {
                    setWeaponBuilderDropdown(!weaponBuilderDropdown);
                    setTimeout(() => {
                      document
                        .getElementById('weapon-dropdown')
                        .scrollIntoView({
                          behavior: 'smooth',
                          block: 'end',
                        });
                    }, 0);
                  }}
                >
                  <i className='fas fa-angle-right' aria-hidden='true'></i>
                  <span>Weapon build</span>
                </div>
                {/* --------------------------- Build UI Here --------------------------- */}
                <div className='build-ui'>
                  <WeaponBuilder
                    selectedWeaponBuild={selectedWeaponBuild}
                    setSelectedWeaponBuild={setSelectedWeaponBuild}
                    selectedHero={selectedHero}
                    width={width}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {/* -------------------------------------------------------------------- */}
        <div className='buttons-container'>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              addToTeam();
              setModal(false);
            }}
          >
            Add to team
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamBuilderModal;
