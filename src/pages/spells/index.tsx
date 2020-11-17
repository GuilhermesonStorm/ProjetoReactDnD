import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';
import { Title, Backbox, Subtitle } from './styles';

interface SpellParams {
    index: string;
}

interface Spell {
    index: string;
    name: string;
    desc: string;
    higher_level: string;
    range: string;
    material: string;
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    damage: {
        damage_type: {
            name: string;
        };
    };
    area_of_effect: {
        type: string;
        size: number;
    };
    school: {
        name: string;
    };
    classes: [
        {
            name: string;
        },
    ];
    subclasses: [
        {
            name: string;
        },
    ];
}

const Spells: React.FC = () => {
    const [spell, setSpell] = useState<Spell | null>(null);

    const { params } = useRouteMatch<SpellParams>();

    useEffect(() => {
        api.get(`/spells/${params.index}`).then(response => {
            setSpell(response.data);
        });
    }, [params.index]);

    const setHigherLevel = (): string => {
        if (spell?.higher_level) {
            return spell.higher_level;
        } else {
            return 'This spell does not have an improvement on higher levels slots or characters.';
        }
    };

    const setRitual = (): string => {
        if (spell?.ritual === true) {
            return 'This spell can be cast as a ritual.';
        } else {
            return 'This spell can not be cast as a ritual.';
        }
    };

    const setConcentration = (): string => {
        if (spell?.concentration === true) {
            return 'Beware! This spell requires concentration to cast.';
        } else {
            return 'This spell does not require concentration to cast.';
        }
    };

    const setAreaOfEffect = (): string => {
        if (spell?.area_of_effect) {
            return `This spell is used as area of effect of type ${spell.area_of_effect.type} and a size of ${spell.area_of_effect.size} foot.`;
        } else {
            return 'This is not an area of effect spell.';
        }
    };

    const setSpellType = (): string => {
        if (spell?.damage) {
            return `This spell is a offensive spell and causes an ${spell.damage.damage_type.name} type damage.`;
        } else {
            return 'This is a support spell.';
        }
    };

    return (
        <>
            <Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Back
                </Link>
                DnD 5th Edition SpellBook
            </Title>

            <Backbox>
                <Subtitle>{spell?.name}</Subtitle>
                <strong>Description:</strong>
                <p>{spell?.desc}</p>
                <strong>Spell Type:</strong>
                <p>{setSpellType()}</p>
                <strong>Higher Level:</strong>
                <p>{setHigherLevel()}</p>
                <strong>Range:</strong>
                <p>{spell?.range}.</p>
                <p>{setAreaOfEffect()}</p>
                <strong>Material:</strong>
                <p>{spell?.material}</p>
                <strong>Duration:</strong>
                <p>{spell?.duration}.</p>
                <strong>Casting Time:</strong>
                <p>{spell?.casting_time}.</p>
                <p>Ritual: {setRitual()}</p>
                <p>Concentration: {setConcentration()}</p>
                <strong>School:</strong>
                <p>{spell?.school.name}.</p>
                <strong>Classes:</strong>
                <ul>
                    {spell?.classes.map(classe => (
                        <li>{classe.name}</li>
                    ))}
                </ul>
                <strong>Subclasses:</strong>
                <ul>
                    {spell?.subclasses.map(subclasse => (
                        <li>{subclasse.name}</li>
                    ))}
                </ul>
            </Backbox>
        </>
    );
};

export default Spells;
