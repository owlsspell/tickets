import React, { Fragment } from 'react'
import logo from "../../images/a4e logo.png"

export type TicketType = {
    id: number,
    price: string,
    directions: DirectionsType[]
}

export type DirectionsType = {
    id: number,
    direction: string,
    time: string,
    travelTime: string,
    transplants: string[],
}

export default function TicketCard({ price, directions }: TicketType) {

    return (
        <div className="ticket__card">
            <div className='ticket__price'>{price} $</div>
            <img src={logo} alt="" />
            {directions.map(item => <Fragment key={`direction ${item.id}`}>
                <div>
                    <div className='direction__title'>{item.direction}</div>
                    <div className='direction__text'>{item.time}</div>
                </div>
                <div>
                    <div className='direction__title'>В дорозі</div>
                    <div className='direction__text'>{item.travelTime}</div>
                </div>
                <div>
                    <div className='direction__title'>{item.transplants.length === 0 ? "Без пересадок" : item.transplants.length === 1 ? `${item.transplants.length} пересадка` : `${item.transplants.length} пересадки`} </div>
                    <div className='direction__text'>{item.transplants.toString()}</div>
                </div>

            </Fragment>)}
        </div>

    )
}
