import { Button, Radio } from "antd";
import styled from "styled-components";

export const PrimaryButton = styled(Button)`
  background-color: var(--fg-primary);
  color: var(--text-dark);
  font-weight: bold;
  border: 1px solid var(--fg-primary);
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--fg-secondary) !important;
    border: 1px solid var(--fg-secondary) !important;
    color: var(--text-dark) !important;
  }
`;

export const SecondaryButton = styled(Button)`
  color: var(--text-secondary);
  font-weight: bold;
  border: 1px solid var(--border-disable);
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
`;

export const DarkButton = styled(Button)`
  background-color: var(--text-light);
  color: var(--text-dark);
  font-weight: 500;
  padding: 8px 32px;
  border: 1px solid var(--border-disable);
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--text-secondary) !important;
  }
`;
