import { RootState } from './../redux/reducers/index';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
