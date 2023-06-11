import { Skeleton, Typography } from "@mui/material";
import styled from "styled-components";

export const Title = styled(Typography).attrs({ variant: "h4" })``;

export const ModuleSkeleton = styled(Skeleton)``;

export const NoteSkeleton = styled(Skeleton)``;

export const NoteSkeletonWrap = styled.div`
  display: flex;
  gap: 1em;

  ${NoteSkeleton} {
    width: 150px;
    height: 200px;
    transform: scale(1);
  }
`;

export const EmptyMessage = styled.article`
  flex-grow: 1;
  display: grid;
  align-content: center;
  justify-items: center;
`;

export const HomeStyled = styled.main`
  padding: 1em;
  display: flex;
  flex-direction: column;

  ${ModuleSkeleton} {
    width: 50%;
    height: 3em;
  }
`;
