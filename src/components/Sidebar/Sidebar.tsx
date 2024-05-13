import Checkbox from "./Checkbox"
import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../store/state"
import { changeTransfers, clearTransfers, filterTransfers } from "../../store/ticketsSlice"
import { slide as Menu } from 'react-burger-menu'
import { useEffect, useState } from "react"

const Sidebar = () => {
    const transfers = useSelector((state: StoreType) => state.ticketsList.transfers)
    const dispatch = useDispatch()
    const setIsChecked = (id: number, value: string | number) => {
        dispatch(clearTransfers(value))
        dispatch(changeTransfers(id))
        dispatch(filterTransfers())
    }

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (<div className="sidebar__container">
        <div style={width > 780 ? { display: 'none' } : {}}>
            <Menu>
                <div className="sidebar" >
                    <div className="sidebar__title">КІЛЬКІСТЬ ПЕРЕСАДОК</div>
                    {transfers.map((transfer) => <Checkbox key={transfer.id} id={transfer.id} label={transfer.title} isChecked={transfer.isChecked} value={transfer.value} setIsChecked={setIsChecked} />)}
                </div>
            </Menu>
        </div>
        <div className="sidebar" style={width <= 780 ? { display: 'none' } : {}}>
            <div className="sidebar__title">КІЛЬКІСТЬ ПЕРЕСАДОК</div>
            {transfers.map((transfer) => <Checkbox key={transfer.id} id={transfer.id} label={transfer.title} isChecked={transfer.isChecked} value={transfer.value} setIsChecked={setIsChecked} />)}
        </div></div>
    )
}
export default Sidebar