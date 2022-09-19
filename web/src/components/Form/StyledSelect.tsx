import * as Select from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import { Check } from 'phosphor-react'

import { api } from '../../services/api';
import { GamesList } from '../../App';

export function StyledSelect() {
    const [games, setGames] = useState<GamesList[]>([])

    useEffect(() => {
        api.get('/games')
        .then(response => {
            setGames(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-200">
            <Select.Content>
                <Select.Viewport>
                    <Select.Group className='flex flex-col gap-3'>
                        {
                            games.map(game => (
                                <Select.Item key={game.id} value={game.id} className="p-2 hover:bg-zinc-900 rounded cursor-pointer flex items-center justify-between pl-8">
                                    <Select.ItemText>
                                        {game.title}
                                    </Select.ItemText>
                                    <Select.ItemIndicator className="absolute left-3 text-zinc-500">
                                        <Check className="w-4 h-4 text-white" />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))
                        }
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select.Portal>
    )
}