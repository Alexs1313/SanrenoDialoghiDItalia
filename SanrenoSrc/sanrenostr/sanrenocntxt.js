import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const useSanrenoStore = () => {
  return useContext(StoreContext);
};

export const SanrenoStoreProvider = ({ children }) => {
  const [savedSanrenoStr, setSavedSanrenoStr] = useState([]);
  const [isEnabledSanrenoBgMusic, setIsEnabledSanrenoBgMusic] = useState(false);
  const [isEnabledSanrenoVibration, setIsEnabledSanrenoVibration] =
    useState(false);
  const [soundLevel, updateSoundLevel] = useState(1.0);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('volume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error ', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('volume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error while storing volume:', err);
    }
  };

  const saveSanrenoStory = async data => {
    try {
      const storedFishinCrd = await AsyncStorage.getItem('sanrenostories');
      let notes = storedFishinCrd !== null ? JSON.parse(storedFishinCrd) : [];

      const updatedSanrenoSt = [...notes, data];

      await AsyncStorage.setItem(
        'sanrenostories',
        JSON.stringify(updatedSanrenoSt),
      );

      setSavedSanrenoStr(updatedSanrenoSt);
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getSanrenoStory = async () => {
    try {
      const savedData = await AsyncStorage.getItem('sanrenostories');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedSanrenoStr(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSanrenoStory = async selectedPlace => {
    const jsonValue = await AsyncStorage.getItem('sanrenostories');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlace.id);

    setSavedSanrenoStr(filtered);
    await AsyncStorage.setItem('sanrenostories', JSON.stringify(filtered));
  };

  const fishincatchcntxvalue = {
    setSavedSanrenoStr,
    savedSanrenoStr,
    saveSanrenoStory,
    getSanrenoStory,
    deleteSanrenoStory,
    isEnabledSanrenoBgMusic,
    setIsEnabledSanrenoBgMusic,
    isEnabledSanrenoVibration,
    setIsEnabledSanrenoVibration,
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
  };

  return (
    <StoreContext.Provider value={fishincatchcntxvalue}>
      {children}
    </StoreContext.Provider>
  );
};
