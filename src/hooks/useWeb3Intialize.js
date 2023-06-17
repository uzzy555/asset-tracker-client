import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeWeb3Packages } from "../redux/web3/web3.actions";
export const useInitializeWeb3Packages = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(initializeWeb3Packages());
  }, [dispatch]);
};
