import { useEffect } from 'react'
import ticketsList from "../../data/tickets.json"
import TicketCard from './TicketCard';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from "../../store/state"
import { changeLastIndex, replaceTickets } from '../../store/ticketsSlice';
import { convertPriceToNumber } from '../../functions/functions';

export default function TicketsList() {
    const tickets = useSelector((state: StoreType) => state.ticketsList.tickets)
    const filteredTickets = useSelector((state: StoreType) => state.ticketsList.filteredTickets)
    const activeFilters = useSelector((state: StoreType) => state.ticketsList.activeFilters)
    const lastIndex = useSelector((state: StoreType) => state.ticketsList.lastIndex)
    const dispatch = useDispatch()

    const getMoreTickets = () => {
        if (lastIndex !== 0 && lastIndex === tickets.length) return
        dispatch(changeLastIndex())
    }
    useEffect(() => {
        let sortedDefaultTickets = ticketsList.slice().sort((prev, next) => convertPriceToNumber(prev.price) > convertPriceToNumber(next.price) ? 1 : -1)
        dispatch(replaceTickets(sortedDefaultTickets))
    }, [dispatch])

    return (
        <div className="tickets__list">
            {filteredTickets.length === 0 || activeFilters.length === 0 ? <p className='tickets__text-info'>Квитків не знайдено</p> :
                <>
                    {
                        filteredTickets.slice(0, lastIndex).map(ticket => <TicketCard key={ticket.id} {...ticket} />)

                    }
                </>
            }

            {filteredTickets.length === 0 || activeFilters.length === 0 ? "" : <button className='showMore__button' disabled={lastIndex >= filteredTickets.length} onClick={getMoreTickets}>Показати ще 5 квитків</button>}

        </div>
    )
}
