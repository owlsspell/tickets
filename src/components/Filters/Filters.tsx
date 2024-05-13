import { useEffect, useState } from 'react'
import { StoreType } from '../../store/state'
import { useDispatch, useSelector } from 'react-redux'
import { replaceTickets } from '../../store/ticketsSlice'
import { convertPriceToNumber, convertTravelTime } from '../../functions/functions'
import { TicketType } from '../Tiсkets/TicketCard'

export default function Filters() {
    const filteredTickets = useSelector((state: StoreType) => state.ticketsList.filteredTickets)
    const activeFilters = useSelector((state: StoreType) => state.ticketsList.activeFilters)
    const dispatch = useDispatch()

    const filters = ["Найдешевший", "Найшвидший", "Оптимальний"]
    const [activeFilter, setActiveFilter] = useState("Найдешевший")

    const getSortedByPrice = (tickets: TicketType[]) => tickets.slice().sort((prev, next) => convertPriceToNumber(prev.price) > convertPriceToNumber(next.price) ? 1 : -1)

    function getSortedByTime(tickets: TicketType[]) {
        return tickets.slice().sort((prev, next) => {
            let prevHours = convertTravelTime(prev.directions)[0]
            let prevMinutes = convertTravelTime(prev.directions)[1]
            let nextHours = convertTravelTime(next.directions)[0]
            let nextMinutes = convertTravelTime(next.directions)[1]
            let allTimePrev = (prevHours * 60 + prevMinutes)
            let allTimeNext = (nextHours * 60 + nextMinutes)
            if (allTimePrev > allTimeNext) return 1
            else return -1
        })
    }

    function getOptimalSorted(tickets: TicketType[]) {
        let sortedArray = tickets.slice().sort((prev, next) => {
            let prevHours = convertTravelTime(prev.directions)[0]
            let prevMinutes = convertTravelTime(prev.directions)[1]
            let nextHours = convertTravelTime(next.directions)[0]
            let nextMinutes = convertTravelTime(next.directions)[1]
            let allTimePrev = (prevHours * 60 + prevMinutes)
            let allTimeNext = (nextHours * 60 + nextMinutes)

            //sort by time,transplants and price
            if (allTimePrev > allTimeNext) return 1
            else if (allTimePrev === allTimeNext) {
                if (prev.directions[0].transplants.length > next.directions[0].transplants.length) {
                    return 1
                }
                else if (prev.directions[0].transplants.length === next.directions[0].transplants.length) {
                    if (prev.price > next.price) return 1
                    else return -1
                }
                else return -1
            }
            else return -1
        }
        )
        return sortedArray
    }


    useEffect(() => {
        if (activeFilter === 'Найдешевший') {
            let sortedByPriceTickets = getSortedByPrice(filteredTickets)
            dispatch(replaceTickets(sortedByPriceTickets))
        }
        if (activeFilter === 'Найшвидший') {
            let sortedByTimeTickets = getSortedByTime(filteredTickets)
            dispatch(replaceTickets(sortedByTimeTickets))
        }
        if (activeFilter === 'Оптимальний') {
            let optimalSorted = getOptimalSorted(filteredTickets)
            dispatch(replaceTickets(optimalSorted))
        }
    }, [dispatch, activeFilter, activeFilters.length])


    return (
        <div className='filters'>

            {filters.map(filter => <div key={filter}
                className={`filter ${filter === activeFilter ? "filter-active" : ""}`}
                onClick={() => setActiveFilter(filter)}
            >{filter}</div>)}
        </div>
    )
}
