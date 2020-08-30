import React from 'react'
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Filters from './components/Filters/Filters'
import ContextProvider from './components/ContextProvider/ContextProvider'

const Stack = createStackNavigator()

export default function App() {
    return (
        <ContextProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="News">
                    <Stack.Screen
                        name="News"
                        component={NewsFeed}
                        options={({ navigation }) => ({
                            headerRight: () => <Button title="Filters" onPress={() => navigation.navigate('Filters')} />,
                        })}
                    />
                    <Stack.Screen
                        name="Filters"
                        component={Filters}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    )
}
