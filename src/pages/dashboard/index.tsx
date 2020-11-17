import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Title, Form, Repositories, Backbox, Error } from './styles';

interface Spell {
    index: string;
    name: string;
    desc: string;
}

const Dashboard: React.FC = () => {
    const [newSpell, setNewSpell] = useState('');
    const [inputError, setInputError] = useState('');
    const [spells, setSpells] = useState<Spell[]>(() => {
        const storagedSpell = localStorage.getItem('@DnD:SpellBook');
        if (storagedSpell) {
            return JSON.parse(storagedSpell);
        } else {
            return [];
        }
    });

    useEffect(() => {
        const s = localStorage.getItem('@DnD:Spellbook');
        if (s) {
            setSpells(JSON.parse(s));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('@DnD:SpellBook', JSON.stringify(spells));
    }, [spells]);

    async function handleAddSpell(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        if (!newSpell) {
            setInputError('Digit the name of the spell that you want to see. ');
            return;
        }
        try {
            const response = await api.get<Spell>(`/spells/${newSpell}`);
            const spell = response.data;
            setSpells([...spells, spell]);
            setNewSpell('');
            setInputError('');
        } catch (erro) {
            setInputError(
                'We could not find the spell that you are looking for. :(',
            );
        }
    }

    return (
        <>
            <Title>DnD 5th Edition Spellbook</Title>
            <Backbox>
                <Form hasError={!!inputError} onSubmit={handleAddSpell}>
                    <input
                        value={newSpell}
                        onChange={event => setNewSpell(event.target.value)}
                        placeholder="Put the name of the spell that you are looking for..."
                    />
                    <button type="submit">Search</button>
                </Form>

                {inputError && <Error>{inputError}</Error>}
                <Repositories>
                    {spells.map(spell => (
                        <Link key={spell.index} to={`/spells/${spell.index}`}>
                            <div>
                                <strong>{spell.name}</strong>
                                <p>{spell.desc[0]}</p>
                            </div>
                        </Link>
                    ))}
                </Repositories>
            </Backbox>
        </>
    );
};

export default Dashboard;
