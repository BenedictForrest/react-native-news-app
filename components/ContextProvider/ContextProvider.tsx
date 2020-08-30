import React, { createContext, Dispatch, ReactNode, useState } from 'react'

interface ContextProviderProps {
    children: ReactNode
}

export const FiltersContext = createContext<{selectedSources?: string[], setSelectedSources?: Dispatch<React.SetStateAction<string[]>>}>({})

export default function ContextProvider({
    children,
}: ContextProviderProps) {
    const [selectedSources, setSelectedSources] = useState<string[]>([])

    const contextObject = {
        selectedSources: selectedSources,
        setSelectedSources: setSelectedSources
    }

    return (
        <FiltersContext.Provider value={contextObject}>
            {children}
        </FiltersContext.Provider>
    )
}
