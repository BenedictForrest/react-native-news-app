import React, { createContext, useState } from 'react'
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Filters from './components/Filters/Filters'
import { ContextProvider } from './components/ContextProvider/ContextProvider'

const Stack = createStackNavigator()

export default function App() {
    // const [selectedSources, setSelectedSources] = useState<string[]>([])

    // const contextObject = {
    //     selectedSources: selectedSources,
    //     setSelectedSources: setSelectedSources
    // }

    // const FiltersContext = React.createContext(contextObject)

    return (
        <ContextProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={NewsFeed}
                        options={({navigation}) => ({
                            animationEnabled: true,
                            title: 'News',
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <Button
                                    title="Filters"
                                    onPress={() => navigation.navigate('Filters')}
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Filters"
                        component={Filters}
                        options={{
                            animationEnabled: true,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    )
}
