import React, { useEffect } from "react";
import styled from "styled-components/native";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types/ReduxState";
import { getImage } from "../actions/ImageAction";

interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = ({}) => {
  // useSelector
  const { photo } = useSelector((state: RootState) => state.image);
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getImage());
  }, []);
  if (!photo) {
    return null;
  }
  return <Image source={{ uri: photo }} />;
};

const Image = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
`;
