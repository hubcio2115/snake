import { createContext } from 'preact';
import { Dispatch, SetStateAction } from 'react';
import { LeaderBoardInterface } from 'utils/interfaces';

export const LeaderBoardContext = createContext<
  [LeaderBoardInterface[], Dispatch<SetStateAction<LeaderBoardInterface[]>>]
>([[], () => {}]);
