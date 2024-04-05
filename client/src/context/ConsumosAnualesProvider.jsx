import { createContext, useState } from "react";

const ConsumosAnualesContext = createContext({})

export const ConsumosAnualesProvider = ({ children }) => {
    const [consumosAnuales, setConsumosAnuales] = useState([])

    return (
        <ConsumosAnualesContext.Provider value={{ consumosAnuales, setConsumosAnuales }}>
            {children}
        </ConsumosAnualesContext.Provider>
    )
}

export default ConsumosAnualesContext;