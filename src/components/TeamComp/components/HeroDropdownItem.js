import heroData from '../../../data/heroData';

function HeroDropdownItem({ heroName, setSelectedHero, setSelectedNodes }) {
  return (
    <div
      className='dropdown-list-item'
      onClick={() => {
        setSelectedHero(heroName);
        setSelectedNodes(['', '', '']);
      }}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          '/assets/factions/' +
          (heroData[heroName].faction.length > 1
            ? heroData[heroName].faction[0] +
              '-' +
              heroData[heroName].faction[1]
            : heroData[heroName].faction[0]) +
          '.png'
        }
        alt={
          (heroData[heroName].faction.length > 1
            ? heroData[heroName].faction[0] +
              ' - ' +
              heroData[heroName].faction[1]
            : heroData[heroName].faction[0]) + ' faction'
        }
      />
      <p>{heroName}</p>
    </div>
  );
}

export default HeroDropdownItem;
