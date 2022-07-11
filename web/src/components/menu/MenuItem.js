import { NavLink } from "react-router-dom"

const MenuItem = ({ path, classItem, classIcon, nameItem, onClick }) => {


    return (
        <NavLink
            to={path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={onClick}
        >
            <div className={`item ${classItem} `}>
                <i className={classIcon} />
                <span>{nameItem} </span>
            </div>
        </NavLink>
    )
}

export default MenuItem