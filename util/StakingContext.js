import React, { createContext, useContext, useState } from 'react';

const StakingContext = createContext();

export const useStaking = () => useContext(StakingContext);

export const StakingProvider = ({ children }) => {
  const [stakeHistory, setStakeHistory] = useState([]);

  const updateStakeHistory = async () => {
    try {
      const response = await apiRequest('/stakeList');
      if (response?.status) {
        setStakeHistory(response.data); // Assuming response.data contains the updated stake history
      }
    } catch (error) {
      console.error('Error fetching stake history:', error);
    }
  };

  return (
    <StakingContext.Provider value={{ stakeHistory, updateStakeHistory }}>
      {children}
    </StakingContext.Provider>
  );
};
