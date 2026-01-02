import React from 'react';
import Notes from './Notes';

export const Home = ({ searchQuery }) => {
  return <Notes searchQuery={searchQuery} />;
};
